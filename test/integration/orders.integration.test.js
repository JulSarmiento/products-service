import fs from "fs/promises";
import path from 'node:path'
import { test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../../src/app.js";
// cartId
test("POST /cart - deberia retornar 201 y crear el carrito", async (t) => {
  const data = await fs.readFile(
    path.resolve("test", "integration", "datas", "createOrder.json"),
    "utf-8"
  );
  const jsonData = JSON.parse(data);

  const res = await request(app).post("/orders").send(jsonData).expect(201);
  
  assert.ok(res.body);
});

test("POST /orders - deberia retornar 200 y crear la orden", async (t) => {
  const data = await fs.readFile(
    path.resolve("test", "integration", "datas", "createOrder.json"),
    "utf-8"
  );
  const jsonData = JSON.parse(data);
  jsonData.cartId = "TODO: GENERATED CART ID"

  const res = await request(app).post("/orders").send(jsonData).expect(201);
  
  assert.ok(res.body);
});
