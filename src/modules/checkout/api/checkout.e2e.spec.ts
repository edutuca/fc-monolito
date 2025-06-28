
import request from "supertest";
import { app, migration, sequelize, setupDbUmzug } from "../../@shared/config/express";
import Address from "../../@shared/domain/value-object/address";

describe("E2E teste for checkout",() => {
    
    beforeEach(async()=>{
        await setupDbUmzug();
    })

    afterAll(async()=>{
       if (!migration || !sequelize) {
         return 
       }

       await migration.down()
       await sequelize.close()
    })

    
    it("should create a order",async ()=>{

        const responseProducts = await request(app)
        .post("/products")
        .send({
            id: "1",
            name: 'Eduardo',
            description: 'Teste',
            purchasePrice: 100,
            stock: 10
        });

        const responseClient = await request(app)
        .post("/client-adm")
        .send({
            id: '1',
            name: 'Eduardo de Oliveira Ootuca',
            email: 'edu@tdf.com.br',
            document: 'xxxx',
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888",
              ),
            createdAt: new Date(),
            updatedAt: new Date(),
            productId: '1',
            stock: 10
        });   
        
        const response = await request(app)
        .post("/checkout")
        .send({
            clientId:"1",
            productId: JSON.stringify([{productId:'1'}])
        });
        
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBeDefined;
        expect(response.body[0].products[0].productId).toBe("1");
  });

   
});