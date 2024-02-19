import {Request, Response, Router} from 'express';
import {validator_order} from "../utils/validators";
import {validationResult} from "express-validator";
import {Op, Sequelize} from "sequelize";
import {
    HTTP_BAD_REQUEST,
    HTTP_CONFLICT,
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_OK,
    HTTP_UPDATED
} from "../utils/httpCode";
import User from '../config/models/user.model';
import Product from "../config/models/product.model";
import Order from "../config/models/order.model";
import ProductOrdered from "../config/models/productOrdered.model";
import Cart from "../config/models/cart.model";

const router = Router();

//récupère toutes les commandes
router.get('', async (_req: Request, res: Response): Promise<void> => {
    try {
        const orders: Order[] = await Order.findAll();
        res.status(HTTP_OK).send(orders);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

//recupère les infos d'une commande en fonction de l'id d'une order
router.get('/:orderId', async (req: Request, res: Response) => {
    try {
        const order = await Order.findByPk(req.params.orderId);
        const productsOrdered: ProductOrdered[] = await ProductOrdered.findAll({
            where: {orderId: req.params.orderId}
        });
        const poIds = [];
        for (let i = 0; i<productsOrdered.length; i++)
        {
            poIds.push(productsOrdered[i].productId);
        }
        const productsDetails: Product[] = await Product.findAll({
            where: {productId: {
                    [Op.in]: poIds
                }}
        });
        const finalDetails = [];
        for (let i = 0; i<productsOrdered.length; i++)
        {
            for(let j = 0; j<productsDetails.length; j++)
            {
                if(productsOrdered[i].productId==productsDetails[j].productId)
                {
                    const dict1 = {
                        'id':productsDetails[j].productId,
                        'name':productsDetails[j].name,
                        'price':productsDetails[j].price,
                        'quantity':productsOrdered[i].quantity
                    };
                    finalDetails.push(dict1);
                }
            }
        }
        const dict = {
            'orderId': order.orderId,
            'total price': order.totalPrice,
            'order detail': finalDetails
        }
        res.status(HTTP_OK).send(dict);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});


router.post('',validator_order, async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
        }
        const {userId} = req.body;
        const orderProducts : Cart[] = await Cart.findAll({
            where: {userId: userId}
        });
        var totalPrice = 0
        for(let i = 0; i<orderProducts.length; i++){
            const product: Product = await Product.findByPk(orderProducts[i].productId)
            totalPrice = totalPrice + orderProducts[i].quantity*product.price;
        }

        const newOrder = {userId, totalPrice};
        const createdOrder: Order = await Order.create(newOrder);

        for(let i = 0; i<orderProducts.length; i++){
            const orderid = createdOrder.orderId;
            const productid = orderProducts[i].productId;
            const quantity = orderProducts[i].quantity;
            const newproductordered = {orderid, productid, quantity};
            const createdproductordered: ProductOrdered = await ProductOrdered.create(newproductordered)
        }

        const order = await Order.findByPk(req.params.orderId);
        const productsOrdered: ProductOrdered[] = await ProductOrdered.findAll({
            where: {orderId: req.params.orderId}
        });
        const poIds = [];
        for (let i = 0; i<productsOrdered.length; i++)
        {
            poIds.push(productsOrdered[i].productId);
        }
        const productsDetails: Product[] = await Product.findAll({
            where: {productId: {
                    [Op.in]: poIds
                }}
        });
        const finalDetails = [];
        for (let i = 0; i<productsOrdered.length; i++)
        {
            for(let j = 0; j<productsDetails.length; j++)
            {
                if(productsOrdered[i].productId==productsDetails[j].productId)
                {
                    const dict1 = {
                        'id':productsDetails[j].productId,
                        'name':productsDetails[j].name,
                        'price':productsDetails[j].price,
                        'quantity':productsOrdered[i].quantity
                    };
                    finalDetails.push(dict1);
                }
            }
        }
        const dict = {
            'orderId': order.orderId,
            'total price': order.totalPrice,
            'order detail': finalDetails
        }
        //return !order ?
        //res.status(HTTP_NOT_FOUND).send({error: `order made by user with ID ${req.params.orderId} not found`});
        res.status(HTTP_OK).send(dict);


    } catch (error){
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});}
});


export default router;