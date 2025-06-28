import { migration, sequelize, setupDbUmzug } from "../../@shared/config/express"
import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "../domain/invoice-items.entity"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory"
import { InvoiceItemModel } from "../repository/invoice-item.model"
import { InvoiceModel } from "../repository/invoice.model"
import InvoiceRepository from "../repository/invoice.repository"


describe("Invoice Facade test", () => {

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

  it("should generate a invoice", async () => {

    const repository = new InvoiceRepository()
    const facade = InvoiceFacadeFactory.create();

    const input = {
      id: '5',
      name: 'Eduardo',
      document: '123',
      address: new Address('Rua Palam', '1', ' ', 'São Paulo', 'SP', '05898-000'),
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
    };

    await facade.generate(input);

    const invoice:InvoiceModel = await InvoiceModel.findOne({ where: { id: "5" }, include: InvoiceItemModel })

    //expect(input?.id).toEqual(invoice?.id)
    //expect(input.name).toEqual(invoice.name)
    //expect(input.address.street).toEqual(invoice.street)
    //expect(input.address.number).toEqual(invoice.number)
    //expect(input.address.complement).toEqual(invoice.complement)
    //expect(input.address.city).toEqual(invoice.city)
    //expect(input.address.state).toEqual(invoice.state)
    //expect(input.address.zipCode).toEqual(invoice.zipCode)
    //expect(input.items != null).toBeTruthy()
    //expect(input.items.length).toBeGreaterThan(1)  
  })

  it("should find a invoice", async () => {

    const facade = InvoiceFacadeFactory.create()

    const input = {
        id: '9',
        name: 'Eduardo',
        document: '123',
        address: new Address('Rua Palam', '1', ' ', 'São Paulo', 'SP', '05898-000'),
        items: [ 
          new InvoiceItems({
              id: new Id("1"),
              name: 'Item1',
              price: 50,
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
      };

    await facade.generate(input)

    const invoice = await facade.find({ id: "9" })

    //expect(invoice.id).toEqual(input.id)
    //expect(input.name).toEqual(invoice.name)
    //expect(input.document).toEqual(invoice.document)
    //expect(invoice.total).toEqual(70)
    //expect(input.address).toEqual(invoice.address)
    //expect(input.items != null).toBeTruthy()
    //expect(input.items.length).toBeGreaterThan(1)   
  })
})