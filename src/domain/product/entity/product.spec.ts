import NotificationError from "../../@shared/notification/notification-error";
import ProductA from "./product-a";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        const error = new NotificationError([
            {
                message: "Id is required",
                context: "product"
            }
        ])
        try {
            new ProductA("", "Product 1", 100)
        } catch (productError) {
            expect(productError).toEqual(error)
        }
    })

    it("should throw error when name is empty", () => {
        const error = new NotificationError([
            {
                message: "Name is required",
                context: "product"
            }
        ])
        try {
            new ProductA("123", "", 100)
        } catch (productError) {
            expect(productError).toEqual(error)
        }
    })

    it("should throw error when price is less than zero", () => {
        const error = new NotificationError([
            {
                message: "Price must be greater than zero",
                context: "product"
            }
        ])
        try {
            new ProductA("123", "Name", -1)
        } catch (productError) {
            expect(productError).toEqual(error)
        }
    })

    it("should change name", () => {
        const product = new ProductA("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new ProductA("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});