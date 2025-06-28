import express, { Request, Response } from 'express';
import Address from '../../@shared/domain/value-object/address';
import ClientRepository from '../repository/client.repository';
import AddClientUseCase from '../usecase/add-client/add-client.usecase';
import FindClientUseCase from '../usecase/find-client/find-client.usecase';
export const clientAdmRouter = express.Router();



clientAdmRouter.post("/", async (req:Request, res:Response)=>{
    const useCase = new AddClientUseCase(new ClientRepository());

    try{
        
       const addClientInputDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(req.body.address._street, req.body.address._number, req.body.address._complement, req.body.address._city, req.body.address._state, req.body.address._zipCode)
        }
        
        const output = await useCase.execute(addClientInputDto);     
        
        res.send(output);

    } catch(error) {
        res.status(500).send(error);
    }
    
})

clientAdmRouter.get("/", async (req:Request, res:Response)=>{
    const useCase = new FindClientUseCase(new ClientRepository())

    try{
        const findClientUseCaseInputDto = {
            id: req.body.id
        }
        const output = await useCase.execute(findClientUseCaseInputDto);     

        res.send(output);

    } catch(error) {
        res.status(500).send(error);
    }
    
})