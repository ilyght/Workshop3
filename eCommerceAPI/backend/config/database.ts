//import {Sequelize} from 'sequelize';
import {config} from 'dotenv';
import User from './models/user.model';
import Order from "./models/order.model";
import Cart from "./models/cart.model";
import Product from "./models/product.model";
import ProductOrdered from "./models/productOrdered.model";/*

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
    port: 5432, // Par défaut, le port PostgreSQL est 5432
    logging: false, // set to console.log to see the raw SQL queries
    define: {
        timestamps: false // true by default. false because default sequelize adds createdAt, modifiedAt
    }
});

// Testez la connexion
const setupDatabase =(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connecté à la base de données PostgreSQL avec succès.');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données:', error);

        User.initModel(sequelize);
        Product.initModel(sequelize);
        Cart.initModel(sequelize);
        Order.initModel(sequelize);
        ProductOrdered.initModel(sequelize);

        await sequelize.sync();
    }
})();

export default setupDatabase;

