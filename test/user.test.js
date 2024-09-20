import mongoose from "mongoose";
import envConfig from "../src/config/env.config.js";
import UserRepository from "../src/persistences/mongo/repositories/user.repository.js";
import { expect } from "chai"


mongoose.connect(envConfig.MONGO_URL)

describe("Test User Repository", () => {

    before(() => {
        console.log("Se ejecuta antes de cada test")
    })

    it("Obtener todos los usuarios", async () => {
        const users = await UserRepository.getAll()
        expect(users).to.be.an("array")
    })

    let userId;
    let userEmail

    it("Crear un usuario", async () => {
        const newUser = {
            first_name: `User Test`,
            last_name: `Test`,
            email: `User-test@test.com`,
            password: `123`,
            age: 20
        }

        const user = await UserRepository.create(newUser);
        userId = user._id;
        userEmail = user.email;

        expect(user.first_name).to.be.equal("User Test")
        expect(user.last_name).to.be.equal("Test")
        expect(user.email).to.be.equal("User-test@test.com")
        expect(user.password).to.be.equal("123")
        expect(user.role).to.be.equal("user")

    })

    it("Obtener un usuario por id", async () => {
        const user = await UserRepository.getById(userId)
        expect(user).to.be.an("object");
        expect(user.email).to.be.equal("User-test@test.com");
        expect(user.password).to.not.equal("dadsfsg");
        expect(user.password).to.not.equal("number");
    })


    it("Obtener un usuario por email", async () => {
        const user = await UserRepository.getByEmail(userEmail);
        expect(user).to.be.an("object");
        expect(user.email).to.equal("User-test@test.com");
        expect(user.password).to.not.equal("dsfafasdf");
        expect(user.password).to.not.an("number");
    });



    it("Actualizar usuario", async () => {
        const user = await UserRepository.update(userId, {
            first_name: "User Update",
            last_name: "Update",
            age: 50
        })
        expect(user.first_name).to.be.equal("User Update")
        expect(user.last_name).to.be.equal("Update")
        expect(user.age).to.not.equal(22)
    })

    it("Eliminar un usuario por id", async () => {
        await UserRepository.deleteOne(userId);
        const user = await UserRepository.getById(userId);
        expect(user).to.be.null;
    }); 
    

    after( async () => {
        console.log("Se ejecuta al finalizar los test")
        await UserRepository.deleteOne(userId)
        mongoose.disconnect();
    })

/*      afterEach(() => {
        console.log("Se ejecuta al finalizar cada test")
        mongoose.disconnect();
    }) */


}) 
