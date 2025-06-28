import express, { Request, Response } from 'express';
import ClientAdmFacadeFactory from '../../client-adm/factory/client-adm.facade.factory';
import ProductAdmFacadeFactory from '../../product-adm/factory/facade.factory';
import StoreCatalogFacadeFactory from '../../store-catalog/factory/facade.factory';
import CheckoutRepository from '../repository/checkout.repository';
import PlaceOrderUseCase from '../usecase/place-order/place-order.usecase';
export const checkoutRouter = express.Router();



checkoutRouter.post("/", async (req:Request, res:Response)=>{
    const useCase = new PlaceOrderUseCase(ClientAdmFacadeFactory.create(), ProductAdmFacadeFactory.create(), StoreCatalogFacadeFactory.create(), new CheckoutRepository()) ;

    try{                

        const placeOrderInputDto = {
            clientId: req.body.clientId,
            products: JSON.parse(req.body.productId)
        }

        const output = await useCase.execute(placeOrderInputDto);     
        
        res.send(output);

    } catch(error) {
        res.status(500).send(error);
    }
    
})
