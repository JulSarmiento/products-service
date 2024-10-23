import fs from "fs/promises";
import path from "node:path";
import { test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../../src/app.js";

// cartId
test("POST /cart - deberia retornar 201 y crear el carrito", async (t) => {});

test("POST /orders - deberia retornar 200 y crear la orden", async (t) => {
  const {
    body: {
      data: { id: cartId },
    },
  } = await request(app)
    .post("/cart")
    .send({
      email: "foo@bar.com",
    })
    .expect(200);

  const body = await fs.readFile(
    path.resolve("test", "integration", "datas", "createOrder.json"),
    "utf-8"
  );

  const jsonData = JSON.parse(data);
  body.cartId = cartId;

  const res = await request(app).post("/orders").send(jsonData).expect(201);

  assert.ok(res.body);
});
