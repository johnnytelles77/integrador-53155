
import ProductService from "../service/products.services.js";
import { logger } from "../utils/logger.js";

class ProductController {
    static async getAll(req, res, next) {
        try {
            const { limit, page, sort, category, status } = req.query;
            const options = {
                limit: limit || 10,
                page: page || 1,
                sort: {
                    price: sort === "asc" ? 1 : -1,
                },
                lean: true,
            };

            if (status) {
                const products = await ProductService.getAll({ status: status }, options);
                return res.status(200).json({ products });
            }

            if (category) {
                const products = await ProductService.getAll({ category: category }, options);
                return res.status(200).json({ status: "succes", products });
            }

            const products = await ProductService.getAll({}, options);

            res.status(200).json({ status: "success", products });
        } catch (error) {
            logger.log("error", err.message)
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { pid } = req.params;
            const product = await ProductService.getById(pid);
            res.status(200).json({ status: "success", payload: product });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            // Si tu logger requiere un nivel de log, utiliza algo como "info" o "debug"
            logger.info("Agregando un nuevo producto...");
    
            const product = req.body;
            logger.info("Datos del nuevo producto:", product);
    
            const newProduct = await ProductService.create(product);
            logger.info("Producto agregado:", newProduct);
    
            res.status(201).json({ status: "success", payload: newProduct });
        } catch (error) {
            logger.error("Error al agregar un nuevo producto:", error);
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { pid } = req.params;
            logger.log('info', `Actualizando producto con ID: ${pid}`);
            
            const productData = req.body;
            logger.log('info', `Nuevos datos del producto: ${JSON.stringify(productData)}`);
    
            const updateProduct = await ProductService.update(pid, productData);
    
            if (!updateProduct) {
                return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });
            }
    
            res.status(200).json({ status: "success", payload: updateProduct });
        } catch (error) {
            logger.error(`Error al actualizar producto con ID ${pid}:`, error);
            next(error);
        }
    }
    

    static async deleteOne(req, res, next) {
        try {
            const { pid } = req.params;
            const product = await ProductService.deleteOne(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });

            res.status(200).json({ status: "success", payload: "Producto eliminado" });
        } catch (error) {
            logger.error(`Error al eliminar producto con ID ${pid}:`, error);
            next(error);
        }
    }
}

export default ProductController;
