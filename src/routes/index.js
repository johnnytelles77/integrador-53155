import { Router } from "express";
import productsRouters from "./products.routes.js"
import cartsRouters from "./carts.routes.js"
import sessionRouters from "./session.routes.js"
import userRouters from "./user.routes.js";

const router = Router();

router.use("/products", productsRouters); /// Ruta de los productos solo si estas logueado
router.use("/carts", cartsRouters);  /// Ruta de los carritos
router.use("/session", sessionRouters);  /// Ruta de los carritos
router.use("/user", userRouters);


export default router;