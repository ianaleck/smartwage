import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
const PORT: number = (process.env.PORT || 5000) as number;
const app: express.Application = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/", routes);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  process.env.DEV &&
    console.log(`Server started on port http://localhost:${PORT}`);
  //connect to database
  connectDB();
});
