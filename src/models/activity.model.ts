import { Model, DataTypes } from "sequelize";
import sequelize from "../db/mysql_db";

// Define the "activity" table
// interface ActivityAttributes {
//     contract_address: string;
//     token_index: number;
//     listing_price: number;
//     maker: string;
//     listing_from: Date;
//     listing_to: Date;
//     event_timestamp: Date;
//   }


class Activity extends Model {
    public id!: number;
    public contract_address!: string;
    public token_index!: number;
    public listing_price!: number;
    public maker!: string;
    public listing_from!: Date;
    public listing_to!: Date;
    public event_timestamp!: Date;
}

Activity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        contract_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        listing_price: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
        },
        maker: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listing_from: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        listing_to: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        event_timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'activity',
        modelName: 'activity',
        timestamps: true
    }
);

export default Activity;