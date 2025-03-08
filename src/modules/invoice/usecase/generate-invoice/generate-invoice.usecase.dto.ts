import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../domain/invoice-items.entity";

  
export interface GenerateInvoiceUseCaseInputDto {
   id: string;
   name: string;
   document: string;
   address: Address;
   items: InvoiceItems[];
}
  
export interface GenerateInvoiceUseCaseOutputDto {
   id: string;
   name: string;
   document: string;
   address: Address;
   items: InvoiceItems[];
   total: number;
}