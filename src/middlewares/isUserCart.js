import { request, response} from "express"


class isUserCart {
    static async checkisUsercart(req = request, res = response, next) {
        const { cid } = req.params;
        if(req.user.cart !== cid) return res.status(401).json({status: "error", msg: "El id del carrito no corresponde al usuario"});

        next();
    }
}

export default isUserCart;