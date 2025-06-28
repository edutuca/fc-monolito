import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./checkout.model";


export default class CheckoutRepository implements CheckoutGateway {

    async addOrder(order: Order): Promise<void> {      
        await OrderModel.create({
           id: order.id.id,
           idClient: order.client.id.id,
           idProduct: order.products[0].id.id,
           status: order.status
        });          
    }

    async findOrder(id: string): Promise<Order | null> {
        const order = await OrderModel.findOne({
            where: { id },
        });

 
        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }

        return new Order({
            id: new Id(order.id),
            client: new Client({
              id: new Id(order.idClient),
              name: null,
              email: null,
              address: null
            }),
            products: [new Product(
            {
              id: new Id(order.idProduct),
              name: null,
              description: null,
              salesPrice: null
            }
            )]
        });
    }
}