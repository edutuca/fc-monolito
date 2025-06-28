
import request from "supertest";
import { app, migration, sequelize, setupDbUmzug } from "../../@shared/config/express";

describe("E2E teste for invoice",() => {
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

    it("should not found a invoice",async ()=>{

        const response = await request(app)
        .get("/invoice/1");
        
        expect(response.status).toBe(204);
     
    });
});