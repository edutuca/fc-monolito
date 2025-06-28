import { Sequelize } from "sequelize-typescript"
import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"
import Client from "../domain/client.entity"
import OrderModel from "./checkout.model"

import CheckoutRepository from "./checkout.repository"
import Order from "../domain/order.entity"
import Product from "../domain/product.entity"
import { ClientModel } from "../../client-adm/repository/client.model"
import { migration, sequelize, setupDbUmzug } from "../../@shared/config/express"


describe("Checkout Repository test", () => {

    beforeEach(async () => {
       await setupDbUmzug();
    });
  
    afterEach(async () => {
       if (!migration || !sequelize) {
         return 
       }

       await migration.down()
       await sequelize.close()
    });

  it("should add a checkout", async () => {

     const order = new Order({
          id: new Id("1"),
          client: new Client({
                id: new Id("1"),
                name: "Lucian",
                email: "lucian@teste.com",
                address: new Address(
                  "Rua 123",
                  "99",
                  "Casa Verde",
                  "Criciúma",
                  "SC",
                  "88888-888"
                )
             }         
          ),
          products: [
            new Product({
                  id: new Id('21'),
                  name: 'Prod1',
                  description: 'XXXXX',
                  salesPrice: 89
            }),
            new Product({
                id: new Id('25'),
                name: 'Prod2',
                description: 'XXXXX',
                salesPrice: 265
            })
          ],
          status:'pending'
     })
     
       
    const repository = new CheckoutRepository()
    await repository.addOrder(order);

    const result = await OrderModel.findOne({raw:true, where: { id: "1" } })
    expect(result.id).toBeDefined;
    expect(result.idClient).toBe("1");
    expect(result.idProduct).toBe("21");

  })


})

