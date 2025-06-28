
import { migration, sequelize, setupDbUmzug } from "../../../@shared/config/express";
import ProductRepository from "../../repository/product.repository";
import AddProductIntoCatalogUseCase from "./add-products-usecase";


describe("add product-catalog usecase unit test", () => {
  
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

  it("should add product-catalog", async () => {
    
    const productRepository = new ProductRepository();

    const product = {
        id: "1",
        name: "Product 1",
        description: "Description 1",
        salesPrice: 100,
    };

    const usecase = new AddProductIntoCatalogUseCase(productRepository);

    const result = await usecase.execute(product);
    
    expect(result.id).toBeDefined;
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Description 1");
    expect(result.salesPrice).toBe(100);
  });
});
