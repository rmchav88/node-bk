const { Router } = require('express');
const router = Router();

const {
  loadProductos,
  crearProductos,
  modificarProductos,
  eliminarProductos,
  obtenerProductosById,
} = require('../controllers/productos.controller');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getProductoSchema,
  crearProductoSchema,
  modificarProductoSchema,
} = require('../schemas/producto.schema');

router.get('/', loadProductos);
router.get(
  '/:id',
  validatorHandler(getProductoSchema, 'params'),
  obtenerProductosById,
);
router.post('/', validatorHandler(crearProductoSchema, 'body'), crearProductos);
router.patch(
  '/:id',
  validatorHandler(crearProductoSchema, 'params'),
  validatorHandler(crearProductoSchema, 'body'),
  modificarProductos,
);
router.delete(
  '/:id',
  validatorHandler(crearProductoSchema, 'params'),
  eliminarProductos,
);

module.exports = router;
