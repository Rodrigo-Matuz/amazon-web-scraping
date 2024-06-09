import express from "express";
import path from "path";
import scrapeRouter from "./routes/api/scrape.js";

const PORT = 9090;
const app = express();

app.use(express.json());
app.use("/api/scrape", scrapeRouter);
app.use(express.static("public"));

/* Route handler for the root path. Serves the index.html file. */
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}/`));
