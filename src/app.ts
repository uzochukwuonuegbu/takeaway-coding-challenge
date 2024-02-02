import cors from "cors";
import express from "express";
import { errorHandler } from "./controllers/errorHandler/httpError";
import router from "./routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

export default app;