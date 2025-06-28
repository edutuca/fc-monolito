import { migration, sequelize, setupDbUmzug } from "../../@shared/config/express";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {
  
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

  it("should create a product", async () => {

    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10
    };

    await productFacade.addProduct(input);
    const product = await productFacade.checkStock({productId:"1"});
    
    expect(product).toBeDefined();
    expect(product.productId).toEqual("1");
    expect(product.stock).toBe(input.stock);
  });

  it("should check product stock", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "2",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    };
    await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: "2" });

    expect(result.productId).toEqual("2");
    expect(result.stock).toBe(input.stock);
  });
});
