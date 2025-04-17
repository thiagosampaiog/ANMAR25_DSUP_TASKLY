import express from "express";
import taskRoutes from "./routes/task.routes";
import noteRoutes from "./routes/note.routes";
import { errorHandler } from "./middlewares/errorHandler";

const port = 3000;

const app = express();

app.use(express.json());

app.use(taskRoutes);
app.use(noteRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
