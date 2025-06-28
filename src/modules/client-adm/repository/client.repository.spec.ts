import { Sequelize } from "sequelize-typescript"
import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"
import Client from "../domain/client.entity"
import { ClientModel } from "./client.model"
import ClientRepository from "./client.repository"

describe("Client Repository test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: false },
      define: {
        timestamps: false,
      },
    })

    sequelize.addModels([ClientModel])


    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a client", async () => {

    
    const client = new Client({
      id: new Id("1"),
      name: "Lucian",
      email: "lucian@teste.com",
      document: "1234-5678",
      address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888"
      )
    })

    const repository = new ClientRepository()
    await repository.add(client)

    const clientDb = await ClientModel.findOne({raw:true, where: { id: "1" } })

    expect(clientDb).toBeDefined()
    expect(clientDb.id).toEqual(client.id.id)
    expect(clientDb.name).toEqual(client.name)
    expect(clientDb.email).toEqual(client.email)
    expect(clientDb.document).toEqual(client.document)
    expect(clientDb.street).toEqual(client.address.street)
    expect(clientDb.number).toEqual(client.address.number)
    expect(clientDb.complement).toEqual(client.address.complement)
    expect(clientDb.city).toEqual(client.address.city)
    expect(clientDb.state).toEqual(client.address.state)
    expect(clientDb.zipcode).toEqual(client.address.zipCode)

  })

  it("should find a client", async () => {
    
    const client =  await ClientModel.create({
      id: '1',
      name: 'Lucian',
      email: 'lucian@123.com',
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipcode: "88888-888",      
      createdAt: new Date(),
      updatedAt: new Date()
    },{ raw: true});

    console.log("CLIENT: " + client.getDataValue('id'));
    const repository = new ClientRepository()
    const result = await repository.find(client.getDataValue('id'))

    console.log("CLIENT RESULT: " + new Date(client.getDataValue('createdAt')));
    expect(result.id.id).toEqual(client.getDataValue('id'))
    expect(result.name).toEqual(client.getDataValue('name'))
    expect(result.email).toEqual(client.getDataValue('email'))
    expect(result.address.street).toEqual(client.getDataValue('street'))
    expect(result.address.number).toEqual(client.getDataValue('number'))
    expect(result.address.complement).toEqual(client.getDataValue('complement'))
    expect(result.address.city).toEqual(client.getDataValue('city'))
    expect(result.address.state).toEqual(client.getDataValue('state'))
    expect(result.address.zipCode).toEqual(client.getDataValue('zipcode'))
    expect(convertDate(result.createdAt)).toStrictEqual(convertDate(client.getDataValue('createdAt')))
    expect(convertDate(result.updatedAt)).toStrictEqual(convertDate(client.getDataValue('updatedAt')))
  })

  function convertDate(date:any):Date  {
    return new Date(date);
  }
})

