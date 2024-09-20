import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import ProductController from "../controllers/products.controllers.js";
import ProductMock from "../mocks/product.mock.js";


const router = Router();

router.get("/productsmock", async (req, res) => {
  try {
    const products = await ProductMock.generateProductMock(100); // Espera a que los productos se generen
    return res.status(200).json({ status: "Ok", products });
  } catch (error) {
    return res.status(500).json({ status: "Error", error: error.message });
  }
});

router.get("/", ProductController.getAll);

router.get("/:pid", ProductController.getById);

router.post("/", passportCall("jwt"), authorization("admin"), ProductController.create);

router.put("/:pid", passportCall("jwt"), authorization("admin"), ProductController.update);

router.delete("/:pid", passportCall("jwt"), authorization("admin"), ProductController.deleteOne);



export default router;
