//* CONFIGURACION BASICA npm init -y
//* EditorConfig for VS Code
//*  npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier pritter
//* INSTALAR EL SERVER npm i express
//* Generar nombres npm i @faker-js/faker
//* manipular erroes npm i @hapi/boom
//* Validacions de datos npm i joi
/*//! Middleware MAS USADOS
A continuación te compartiré una lista de los middlewares más populares en Express.

CORS
Middleware para habilitar CORS (Cross-origin resource sharing) en nuestras rutas o aplicación. http://expressjs.com/en/resources/middleware/cors.html

Morgan
Un logger de solicitudes HTTP para Node.js. http://expressjs.com/en/resources/middleware/morgan.html

Helmet
Helmet nos ayuda a proteger nuestras aplicaciones Express configurando varios encabezados HTTP. ¡No es a prueba de balas de plata, pero puede ayudar! https://github.com/helmetjs/helmet

Express Debug
Nos permite hacer debugging de nuestras aplicaciones en Express mediante el uso de un toolbar en la pagina cuando las estamos desarrollando. https://github.com/devoidfury/express-debug

Express Slash
Este middleware nos permite evitar preocuparnos por escribir las rutas con o sin slash al final de ellas. https://github.com/ericf/express-slash

Passport
Passport es un middleware que nos permite establecer diferentes estrategias de autenticación a nuestras aplicaciones. https://github.com/jaredhanson/passport

Puedes encontrar más middlewares populares en el siguiente enlace: http://expressjs.com/en/resources/middleware.html
*/

const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  catchError,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;
//*DIRECTORIO PUBLICOS
app.use(express.static('public'));

//* RECUPERAR BODY
app.use(express.json());

//* CORS

//!RESTRIGIR ACCESO
const whiteList = ['', ''];
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('no Permitido'));
    }
  },
};
//app.use(cors(options));
app.use(cors());

//*MANEJAR LAS RUTAS DEL API
routerApi(app);

//* MIDDLEWARES
app.use(catchError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Puerto.: ${port}`);
});
