import CustomerRepositoryInterface from "../../../../application/customer/repository/customer-repository-interface";
import { InputCustomerRepositoryDto, OutputCustomerRepositoryDto } from "../../../../application/customer/repository/customer-repository-dto";
import CustomerModel from "../model/customer-model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: InputCustomerRepositoryDto): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.active,
      rewardPoints: entity.rewardPoints,
    })
  }

  async update(entity: InputCustomerRepositoryDto): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.active,
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    )
  }

  async find(id: string): Promise<OutputCustomerRepositoryDto> {
    try {
      const customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      })

      return {
        id: customerModel.id,
        name: customerModel.name,
        address: {
          street: customerModel.street,
          number: customerModel.number,
          zip: customerModel.zipcode,
          city: customerModel.city,
        },
        active: customerModel.active,
        rewardPoints: customerModel.rewardPoints
      }
    } catch (error) {
      throw new Error("Customer not found");
    }
  }

  async findAll(): Promise<OutputCustomerRepositoryDto[]> {
    const customerModels = await CustomerModel.findAll()
    return customerModels
      .map(
        (customerModel) => ({
          id: customerModel.id,
          name: customerModel.name,
          address: {
            street: customerModel.street,
            number: customerModel.number,
            zip: customerModel.zipcode,
            city: customerModel.city,
          },
          active: customerModel.active,
          rewardPoints: customerModel.rewardPoints
        })
      )
  }
}