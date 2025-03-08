import Address from "../../@shared/domain/value-object/address"
import InvoiceItems from "../domain/invoice-items.entity";

export interface GenerateInvoiceFacadeInputDto {
   id: string;
   name: string;
   document: string;
   address: Address;
   items: InvoiceItems[];
}
  
export interface GenerateInvoiceFacadeOutputDto {
   id: string;
   name: string;
   document: string;
   address: Address;
   items: InvoiceItems[];
   total: number;
}

export interface FindInvoiceFacadeInputDTO {
    id: string;
}

export interface FindInvoiceFacadeOutputDTO {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    total: number;
    createdAt: Date;
}

export default interface InvoiceFacadeInterface {
  generate(input:GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
}
