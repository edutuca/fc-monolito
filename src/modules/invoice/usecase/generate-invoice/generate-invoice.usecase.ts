import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {

    private _invoiceRepository:InvoiceGateway; 

    constructor(invoiceRepository: InvoiceGateway) {
      this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    
        const invoice = new Invoice(
          {
            id: new Id(input.id) || new Id(),
            name: input.name,
            document: input.document,
            address: input.address,
            items: input.items
          }
        )
       
        const persistInvoice = await this._invoiceRepository.save(invoice);  
        
        return {
           id: invoice.id.id,
           name: persistInvoice.name,
           document: persistInvoice.document,
           address: persistInvoice.address,
           items: persistInvoice.items,
           total: persistInvoice.total
      }   
  }
}