/* import supertest from "supertest";
import envConfig from "../src/config/env.config.js";
import { expect } from "chai";
import mongoose from "mongoose";

mongoose.connect(envConfig.MONGO_URL); // Conectar a la base de datos

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Cart Test", () => {
  let cookie;
  let cartId;
  let productId;

  before(async () => {
    // Realizamos el login
    const loginUser = {
      email: "usuario12@test.com",
      password: "12345",
    };

    // Hacemos la solicitud de login
    const { headers } = await requester.post("/api/session/login").send(loginUser);
    console.log(headers)

    const cookieResult = headers["set-cookie"][0];
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1].split(";")[0],
    };

    // Creamos un carrito
    const cartResponse = await requester
      .post("/api/carts")
      .set("Cookie", `${cookie.name}=${cookie.value}`);
    cartId = cartResponse.body._id;

    // Creamos un producto para agregar al carrito
    const newProduct = {
        title: "Producto Test",
        description: "Este es un producto test",
        price: 9100,
        thumbnail: "http://www.google.com",
        code: "ADF",
        stock: 20,
        category: "Electronics"
    };
    const productResponse = await requester
      .post("/api/products")
      .send(newProduct)
      .set("Cookie", `${cookie.name}=${cookie.value}`);

    productId = productResponse.body._id;
  });

  it("[POST] /api/carts/:cid/product/:pid => Debe agregar un producto al carrito", async () => {
    const { status, body, ok } = await requester
      .post(`/api/carts/${cartId}/product/${productId}`)
      .set("Cookie", `${cookie.name}=${cookie.value}`);
      console.log(`Status: ${status}, Body:`, body);

    expect(status).to.equal(200);
    expect(ok).to.be.true;
    expect(body).to.have.property("status", "Success");
    expect(body.payload).to.have.property("_id", cartId);
    expect(body.payload.products).to.be.an("array");
    expect(productId).to.exist;
    expect(productId).to.be.a('string');


    // Verificamos que el producto fue agregado correctamente al carrito
    const productInCart = body.payload.products.find((p) => p.product._id === productId);
    expect(productInCart).to.exist;
  });

/*   after(async () => {
    await mongoose.disconnect(); // Desconectamos la base de datos después de las pruebas
  }); 
});
 */

import supertest from "supertest";
import envConfig from "../src/config/env.config.js";
import { expect } from "chai";
import mongoose from "mongoose";

mongoose.connect(envConfig.MONGO_URL); // Conectar a la base de datos

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Cart Test", () => {
  let cookie;
  let cartId;
  let productId;

  before(async () => {
    // Realizamos el login
    const loginUser = {
      email: "usuario12@test.com",
      password: "12345",
    };

    // Hacemos la solicitud de login
    const { headers } = await requester.post("/api/session/login").send(loginUser);
    console.log(headers);

    const cookieResult = headers["set-cookie"][0];
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1].split(";")[0],
    };

    // Creamos un carrito
    const cartResponse = await requester
      .post("/api/carts")
      .set("Cookie", `${cookie.name}=${cookie.value}`);
    cartId = cartResponse.body._id;

    console.log("Carrito creado con ID:", cartId);

    // Creamos un producto para agregar al carrito
    const newProduct = {
      title: "Producto Test",
      description: "Este es un producto test",
      price: 9100,
      thumbnail: "http://www.google.com",
      code: "ADF",
      stock: 20,
      category: "Electronics"
    };

    const productResponse = await requester
      .post("/api/products")
      .send(newProduct)
      .set("Cookie", `${cookie.name}=${cookie.value}`);

    productId = productResponse.body._id;

    console.log("Producto creado con ID:", productId);
  });

  it("[POST] /api/carts/:cid/product/:pid => Debe agregar un producto al carrito", async () => {
    // Validamos que el cartId y productId no sean undefined
    expect(cartId).to.exist;
    expect(productId).to.exist;

    const { status, body, ok } = await requester
      .post(`/api/carts/${cartId}/product/${productId}`)
      .set("Cookie", `${cookie.name}=${cookie.value}`);
    
    console.log(`Status: ${status}, Body:`, body);

    expect(status).to.equal(200);
    expect(ok).to.be.true;
    expect(body).to.have.property("status", "Success");
    expect(body.payload).to.have.property("_id", cartId);
    expect(body.payload.products).to.be.an("array");

    // Verificamos que el producto fue agregado correctamente al carrito
    const productInCart = body.payload.products.find((p) => p.product._id === productId);
    expect(productInCart).to.exist;
  });
});
