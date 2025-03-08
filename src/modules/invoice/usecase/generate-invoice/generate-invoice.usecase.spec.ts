import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "../../domain/invoice-items.entity"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const input = {
  id: '1',
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

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(input)),
    find: jest.fn()
  }
}

describe("Generate Invoice use case unit test", () => {

  it("should generate a invoice", async () => {

    const repository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(repository)       
    const result =  await usecase.execute(input);
    
    expect(repository.save).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.address).toEqual(input.address)
    expect(result.items).toEqual(input.items)
  })
})