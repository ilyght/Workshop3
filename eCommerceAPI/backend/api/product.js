"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const httpCode_1 = require("../utils/httpCode");
const product_model_1 = require("../config/models/product.model");
const router = (0, express_1.Router)();
//récupère la liste de tous les produits
router.get('', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.findAll();
        res.status(httpCode_1.HTTP_OK).send(products);
    }
    catch (error) {
        res.status(httpCode_1.HTTP_INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}));
//récupère les infos d'un produit selon son id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByPk(req.params.id);
        return !product ?
            res.status(httpCode_1.HTTP_NOT_FOUND).send({ error: `User with ID ${req.params.id} not found` }) :
            res.status(httpCode_1.HTTP_OK).send(product);
    }
    catch (error) {
        res.status(httpCode_1.HTTP_INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=product.js.map