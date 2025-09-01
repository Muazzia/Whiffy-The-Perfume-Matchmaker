import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/asyncHandler";

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

app.use(errorHandler);

export default app;
