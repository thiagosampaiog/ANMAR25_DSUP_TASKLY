import express from "express";
import taskRoutes from "./routes/task.routes";
import noteRoutes from "./routes/note.routes"

const port = 3000;

const app = express();

app.use(express.json());

app.use(taskRoutes);
app.use(noteRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
