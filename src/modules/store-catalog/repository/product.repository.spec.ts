
import { migration, sequelize, setupDbUmzug } from "../../@shared/config/express";
import { ProductCatalogModel } from "./product-catalog.model";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {

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

  it("should find all products", async () => {
     await  ProductCatalogModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
      createdAt: new Date()
    });

    await ProductCatalogModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
      createdAt: new Date()
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toBe("1");
    expect(products[0].name).toBe("Product 1");
    expect(products[0].description).toBe("Description 1");
    expect(products[0].salesPrice).toBe(100);
    expect(products[1].id.id).toBe("2");
    expect(products[1].name).toBe("Product 2");
    expect(products[1].description).toBe("Description 2");
    expect(products[1].salesPrice).toBe(200);
  });

  it("should find a product", async () => {

    await ProductCatalogModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
      createdAt: new Date()
    });

    const productRepository = new ProductRepository();
    const product = await productRepository.find("1");

    expect(product.id.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.salesPrice).toBe(100);
  });
});
