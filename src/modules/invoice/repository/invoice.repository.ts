import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";


export default class InvoiceRepository implements InvoiceGateway {

    async save(invoice: Invoice): Promise<Invoice> {

      let invoiceRequest = {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
        items: [{}]
      };

      invoiceRequest.items = invoice.items.map(item=>{
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }
      });
      
      const invoiceCreated = await InvoiceModel.create(invoiceRequest, {include: InvoiceItemModel});

      let invoiceReturn = new Invoice({
        id: new Id(invoiceCreated.id),
        name: invoice.name,
        document: invoice.document,
        address: new Address(
          invoiceCreated.street,
          invoiceCreated.number,
          invoiceCreated.complement,
          invoiceCreated.city,
          invoiceCreated.state,
          invoiceCreated.zipCode            
        ),
        items: [],
        createdAt: invoice.createdAt,
        updatedAt: invoice.createdAt
      });

      invoiceCreated?.items?.forEach(item=>
        invoiceReturn.items.push(new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }))
      );

      return invoiceReturn;
    }

    async find(id: string): Promise<Invoice> {

          const invoice = await InvoiceModel.findOne({where: { id }, include: InvoiceItemModel })
      
          if (!invoice) {
            throw new Error("Invoice not found")
          }
          
          let invoiceReturn = new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(
              invoice.street,
              invoice.number,
              invoice.complement,
              invoice.city,
              invoice.state,
              invoice.zipCode            
            ),
            items: [],
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
          });

          invoice?.items?.forEach(item=>
            invoiceReturn.items.push(new InvoiceItems({
              id: new Id(item.id),
              name: item.name,
              price: item.price,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt
            }))
          );

          return invoiceReturn;
    }    
}