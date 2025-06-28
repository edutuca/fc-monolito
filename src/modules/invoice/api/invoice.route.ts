import express, { Request, Response } from 'express';
import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice-usecase';
import InvoiceRepository from '../repository/invoice.repository';

export const invoiceRouter = express.Router();


invoiceRouter.get("/:id", async (req:Request, res:Response)=>{
    const useCase = new FindInvoiceUseCase(new InvoiceRepository())

    try{
        const findInvoiceUseCaseInputDTO = {
            id: req.params.id
        }

        const output = await useCase.execute(findInvoiceUseCaseInputDTO);     

        res.send(output);

    } catch(error:unknown) {
        const knownError = error as Error;
        if(knownError.message == 'Invoice not found') res.status(204).send(error);
        else res.status(500).send(error);
    }
    
})