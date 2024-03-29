import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../product/sequelize/model/product-model"
import CustomerModel from "../../../customer/sequelize/model/customer-model"
import OrderItemModel from "../model/order-item-model"
import OrderModel from "../model/order-model"
import CustomerRepository from "../../../customer/sequelize/repository/customer-repository"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/value-object/address"
import ProductRepository from "../../../product/sequelize/repository/product-repository"
import ProductA from "../../../../domain/product/entity/product-a"
import OrderItem from "../../../../domain/checkout/entity/order_item"
import Order from "../../../../domain/checkout/entity/order"
import OrderRepository from "./order-repository"
import CustomerFactory from '../../../../domain/customer/factory/customer-factory'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address)
    await customerRepository.create(customer.toJSON())

    const productRepository = new ProductRepository()
    const product = new ProductA("123", "Product 1", 10)
    await productRepository.create(product.toJSON())

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order("123", "123", [ordemItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order.toJSON())

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
      rejectOnEmpty: true
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    })
  })
  test('should update a order', async () => {
      const customerRepository = new CustomerRepository()
      const customer = new Customer("123", "Customer 1")
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
      customer.changeAddress(address)
      await customerRepository.create(customer.toJSON())

      const productRepository = new ProductRepository()
      const product = new ProductA("123", "Product 1", 10)
      await productRepository.create(product.toJSON())
      const product2 = new ProductA("456", "Product 2", 20)
      await productRepository.create(product2.toJSON())
      const product3 = new ProductA("789", "Product 3", 30)
      await productRepository.create(product3.toJSON())

      const orderItem = new OrderItem(
          "1",
          product.name,
          product.price,
          product.id,
          2
      )
      const order = new Order("123", "123", [orderItem])
      const orderRepository = new OrderRepository()
      await orderRepository.create(order.toJSON())

      const orderItem2 = new OrderItem(
          "2",
          product2.name,
          product2.price,
          product2.id,
          2
      )
      const orderItem3 = new OrderItem(
          "3",
          product3.name,
          product3.price,
          product3.id,
          2
      )

      order.updateItems(orderItem2, orderItem3)

      await orderRepository.update(order.toJSON())

      const orderModel2 = await OrderModel.findOne({
          where: { id: order.id },
          include: ["items"],
          rejectOnEmpty: true
      })

      expect(orderModel2.toJSON()).toStrictEqual({
          id: "123",
          customer_id: "123",
          total: order.total(),
          items: [
              {
                  id: orderItem.id,
                  name: orderItem.name,
                  price: orderItem.price,
                  quantity: orderItem.quantity,
                  order_id: "123",
                  product_id: "123"
              },
              {
                  id: orderItem2.id,
                  name: orderItem2.name,
                  price: orderItem2.price,
                  quantity: orderItem2.quantity,
                  order_id: "123",
                  product_id: "456"
              },
              {
                  id: orderItem3.id,
                  name: orderItem3.name,
                  price: orderItem3.price,
                  quantity: orderItem3.quantity,
                  order_id: "123",
                  product_id: "789"
              },
          ]
      })
  })
  test("should find an order by Id", async () => {
      const customerRepository = new CustomerRepository()
      const customer = new Customer("123", "Customer 1")
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
      customer.changeAddress(address)
      await customerRepository.create(customer.toJSON())

      const productRepository = new ProductRepository()
      const product = new ProductA("123", "Product 1", 10)
      await productRepository.create(product.toJSON())

      const orderItem = new OrderItem(
          "1",
          product.name,
          product.price,
          product.id,
          2
      )
      const order = new Order("123", "123", [orderItem])
      const orderRepository = new OrderRepository()
      await orderRepository.create(order.toJSON())

      const orderModel = await orderRepository.find("123")
      expect(orderModel).toStrictEqual({
        id: order.id,
        customerId: order.customerId,
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            productId: orderItem.productId,
          }
        ]
      })
  })
  test("should throw error if not find an order", async () => {
      const orderRepository = new OrderRepository()
      expect(async () => await orderRepository.find("456")).rejects.toThrow(new Error('Order not found'))
  })
  test("should find all orders", async () => {
      const customerRepository = new CustomerRepository()
      const customer = new Customer("123", "Customer 1")
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
      customer.changeAddress(address)
      await customerRepository.create(customer.toJSON())

      const productRepository = new ProductRepository()
      const product = new ProductA("123", "Product 1", 10)
      const product2 = new ProductA("456", "Product 2", 20)
      const product3 = new ProductA("789", "Product 3", 30)

      await productRepository.create(product.toJSON())
      await productRepository.create(product2.toJSON())
      await productRepository.create(product3.toJSON())

      const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
      const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 2)
      const orderItem3 = new OrderItem("3", product3.name, product3.price, product3.id, 2)

      const order = new Order('123', '123', [orderItem, orderItem2, orderItem3])

      const orderRepository = new OrderRepository()

      await orderRepository.create(order.toJSON())

      const orders = await orderRepository.findAll()
      expect(orders).toStrictEqual([{
        id: order.id,
        customerId: order.customerId,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
        }))
      }])
  })
  test("should return empty if there no is orders", async () => {
      const orderRepository = new OrderRepository()
      const orders = await orderRepository.findAll()
      expect(orders).toStrictEqual([])
  })
})