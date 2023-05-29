import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../customer/sequelize/model/customer-model'
import { customerRoute } from './routes/customer-route'

export const app: Express = express()
app.use(express.json())
app.use("/customers", customerRoute)

export let sequelize: Sequelize

async function setUpDb() {
    sequelize = new Sequelize({
        dialect:'sqlite',
        storage: ':memory:',
        logging: false,
    })
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
}
setUpDb()