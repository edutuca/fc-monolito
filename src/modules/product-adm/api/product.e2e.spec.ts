
import request from "supertest";
import { app, migration, sequelize, setupDbUmzug } from "../../@shared/config/express";


describe("E2E teste for product",() => {
    
    jest.setTimeout(9999999)

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

    
    it("should create a product",async ()=>{

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
    });

    it("should find a product",async ()=>{

        const response1 = await request(app)
        .post("/products")
        .send({
            id: "2",
            name: 'Eduardo',
            description: 'Teste',
            purchasePrice: 100,
            stock: 10
        });
         
        const response2 = await request(app)
        .get("/products")
        .send({
            productId: response1.body.id
        });
        
        expect(response2.status).toBe(200);
        expect(response2.body.productId).toBe("2");
        expect(response2.body.stock).toBe(10);
        expect(response2.body.name).toBe('Eduardo');
        expect(response2.body.description).toBe('Teste');
        expect(response2.body.purchasePrice).toBe(100);
    });
});