import {DataTypes, Model, Sequelize} from 'sequelize';
import User from './user.model';

class Order extends Model {
    public orderId!: number;
    public totalPrice!: number;
    public userId!:number;

    static initModel(sequelize: Sequelize) {
        Order.init(
            {
                orderId:{
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                totalPrice:{
                    type: DataTypes.NUMBER,
                    allowNull: false,
                },
                userId:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: User,
                        key: 'userId'
                    }
                }
            },
            {
                tableName:"Order",
                sequelize: sequelize,
                timestamps: false
            }
        );
    }
}

export default Order;