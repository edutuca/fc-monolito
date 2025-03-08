import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../domain/invoice-items.entity";

export interface FindInvoiceUseCaseInputDTO {
    id: string;
}

export interface FindInvoiceUseCaseOutputDTO {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    total: number;
    createdAt: Date;
}