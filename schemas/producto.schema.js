const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(1).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const crearProductoSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const modificarProductoSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

const getProductoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  modificarProductoSchema,
  getProductoSchema,
  crearProductoSchema,
};
