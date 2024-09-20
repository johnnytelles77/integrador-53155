
import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../dirname.js";

const swaggeroptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "documentacion de API E-Commerce",
            version: "1.0.1",
            description: "API E-Commerce"
        },
    },
    apis:[`${__dirname}/src/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggeroptions);