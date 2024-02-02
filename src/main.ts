import cors from "cors";
import app from "./app";

app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(
  PORT, () => {
    console.log(`web server running at ${PORT}`);
  });