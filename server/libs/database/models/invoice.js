const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = function (sequelize) {

    class Invoice extends Model { }

    Invoice.init({
        // attributes
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        description: {
            type: Sequelize.NUMBER,
            allowNull: true
        },
    },
        {
            sequelize,
            modelName: 'invoice'
            // options
        });

    return Invoice;
};