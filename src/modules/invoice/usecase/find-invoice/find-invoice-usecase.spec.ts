import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity"
import FindInvoiceUseCase from "./find-invoice-usecase";

const invoice = new Invoice({
        id: new Id('5'),
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
})

const MockRepository = () => {

  return {
    save: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe("Find Invoice use case unit test", () => {

  it("should find a client", async () => {

    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const input = {
      id: "5"
    }

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual(input.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.total).toEqual(30)
    expect(result.address).toEqual(invoice.address)
    expect(result.createdAt).toEqual(invoice.createdAt)
    expect(result.items != null).toBeTruthy()
    expect(result.items.length).toBeGreaterThan(1)    
  })
})