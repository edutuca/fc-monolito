
import request from "supertest";
import { app, migration, sequelize, setupDbUmzug } from "../../@shared/config/express";
import Address from "../../@shared/domain/value-object/address";

describe("E2E teste for client",() => {
    beforeEach(async()=>{
        await setupDbUmzug();
    })

    afterEach(async () => {
       if (!migration || !sequelize) {
         return 
       }

       await migration.down()
       await sequelize.close()
    });

    it("should create a client-adm",async ()=>{
        const response = await request(app)
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
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe('1');
        expect(response.body.name).toBe('Eduardo de Oliveira Ootuca');
        expect(response.body.document).toBe('xxxx');
        expect(response.body.address._street).toBe('Rua 123');
        expect(response.body.address._number).toBe('99');
        expect(response.body.address._complement).toBe('Casa Verde');
        expect(response.body.address._city).toBe('Criciúma');
        expect(response.body.address._state).toBe('SC');
        expect(response.body.address._zipCode).toBe('88888-888');
    });

    it("should find a client-adm",async ()=>{

        // CADASTRA CLIENTE
        const responseAddClient = await request(app)
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
        .get("/client-adm")
        .send({
            id: responseAddClient.body.id
        });
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe('1');
        expect(response.body.name).toBe('Eduardo de Oliveira Ootuca');
        expect(response.body.document).toBe('xxxx');
        expect(response.body.address._street).toBe('Rua 123');
        expect(response.body.address._number).toBe('99');
        expect(response.body.address._complement).toBe('Casa Verde');
        expect(response.body.address._city).toBe('Criciúma');
        expect(response.body.address._state).toBe('SC');
        expect(response.body.address._zipCode).toBe('88888-888');
    });
});