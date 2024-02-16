import {Request, Response, Router} from 'express';
import {validator_product} from "../utils/validators";
import {validationResult} from "express-validator";
import {Op} from "sequelize";
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



const router = Router();

//récupère la liste de tous les produits
router.get('', async (_req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await Product.findAll();
        res.status(HTTP_OK).send(products);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

//récupère les infos d'un produit selon son id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        return !product ?
            res.status(HTTP_NOT_FOUND).send({error: `User with ID ${req.params.id} not found`}) :
            res.status(HTTP_OK).send(product);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});
export default router;