import Notification from './notification'

describe('Unit tests for notifications', () => {
    test('should create errors', () => {
        const notification = new Notification()
        const error = {
          message: "error message",
          context: "customer"
        }
        notification.addError(error)
        const error2 = {
          message: "error message2",
          context: "customer"
        }
        notification.addError(error2)
        expect(notification.messages("customer")).toBe(
          "customer: error message,customer: error message2,"
        )
        const error3 = {
          message: "error message3",
          context: "order"
        }
        notification.addError(error3)
        expect(notification.messages("customer")).toBe(
          "customer: error message,customer: error message2,"
        )
        expect(notification.messages("order")).toBe(
          "order: error message3,"
        )
        expect(notification.messages()).toBe(
          "customer: error message,customer: error message2,order: error message3,"
        )
    })
    test('should check if notification has at least one error', () => {
      const notification = new Notification()
      const error = {
        message: "error message",
        context: "customer"
      }
      notification.addError(error)
      expect(notification.hasErrors()).toBe(true)
    })
    test('should get all errors props', () => {
      const notification = new Notification()
      const error = {
        message: "error message",
        context: "customer"
      }
      const error2 = {
        message: "error message2",
        context: "customer"
      }
      notification.addError(error)
      notification.addError(error2)

      expect(notification.getErrors()).toEqual([error, error2])
    })
})