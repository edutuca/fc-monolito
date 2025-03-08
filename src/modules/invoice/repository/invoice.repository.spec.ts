import { Sequelize } from "sequelize-typescript"
import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "../domain/invoice-items.entity"
import Invoice from "../domain/invoice.entity"
import { InvoiceModel } from "./invoice.model"
import InvoiceRepository from "./invoice.repository"
import { InvoiceItemModel } from "./invoice-item.model"

describe("Invoice Repository test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a invoice", async () => {

    const invoice = new Invoice({
        id: new Id('1'),
        name: 'EduardoGenerate',
        document: '123',
        address: new Address('Rua Palam', '1', ' ', 'São Paulo', 'SP', '05898-000'),
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [ 
            new InvoiceItems({
                id: new Id("1"),
                name: 'Item1',
                price: 10,
                createdAt: null,
                updatedAt: null
            }),
            new InvoiceItems({
              id: new Id("2"),
              name: 'Item2',
              price: 20,
              createdAt: null,
              updatedAt: null
          })
          ]
    });

    const repository = new InvoiceRepository();
    await repository.save(invoice);

    const result:InvoiceModel = await InvoiceModel.findByPk("1", { include: InvoiceItemModel });

    expect(result.id).toEqual(invoice.id.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.street).toEqual(invoice.address.street)
    expect(result.number).toEqual(invoice.address.number)
    expect(result.complement).toEqual(invoice.address.complement)
    expect(result.city).toEqual(invoice.address.city)
    expect(result.state).toEqual(invoice.address.state)
    expect(result.zipCode).toEqual(invoice.address.zipCode)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
    expect(result.items != null).toBeTruthy()
    expect(result.items.length).toBeGreaterThan(1)
  })

  it("should find a invoice", async () => {
    const invoice = await InvoiceModel.create({
        id: '3',
        name: 'EduardoFind',
        document: '123',
        street: 'Rua Palam',
        number: '1',
        complement: ' ',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '05898-000',
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [ 
            {
              id: "1",
              name: 'Item1',
              price: 10,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: "2",
              name: 'Item2',
              price: 20,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ]
    }, {include: InvoiceItemModel});

    const repository = new InvoiceRepository();
    const result:Invoice = await repository.find("3");

    expect(result.id.id).toEqual(invoice.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.zipCode).toEqual(invoice.zipCode)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
    expect(result.items != null).toBeTruthy()
    expect(result.items.length).toBeGreaterThan(1)
  })
})