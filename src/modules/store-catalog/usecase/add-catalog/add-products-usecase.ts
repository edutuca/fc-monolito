import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";

import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductIntoCatalogUseCase {
    private _productRepository: ProductGateway;
  
    constructor(_productRepository: ProductGateway) {
      this._productRepository = _productRepository;
    }
  
    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {

        let addProductInputDto:Product = new Product({
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            salesPrice: input.salesPrice
         } 
        );

        this._productRepository.add(addProductInputDto);

        return {
            id: addProductInputDto.id.id,
            name: addProductInputDto.name,
            description: addProductInputDto.description,
            salesPrice: addProductInputDto.salesPrice
          };
    }
}