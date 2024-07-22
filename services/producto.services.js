const { faker, Faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.Productos = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 10; index++) {
      this.Productos.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.Productos.push(newProduct);
    return newProduct;
  }
  async find() {
    return this.Productos;
  }
  async findOne(id) {
    const product = this.Productos.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }
  async udpate(id, changes) {
    const index = this.Productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound();
    }

    const product = this.Productos[index];
    this.Productos[index] = {
      ...product,
      ...changes,
    };
    return this.Productos[index];
  }
  async delete(id) {
    const index = this.Productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound();
    }
    this.Productos.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
