import cors from "cors";
import app from "./app";

app.use(cors());

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.js';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(
  PORT, () => {
    console.log(`web server running at ${PORT}`);
  });