const { response } = require('express');
const ProductService = require('../services/producto.services');

const serrices = new ProductService();

const loadProductos = async (req, res = response) => {
  const productos = await serrices.find();
  res.json({
    ok: true,
    productos,
  });
};
const obtenerProductosById = async (req, res = response, next) => {
  const {
    body,
    params: { id },
  } = req;

  if (id === '999') {
    return res.status(404).json({
      ok: false,
    });
  }

  try {
    const product = await serrices.findOne(id);

    res.status(200).json({
      ok: true,
      id,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const crearProductos = async (req, res = response) => {
  const body = req.body;
  const newProduct = await serrices.create(body);

  res.status(201).json({
    ok: true,
    newProduct,
  });
};
const modificarProductos = async (req, res = response, next) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    const product = await serrices.udpate(id, body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
const eliminarProductos = async (req, res = response) => {
  const {
    body,
    params: { id },
  } = req;

  const product = await serrices.delete(id);
  res.json(product);
};

module.exports = {
  loadProductos,
  obtenerProductosById,
  crearProductos,
  modificarProductos,
  eliminarProductos,
};
