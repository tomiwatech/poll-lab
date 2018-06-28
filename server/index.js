import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swagger from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import apiVersion1 from './versioning/v1';
import apiVersion2 from './versioning/v2';

const PORT = process.env.PORT || 4422;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Remember to set this in your enviroment variables later
// app.set('superSecret', 'helloword');
// api versioning;
app.use('/api/v1', apiVersion1);
app.use('/api/v2', apiVersion2);
app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.get('/', (req, res) => res.send({ ok: true, message: 'Welcome to Poll Application Backend', baseurl: '/api/{version}' }).status(200));
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(`The Dev server is running on port ${PORT}`);
  } else {
    console.log(`The Production server is now running at ${PORT}`);
  }
});

export default app;
