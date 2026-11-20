/**
 * StockPascual — API + estáticos con Express
 * Laboratorio Pruebas Automatizadas II + IA
 *
 * Arranque:
 *   cd app
 *   npm install
 *   npm start
 *
 * Credenciales:
 *   admin / Admin123!
 *   operador / Oper123!
 */
const express = require("express");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3080;
const PUBLIC = path.join(__dirname, "public");

const users = [
  { id: 1, username: "admin", password: "Admin123!", role: "admin", name: "Ana Admin" },
  { id: 2, username: "operador", password: "Oper123!", role: "operator", name: "Carlos Operador" },
];

/** Semilla de productos — algunos datos ya están inconsistentes a propósito */
let products = [
  {
    id: "p1",
    sku: "CAB-USB-01",
    name: "Cable USB-C 1m",
    category: "Accesorios",
    price: 18900,
    stock: 40,
    minStock: 10,
    unit: "und",
    location: "A-01",
    active: true,
  },
  {
    id: "p2",
    sku: "MOU-WL-02",
    name: "Mouse inalámbrico",
    category: "Periféricos",
    price: 45900,
    stock: 8,
    minStock: 15,
    unit: "und",
    location: "B-12",
    active: true,
  },
  {
    id: "p3",
    sku: "TEC-MEC-03",
    name: "Teclado mecánico",
    category: "Periféricos",
    price: 189000,
    stock: 22,
    minStock: 5,
    unit: "und",
    location: "B-03",
    active: true,
  },
  {
    id: "p4",
    sku: "MON-24-04",
    name: 'Monitor 24" IPS',
    category: "Pantallas",
    price: 520000,
    stock: 3,
    minStock: 4,
    unit: "und",
    location: "C-01",
    active: true,
  },
  {
    id: "p5",
    sku: "AUD-BT-05",
    name: "Audífonos Bluetooth",
    category: "Audio",
    price: 99000,
    stock: 0,
    minStock: 8,
    unit: "und",
    location: "A-09",
    active: true,
  },
];

let movements = [
  {
    id: "m1",
    productId: "p1",
    type: "IN",
    quantity: 50,
    reason: "Compra inicial",
    user: "admin",
    createdAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "m2",
    productId: "p1",
    type: "OUT",
    quantity: 10,
    reason: "Entrega laboratorio",
    user: "operador",
    createdAt: "2026-03-05T14:20:00.000Z",
  },
];

const sessions = new Map();

function nextId(prefix) {
  return `${prefix}${crypto.randomBytes(4).toString("hex")}`;
}

function getUser(req) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return sessions.get(token) || null;
}

function requireAuth(req, res, next) {
  const user = getUser(req);
  if (!user) {
    return res.status(401).json({ error: "No autenticado" });
  }
  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Solo admin puede realizar esta acción" });
  }
  next();
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "StockPascual", version: "1.0.0-lab", stack: "express" });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  const found = users.find((u) => u.username === username && u.password === password);
  if (!found) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  const token = crypto.randomBytes(16).toString("hex");
  sessions.set(token, {
    id: found.id,
    username: found.username,
    role: found.role,
    name: found.name,
  });
  res.json({
    token,
    user: { username: found.username, role: found.role, name: found.name },
  });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.get("/api/products", requireAuth, (req, res) => {
  const q = String(req.query.q || "").trim();
  const category = String(req.query.category || "");
  const lowOnly = req.query.lowStock === "true";

  let list = [...products];

  // BUG-01 (semilla): búsqueda case-sensitive
  if (q) {
    list = list.filter((p) => p.name.includes(q) || p.sku.includes(q));
  }
  if (category) {
    list = list.filter((p) => p.category === category);
  }
  if (lowOnly) {
    list = list.filter((p) => p.stock <= p.minStock);
  }
  res.json({ products: list });
});

app.get("/api/products/:id", requireAuth, (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json({ product });
});

app.post("/api/products", requireAuth, requireAdmin, (req, res) => {
  const body = req.body || {};

  // BUG-02: no valida SKU duplicado
  // BUG-03: acepta precio/stock negativos
  // BUG-04: validación incompleta (solo name)
  if (!body.name || String(body.name).trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  const product = {
    id: nextId("p"),
    sku: String(body.sku || "").trim(),
    name: String(body.name).trim(),
    category: String(body.category || "General").trim(),
    price: Number(body.price),
    stock: Number(body.stock ?? 0),
    minStock: Number(body.minStock ?? 0),
    unit: String(body.unit || "und"),
    location: String(body.location || ""),
    active: body.active !== false,
  };
  products.push(product);
  res.status(201).json({ product });
});

app.put("/api/products/:id", requireAuth, requireAdmin, (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx < 0) return res.status(404).json({ error: "Producto no encontrado" });

  const body = req.body || {};
  const current = products[idx];
  products[idx] = {
    ...current,
    sku: body.sku !== undefined ? String(body.sku).trim() : current.sku,
    name: body.name !== undefined ? String(body.name).trim() : current.name,
    category: body.category !== undefined ? String(body.category).trim() : current.category,
    price: body.price !== undefined ? Number(body.price) : current.price,
    minStock: body.minStock !== undefined ? Number(body.minStock) : current.minStock,
    unit: body.unit !== undefined ? String(body.unit) : current.unit,
    location: body.location !== undefined ? String(body.location) : current.location,
    active: body.active !== undefined ? Boolean(body.active) : current.active,
  };
  res.json({ product: products[idx] });
});

app.delete("/api/products/:id", requireAuth, requireAdmin, (req, res) => {
  const before = products.length;
  products = products.filter((p) => p.id !== req.params.id);
  // BUG-05: no limpia movimientos asociados
  if (products.length === before) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json({ ok: true });
});

app.post("/api/movements", requireAuth, (req, res) => {
  const body = req.body || {};
  const product = products.find((p) => p.id === body.productId);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });

  const type = String(body.type || "").toUpperCase();
  const quantity = Number(body.quantity);
  if (!["IN", "OUT", "ADJUST"].includes(type)) {
    return res.status(400).json({ error: "Tipo inválido. Use IN, OUT o ADJUST" });
  }
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Cantidad debe ser mayor a 0" });
  }

  // BUG-06: OUT permite stock negativo
  // BUG-07: ADJUST suma en vez de fijar stock
  if (type === "IN") {
    product.stock += quantity;
  } else if (type === "OUT") {
    product.stock -= quantity;
  } else if (type === "ADJUST") {
    product.stock = product.stock + quantity; // debería: product.stock = quantity
  }

  const movement = {
    id: nextId("m"),
    productId: product.id,
    type,
    quantity,
    reason: String(body.reason || ""),
    user: req.user.username,
    createdAt: new Date().toISOString(),
  };
  movements.unshift(movement);
  res.status(201).json({ movement, product });
});

app.get("/api/movements", requireAuth, (req, res) => {
  let list = [...movements];
  if (req.query.productId) {
    list = list.filter((m) => m.productId === req.query.productId);
  }
  const enriched = list.map((m) => {
    const p = products.find((x) => x.id === m.productId);
    return {
      ...m,
      productName: p ? p.name : "(producto eliminado)",
      sku: p ? p.sku : "—",
    };
  });
  res.json({ movements: enriched });
});

app.get("/api/dashboard", requireAuth, (_req, res) => {
  const totalProducts = products.filter((p) => p.active).length;
  const lowStock = products.filter((p) => p.stock <= p.minStock).length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;
  // BUG-08: valor mal calculado (/ 1000)
  const inventoryValue = products.reduce((acc, p) => acc + (p.stock * p.price) / 1000, 0);
  const recentMovements = movements.length;

  res.json({
    metrics: {
      totalProducts,
      lowStock,
      outOfStock,
      inventoryValue,
      recentMovements,
    },
  });
});

app.get("/api/export/csv", requireAuth, (req, res) => {
  // BUG-09: export truncado + sin escape
  const slice = products.slice(0, Math.max(0, products.length - 2));
  const header = "sku,name,category,price,stock,minStock,location";
  const rows = slice.map(
    (p) => `${p.sku},${p.name},${p.category},${p.price},${p.stock},${p.minStock},${p.location}`
  );
  const csv = [header, ...rows].join("\n");
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="inventario.csv"');
  res.send(csv);
});

app.use(express.static(PUBLIC));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Error interno" });
});

app.listen(PORT, () => {
  console.log(`\n  StockPascual (Express) listo → http://localhost:${PORT}`);
  console.log(`  Usuarios: admin / Admin123!  |  operador / Oper123!\n`);
});
