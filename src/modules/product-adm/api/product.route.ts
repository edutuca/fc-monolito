import express, { Request, Response } from 'express';
import ProductRepository from '../repository/product.repository';
import AddProductUseCase from '../usecase/add-product/add-product.usecase';
import CheckStockUseCase from '../usecase/check-stock/check-stock.usecase';
export const productRouter = express.Router();



productRouter.post("/", async (req:Request, res:Response)=>{
    const useCase = new AddProductUseCase(new ProductRepository())

    try{
        const addProductInputDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        }

        const output = await useCase.execute(addProductInputDto);        
        res.send(output);

    } catch(error) {
        res.status(500).send(error);
    }
    
})

productRouter.get("/", async (req:Request, res:Response)=>{
    const useCase = new CheckStockUseCase(new ProductRepository())

    try{
        const checkStockInputDto = {
            productId: req.body.productId
        }

        const output = await useCase.execute(checkStockInputDto);        
        res.send(output);

    } catch(error) {
        res.status(500).send(error);
    }
    
})