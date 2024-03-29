import { InputOrderRepositoryDto, OutputOrderRepositoryDto } from "../../../../application/checkout/@repository/order-repository-dto";
import OrderRepositoryInterface from "../../../../application/checkout/@repository/order-repository-interface";
import OrderItemModel from "../model/order-item-model";
import OrderModel from "../model/order-model";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: InputOrderRepositoryDto): Promise<void> {
        await OrderModel.create(
          {
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total,
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
    async update(entity: InputOrderRepositoryDto): Promise<void> {
        const sequelize = OrderModel.sequelize
        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            })
            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }))
            await OrderItemModel.bulkCreate(items, { transaction: t })
            await OrderModel.update(
                { total: entity.total },
                { where: { id: entity.id }, transaction: t }
            )
        })
    }
    async find(id: string): Promise<OutputOrderRepositoryDto> {
        try {
            const orderModel = await OrderModel.findOne({
                where: { id },
                include: ["items"],
                rejectOnEmpty: true
            })
            const items = orderModel.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.product_id,
                quantity: item.quantity
            }))
            return {
                id: orderModel.id,
                customerId: orderModel.customer_id,
                total: orderModel.total,
                items: items
            }
        } catch (error) {
            throw new Error("Order not found");
        }
    }
    async findAll(): Promise<OutputOrderRepositoryDto[]> {
        try {
            const ordersModel = await OrderModel.findAll({
                include: [{ model: OrderItemModel }]
            })
            const orders = ordersModel.map((orderModel) => ({
                id: orderModel.id,
                customerId: orderModel.customer_id,
                total: orderModel.total,
                items: orderModel.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    productId: item.product_id,
                    quantity: item.quantity
                }))
            }))

            return orders
        } catch (error) {
            throw new Error("Something went wrong");
        }
    }
}