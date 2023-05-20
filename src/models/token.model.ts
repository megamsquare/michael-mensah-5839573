import { Model, DataTypes } from "sequelize";
import sequelize from "../db/mysql_db";

// interface TokenAttributes {
//     index: number;
//     contract_address: string;
//     current_price: number | null;
//   }


class Token extends Model {
    public id!: number;
    public index!: number;
    public contract_address!: string;
    public current_price!: number | null;
}

Token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        index: {
            type: DataTypes.INTEGER
        },
        contract_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        current_price: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'token',
        modelName: 'token',
        timestamps: true,
    }
);

export default Token;

