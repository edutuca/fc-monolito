import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductCatalogModel } from "./product-catalog.model";



export default class ProductRepository implements ProductGateway {

  async add(product:Product): Promise<void>  {
      await ProductCatalogModel.create({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
        createdAt: product.createdAt
      });
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductCatalogModel.findAll({raw:true});

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice
        })
    );
  }
  async find(id: string): Promise<Product> {
    const product = await ProductCatalogModel.findOne({raw:true,
      where: {
        id: id
      },
    });

    let productReturn = new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });

    return productReturn;
  }
}
