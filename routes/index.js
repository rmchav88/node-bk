const express = require('express');
const router = express.Router();

const productosRouter = require('./productos.router');
// const categoriasRouter = require('./categorias.router');
// const usuariosRouter = require('./usuarios.router');
//*agregar rutas
const routerApi = (app) => {
  app.use('/api/v1', router);
  router.use('/productos', productosRouter);
  // router.use('/api/categorias', categoriasRouter);
  // router.use('/api/usuarios', usuariosRouter);
};

module.exports = routerApi;
