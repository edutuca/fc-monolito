import { DataTypes } from "sequelize";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {

  async add(entity: Client): Promise<void> {

    const input = {
      id: entity.id?.id,
      name: entity.name,
      email: entity.email,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zipCode,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt)
    };
    
    await ClientModel.create(input)
    
  }

  async find(id: string): Promise<Client> {

    const client = await ClientModel.findOne({raw: true, where: { id } })
    
    if (!client) {
      throw new Error("Client not found")
    }

    
    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.street,
        client.number,
        client.complement,
        client.city,
        client.state,
        client.zipcode,
      ),
      createdAt: client.createdAt,
      updatedAt: client.createdAt
    })
  }
}