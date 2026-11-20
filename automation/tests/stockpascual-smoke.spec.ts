import { test, expect } from "@playwright/test";

/**
 * Smoke / esqueleto E2E — StockPascual
 * Completar con el flujo completo del laboratorio (IN/OUT/alertas).
 */
test("login admin y ver dashboard", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Usuario").fill("admin");
  await page.getByLabel("Contraseña").fill("Admin123!");
  await page.getByRole("button", { name: "Ingresar" }).click();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByText(/Ana Admin/i)).toBeVisible();
});

test("operador no ve botón + Producto", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Usuario").fill("operador");
  await page.getByLabel("Contraseña").fill("Oper123!");
  await page.getByRole("button", { name: "Ingresar" }).click();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByRole("button", { name: "+ Producto" })).toHaveCount(0);
});
