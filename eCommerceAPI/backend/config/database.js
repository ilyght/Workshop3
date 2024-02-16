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
const user_model_1 = require("./models/user.model");
const order_model_1 = require("./models/order.model");
const cart_model_1 = require("./models/cart.model");
const product_model_1 = require("./models/product.model");
const productOrdered_model_1 = require("./models/productOrdered.model"); /*

config();
const DB_NAME: string = process.env.DB_NAME || null;
const DB_USER: string = process.env.DB_USER || null;
const DB_PASSWORD: string = process.env.DB_PASSWORD || null;
const DB_HOST: string = process.env.DB_HOST || null;
const DB_PORT: number = Number(process.env.DB_PORT) || null;

const setupDatabase = async (seedDB: boolean): Promise<void> => {
    if (!DB_NAME || !DB_USER || !DB_PASSWORD ||!DB_HOST || !DB_PORT) {
        console.error('Missing database environment variables, refer to the BUILD.md file to set them up.');
        process.exit(1);
    }

    const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: Number(DB_PORT),
        dialect: 'postgres',
        logging: false, // set to console.log to see the raw SQL queries
        define: {
            timestamps: false // true by default. false because default sequelize adds createdAt, modifiedAt
        }
    });

    User.initModel(sequelize);
    Product.initModel(sequelize);
    Cart.initModel(sequelize);
    Order.initModel(sequelize);
    ProductOrdered.initModel(sequelize);

    await sequelize.sync();

};*/
const { Sequelize } = require('sequelize');
// Configuration de la connexion à la base de données
const sequelize = new Sequelize('ecommerce', 'postgres', 'Password1*', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
    define: {
        timestamps: false // true by default. false because default sequelize adds createdAt, modifiedAt
    }
});
// Testez la connexion
const setupDatabase = (() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connecté à la base de données PostgreSQL avec succès.');
    }
    catch (error) {
        console.error('Erreur lors de la connexion à la base de données:', error);
        user_model_1.default.initModel(sequelize);
        product_model_1.default.initModel(sequelize);
        cart_model_1.default.initModel(sequelize);
        order_model_1.default.initModel(sequelize);
        productOrdered_model_1.default.initModel(sequelize);
        yield sequelize.sync();
    }
}))();
exports.default = setupDatabase;
//# sourceMappingURL=database.js.map