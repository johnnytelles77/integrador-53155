
import { expect } from "chai";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import envConfig from "../src/config/env.config.js";

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Test products", () => {
    let cookie;

    before(async () => {
        const loginUser = {
            email: "usuario1@test.com",
            password: "12345"
        };

        const { headers, body } = await requester
            .post("/api/session/login")
            .send(loginUser);

        console.log("Respuesta de login:", body);

        const cookieResult = headers["set-cookie"][0];

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        };

        console.log("Cookie extraída:", cookie);


        const token = cookie.value.split(';')[0];
        const decodedToken = jwt.decode(token);
        console.log("Token decodificado:", decodedToken);
    });

    let productId;

    it("[POST] /api/products este endpoint debe crear un producto", async () => {
        const newProduct = {
            title: "Producto Test",
            description: "Este es un producto test",
            price: 9100,
            thumbnail: "http://www.google.com",
            code: "ADF",
            stock: 20,
            category: "Electronics"
        };


        const { status, _body, ok } = await requester
            .post("/api/products")
            .send(newProduct)
            .set("Cookie", `${cookie.name}=${cookie.value}`);
        productId = _body.payload._id;

        expect(status).to.be.equal(201);
        expect(ok).to.be.equal(true);;
        expect(_body.payload.title).to.be.equal("Producto Test");;

        /// Pruebas Extras

        expect(_body.payload.title).to.be.equal("Producto Test");
        expect(_body.payload.description).to.be.equal("Este es un producto test");
        expect(_body.payload.price).to.be.equal(9100);
        expect(_body.payload.code).to.be.equal("ADF");
        expect(_body.payload.stock).to.be.equal(20);
        expect(_body.payload.category).to.be.equal("Electronics");


    });

    it("[GET] /api/products/:pid este endpoint debe devolver un producto", async () => {


        const { status, _body, ok } = await requester.get(`/api/products/${productId}`)

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);;
        expect(_body.payload.title).to.be.equal("Producto Test");

        /// Pruebas extras 


        expect(_body).to.have.property('payload');
        expect(_body.payload).to.have.property('title');
        expect(_body.payload).to.have.property('price');
        expect(_body.payload).to.have.property('category');

    });

    it("[GET] /api/products/ este endpoint debe devolver todos los productos", async () => {


        const { status, _body, ok } = await requester.get(`/api/products`)

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.products.docs).to.be.an("array");

        /// Priebas extras 

        expect(_body.products.docs.length).to.be.greaterThan(0);

        const firstProduct = _body.products.docs[0];
        expect(firstProduct).to.have.property('title');
        expect(firstProduct).to.have.property('price');

    });


    it("[PUT] /api/products/:pid este endpoint debe actualizar un producto", async () => {

        const updateData = {
            title: "test update",
            description: "product test update"
        }

        const { status, _body, ok } = await requester.put(`/api/products/${productId}`).send(updateData).set("Cookie", `${cookie.name}=${cookie.value}`);

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.payload.description).to.be.equal("product test update");
        expect(_body.payload.title).to.be.equal("test update");
        expect(_body.payload._id).to.be.equal(productId);

    });

    it("[DELETE] /api/products/:pid este endpoint debe eliminar un producto", async () => {

        const { status, _body, ok } = await requester.delete(`/api/products/${productId}`).set("Cookie", `${cookie.name}=${cookie.value}`);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);

        /// asegurar que el producto a sido eliminado

        const { status: getStatus } = await requester.get(`/api/products/${productId}`).set("Cookie", `${cookie.name}=${cookie.value}`);

        expect(getStatus).to.be.equal(404);
    });

    
    it("[DELETE] /api/products/:pid no debería eliminar un producto si el ID no existe", async () => {
        const invalidProductId = "64c72b06f28a4e3b98a4b888"; // Asegúrate de que este ID no exista
    
        const { status, _body } = await requester
            .delete(`/api/products/${invalidProductId}`)
            .set("Cookie", `${cookie.name}=${cookie.value}`);
    
        expect(status).to.be.equal(404);
        expect(_body.msg).to.be.equal(`Producto con el id ${invalidProductId} no encontrado`);
    });
    
});



