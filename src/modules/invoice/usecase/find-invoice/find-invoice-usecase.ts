import Address from "../../../@shared/domain/value-object/address";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase {

    private _invoiceRepository:InvoiceGateway; 

    constructor(invoiceRepository: InvoiceGateway) {
      this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    
     let invoice:Invoice = await this._invoiceRepository.find(input.id);

     return {
           id: invoice.id.id,
           name: invoice.name,
           document: invoice.document,
           address: new Address(invoice.address.street, invoice.address.number, invoice.address.complement, invoice.address.city, invoice.address.state, invoice.address.zipCode),
           items: invoice.items,
           total: invoice.total,
           createdAt: invoice.createdAt
     }   
  }
}