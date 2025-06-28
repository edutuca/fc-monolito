import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('products', {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    purchasePrice: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    salesPrice: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  })
 
  await sequelize.getQueryInterface().createTable('client', {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    document: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    street:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    number:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    complement:{
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city:{
      type: DataTypes.STRING(255),
      allowNull: false    
    },
    state:{
      type: DataTypes.STRING(255),
      allowNull: false    
    },    
    zipcode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  })

  await sequelize.getQueryInterface().createTable('invoice', {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    document: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    street:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    number:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    complement:{
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city:{
      type: DataTypes.STRING(255),
      allowNull: false    
    },
    state:{
      type: DataTypes.STRING(255),
      allowNull: false    
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  })

  await sequelize.getQueryInterface().createTable('invoiceItem', {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    invoiceId:{      
      type: DataTypes.STRING(255),
      references: {
          model: {
            tableName: 'invoice'
          },
          key: 'id',
       },      
      allowNull: true    
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  })

  await sequelize.getQueryInterface().createTable('order', {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    idClient: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idProduct: {
      type: DataTypes.STRING(255),
      allowNull: false    
    },
    status:{
      type: DataTypes.STRING(255),
      allowNull: false
    }
  })
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('products')
  await sequelize.getQueryInterface().dropTable('client')
  await sequelize.getQueryInterface().dropTable('invoiceItem')
  await sequelize.getQueryInterface().dropTable('invoice')
  await sequelize.getQueryInterface().dropTable('order')
}