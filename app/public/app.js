const state = {
  token: localStorage.getItem("sp_token") || "",
  user: JSON.parse(localStorage.getItem("sp_user") || "null"),
  products: [],
  view: "dashboard",
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const money = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const res = await fetch(path, { ...options, headers });
  if (path.includes("/export/csv")) return res;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Error HTTP ${res.status}`);
  return data;
}

function showLogin() {
  $("#login-view").hidden = false;
  $("#app-view").hidden = true;
}

function showApp() {
  $("#login-view").hidden = true;
  $("#app-view").hidden = false;
  $("#user-chip").textContent = `${state.user.name} · ${state.user.role}`;
  const isAdmin = state.user.role === "admin";
  $$("[data-admin-only]").forEach((el) => {
    el.hidden = !isAdmin;
  });
  // Export necesita token: reemplazar href por click
  setView(state.view);
  refreshAll();
}

function setView(name) {
  state.view = name;
  const titles = {
    dashboard: ["Dashboard", "Resumen operativo del inventario"],
    products: ["Productos", "Catálogo y control de existencias"],
    movements: ["Movimientos", "Entradas, salidas y ajustes"],
    alerts: ["Alertas stock", "Productos bajo el mínimo configurado"],
  };
  $("#view-title").textContent = titles[name][0];
  $("#view-subtitle").textContent = titles[name][1];
  $$(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === name));
  $$(".view").forEach((v) => {
    v.hidden = v.id !== `view-${name}`;
  });
}

function stockBadge(p) {
  if (p.stock <= 0) return `<span class="badge danger">Agotado</span>`;
  if (p.stock <= p.minStock) return `<span class="badge warn">Bajo</span>`;
  return `<span class="badge ok">OK</span>`;
}

function productsTable(list, { actions = true } = {}) {
  if (!list.length) return `<div class="empty">Sin resultados</div>`;
  const isAdmin = state.user?.role === "admin";
  return `
    <table>
      <thead>
        <tr>
          <th>SKU</th><th>Producto</th><th>Categoría</th><th>Precio</th>
          <th>Stock</th><th>Mín.</th><th>Estado</th>${actions ? "<th></th>" : ""}
        </tr>
      </thead>
      <tbody>
        ${list
          .map(
            (p) => `
          <tr>
            <td class="sku">${escapeHtml(p.sku)}</td>
            <td>${escapeHtml(p.name)}</td>
            <td>${escapeHtml(p.category)}</td>
            <td>${money(p.price)}</td>
            <td>${p.stock}</td>
            <td>${p.minStock}</td>
            <td>${stockBadge(p)}</td>
            ${
              actions
                ? `<td class="row-actions">
                    ${
                      isAdmin
                        ? `<button class="btn secondary sm" data-edit="${p.id}">Editar</button>
                           <button class="btn danger sm" data-del="${p.id}">Eliminar</button>`
                        : ""
                    }
                  </td>`
                : ""
            }
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
}

function escapeHtml(str) {
  // BUG-10 (semilla UI): el nombre/SKU se renderiza sin escape en algunos flujos de edición previa;
  // aquí SÍ escapamos en listados normales. El bug de XSS se manifiesta si un producto se creó
  // con HTML y luego se usa innerHTML en el select de movimientos (ver fillProductSelect).
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function loadDashboard() {
  const { metrics } = await api("/api/dashboard");
  $("#metrics").innerHTML = `
    <div class="metric"><span>Productos activos</span><strong>${metrics.totalProducts}</strong></div>
    <div class="metric warn"><span>Stock bajo</span><strong>${metrics.lowStock}</strong></div>
    <div class="metric danger"><span>Agotados</span><strong>${metrics.outOfStock}</strong></div>
    <div class="metric"><span>Valor inventario</span><strong>${money(metrics.inventoryValue)}</strong></div>
    <div class="metric"><span>Movimientos</span><strong>${metrics.recentMovements}</strong></div>
  `;
  const low = state.products.filter((p) => p.stock <= p.minStock);
  $("#dashboard-low").innerHTML = productsTable(low, { actions: false });
}

async function loadProducts() {
  const q = $("#search-q").value.trim();
  const category = $("#filter-category").value;
  const lowStock = $("#filter-low").checked;
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (lowStock) params.set("lowStock", "true");
  const { products } = await api(`/api/products?${params}`);
  state.products = products;
  $("#products-table").innerHTML = productsTable(products);

  // Categorías desde el catálogo completo, para que el filtro no se “coma” a sí mismo
  const all = await api("/api/products");
  const cats = [...new Set(all.products.map((p) => p.category))].sort();
  const select = $("#filter-category");
  const current = select.value;
  select.innerHTML = `<option value="">Todas las categorías</option>` + cats.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
  select.value = current;
}

async function loadAllProductsForState() {
  const { products } = await api("/api/products");
  state.products = products;
  fillProductSelect();
}

function fillProductSelect() {
  const sel = $("#m-product");
  // BUG-10: usa innerHTML con name sin escape → XSS si name contiene HTML/script
  sel.innerHTML = state.products
    .map((p) => `<option value="${p.id}">${p.sku} — ${p.name} (stock: ${p.stock})</option>`)
    .join("");
}

async function loadMovements() {
  const { movements } = await api("/api/movements");
  if (!movements.length) {
    $("#movements-table").innerHTML = `<div class="empty">Sin movimientos</div>`;
    return;
  }
  $("#movements-table").innerHTML = `
    <table>
      <thead>
        <tr><th>Fecha</th><th>SKU</th><th>Producto</th><th>Tipo</th><th>Cant.</th><th>Motivo</th><th>Usuario</th></tr>
      </thead>
      <tbody>
        ${movements
          .map(
            (m) => `
          <tr>
            <td>${new Date(m.createdAt).toLocaleString("es-CO")}</td>
            <td class="sku">${escapeHtml(m.sku)}</td>
            <td>${escapeHtml(m.productName)}</td>
            <td>${m.type}</td>
            <td>${m.quantity}</td>
            <td>${escapeHtml(m.reason || "—")}</td>
            <td>${escapeHtml(m.user)}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
}

async function loadAlerts() {
  const { products } = await api("/api/products?lowStock=true");
  $("#alerts-table").innerHTML = productsTable(products, { actions: false });
}

async function refreshAll() {
  try {
    await loadAllProductsForState();
    await Promise.all([loadDashboard(), loadProducts(), loadMovements(), loadAlerts()]);
  } catch (err) {
    if (String(err.message).includes("No autenticado") || String(err.message).includes("401")) {
      logout();
    } else {
      console.error(err);
    }
  }
}

function logout() {
  state.token = "";
  state.user = null;
  localStorage.removeItem("sp_token");
  localStorage.removeItem("sp_user");
  showLogin();
}

function openProductDialog(product) {
  $("#product-error").hidden = true;
  $("#product-dialog-title").textContent = product ? "Editar producto" : "Nuevo producto";
  $("#product-id").value = product?.id || "";
  $("#p-sku").value = product?.sku || "";
  $("#p-name").value = product?.name || "";
  $("#p-category").value = product?.category || "";
  $("#p-price").value = product?.price ?? "";
  $("#p-stock").value = product?.stock ?? 0;
  $("#p-stock").disabled = Boolean(product);
  $("#p-min").value = product?.minStock ?? 0;
  $("#p-unit").value = product?.unit || "und";
  $("#p-location").value = product?.location || "";
  $("#product-dialog").showModal();
}

// Events
$("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("#login-error").hidden = true;
  try {
    const data = await api("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: $("#username").value.trim(),
        password: $("#password").value,
      }),
    });
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem("sp_token", data.token);
    localStorage.setItem("sp_user", JSON.stringify(data.user));
    showApp();
  } catch (err) {
    $("#login-error").hidden = false;
    $("#login-error").textContent = err.message;
  }
});

$("#logout-btn").addEventListener("click", logout);

$$(".nav-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    setView(btn.dataset.view);
  })
);

$("#btn-search").addEventListener("click", () => loadProducts());
$("#search-q").addEventListener("keydown", (e) => {
  if (e.key === "Enter") loadProducts();
});

$("#btn-new-product").addEventListener("click", () => openProductDialog(null));
$("#btn-new-movement").addEventListener("click", async () => {
  $("#movement-error").hidden = true;
  await loadAllProductsForState();
  $("#movement-dialog").showModal();
});

$("#export-csv").addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const res = await api("/api/export/csv");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Error HTTP ${res.status}`);
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventario.csv";
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert(err.message);
  }
});

$("#products-table").addEventListener("click", async (e) => {
  const editId = e.target.getAttribute("data-edit");
  const delId = e.target.getAttribute("data-del");
  if (editId) {
    const p = state.products.find((x) => x.id === editId) || (await api(`/api/products/${editId}`)).product;
    openProductDialog(p);
  }
  if (delId) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await api(`/api/products/${delId}`, { method: "DELETE" });
      await refreshAll();
    } catch (err) {
      alert(err.message);
    }
  }
});

$("#product-form").addEventListener("submit", async (e) => {
  if (e.submitter?.value === "cancel") return;
  e.preventDefault();
  $("#product-error").hidden = true;
  const id = $("#product-id").value;
  const payload = {
    sku: $("#p-sku").value,
    name: $("#p-name").value,
    category: $("#p-category").value,
    price: Number($("#p-price").value),
    stock: Number($("#p-stock").value),
    minStock: Number($("#p-min").value),
    unit: $("#p-unit").value,
    location: $("#p-location").value,
  };
  try {
    if (id) {
      await api(`/api/products/${id}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await api("/api/products", { method: "POST", body: JSON.stringify(payload) });
    }
    $("#product-dialog").close();
    await refreshAll();
  } catch (err) {
    $("#product-error").hidden = false;
    $("#product-error").textContent = err.message;
  }
});

$("#movement-form").addEventListener("submit", async (e) => {
  if (e.submitter?.value === "cancel") return;
  e.preventDefault();
  $("#movement-error").hidden = true;
  try {
    await api("/api/movements", {
      method: "POST",
      body: JSON.stringify({
        productId: $("#m-product").value,
        type: $("#m-type").value,
        quantity: Number($("#m-qty").value),
        reason: $("#m-reason").value,
      }),
    });
    $("#movement-dialog").close();
    await refreshAll();
  } catch (err) {
    $("#movement-error").hidden = false;
    $("#movement-error").textContent = err.message;
  }
});

// Boot
(async function boot() {
  if (!state.token || !state.user) {
    showLogin();
    return;
  }
  try {
    await api("/api/me");
    showApp();
  } catch {
    logout();
  }
})();
