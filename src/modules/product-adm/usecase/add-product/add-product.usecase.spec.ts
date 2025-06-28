
import { migration, sequelize, setupDbUmzug } from "../../../@shared/config/express";
import ProductRepository from "../../repository/product.repository";
import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Product usecase unit test", () => {
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
 
  it("should add a product", async () => {
    
    const productRepository = new ProductRepository();

    const usecase = new AddProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10
    };

    const result = await usecase.execute(input);
    
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});
