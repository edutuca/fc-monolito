import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { checkoutRouter } from "../../checkout/api/checkout.route";
import OrderModel from "../../checkout/repository/checkout.model";
import { clientAdmRouter } from "../../client-adm/api/client-adm.route";
import { ClientModel } from "../../client-adm/repository/client.model";
import { InvoiceItemModel } from "../../invoice/repository/invoice-item.model";
import { InvoiceModel } from "../../invoice/repository/invoice.model";
import TransactionModel from "../../payment/repository/transaction.model";
import { productRouter } from "../../product-adm/api/product.route";
import { ProductModel } from "../../product-adm/repository/product.model";
import { ProductCatalogModel } from "../../store-catalog/repository/product-catalog.model";
import { invoiceRouter } from "../../invoice/api/invoice.route";

export const app:Express = express();
app.use(express.json());
app.use("/products", productRouter);
app.use("/client-adm", clientAdmRouter);
app.use("/checkout", checkoutRouter);
app.use("/invoice", invoiceRouter);

export let sequelize:Sequelize;

export let migration: Umzug<any>;

export let setupDbSequelize =  async function () {
    jest.setTimeout(99999999);
    
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
    });

    await sequelize.addModels([ProductCatalogModel, ProductModel, ClientModel, InvoiceModel, InvoiceItemModel, OrderModel, TransactionModel]);
    await sequelize.sync();
}

export let setupDbUmzug =  async function() {
    jest.setTimeout(99999999);

    sequelize = new Sequelize({dialect: 'sqlite', storage: ":memory:", logging: true})
    sequelize.addModels([ProductCatalogModel, ProductModel, ClientModel, InvoiceModel, InvoiceItemModel, OrderModel, TransactionModel]);
 
    migration = migrator(sequelize);
    await migration.up()
}

setupDbUmzug();