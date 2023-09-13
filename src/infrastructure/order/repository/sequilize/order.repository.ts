import Order from '../../../../domain/checkout/entity/order';
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from './order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order):Promise<void>{
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        items: entity.items.map((item) =>({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
        total: entity.total()
    },
    {
      where: {
        id: entity.id,
      },
      include: [ "items"],                    
    });    
  }

  async find(id: string): Promise<Order>{
    const orderm = await OrderModel.findOne({where:{ id}, include:[
      {
        model:OrderItemModel
      }
    ]});
    return new Order(
      orderm.id,
      orderm.customer_id,
      orderm.items.map((item)=>new OrderItem(item.id, item.name, item.price,item.product_id, item.quantity))
    );
  }

  async findAll(): Promise<Order[]>{
    const orders = await OrderModel.findAll({include:[
      {
        model:OrderItemModel
      }
    ]});
    return orders.map((ordem) => new Order(ordem.id, ordem.customer_id, ordem.items.map((item) => 
      new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    )));
  }
}
