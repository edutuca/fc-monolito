import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript"
import request from 'supertest'
import { Umzug } from "umzug"
import { ProductCatalogModel } from "../modules/store-catalog/repository/product-catalog.model"
import { migrator } from "./config-migrations/migrator"
import { ProductModel } from "../modules/product-adm/repository/product.model"
import { productRouter } from "../modules/product-adm/api/product.route"
import { clientAdmRouter } from "../modules/client-adm/api/client-adm.route"
import { checkoutRouter } from "../modules/checkout/api/checkout.route"

describe("Products tests", () => {

  jest.setTimeout(999999999);

  const app:Express = express();
  app.use(express.json());
  app.use("/products", productRouter);
  app.use("/client-adm", clientAdmRouter);
  app.use("/checkout", checkoutRouter);

  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: true
    })
    
    sequelize.addModels([ProductModel, ProductCatalogModel])
    migration = migrator(sequelize)
    await migration.up()
  })

  afterEach(async () => {
    if (!migration || !sequelize) {
      return 
    }
    migration = migrator(sequelize)
    await migration.down()
    await sequelize.close()
  })

  it("should create product", async () => {
        const response = await request(app)
        .post("/products")
        .send({
            id: "1",
            name: 'Eduardo',
            description: 'Teste',
            purchasePrice: 100,
            stock: 10
        });

        expect(response.status).toBe(200);
        expect(response.body.id).toBe("1");
        expect(response.body.name).toBe("Eduardo");
        expect(response.body.description).toBe("Teste");
        expect(response.body.purchasePrice).toBe(100);
        expect(response.body.stock).toBe(10);
  })
})