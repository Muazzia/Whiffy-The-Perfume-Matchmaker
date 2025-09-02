import app from "./app";
import { config } from "./config";
import connectDB from "./db/connection";

app.listen(config.port, () => {
  connectDB();
  console.log(`✅ Server is running on http://localhost:${config.port}`);
});
