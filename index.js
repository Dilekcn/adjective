const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const pool = require("./db");

app.use(cors());
app.use(express.json());

//Routes
//Create adjective
app.post("/adj", async (req, res) => {
  try {
    const { adj } = req.body;
    const newAdj = await pool.query(
      "INSERT INTO adjective (adj) VALUES($1) RETURNING *",
      [adj]
    );
    res.json(newAdj.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/adj", async (req, res) => {
  try {
    const allAdj = await pool.query(
      "SELECT *FROM adjective ORDER BY RANDOM() LIMIT 1"
    );

    res.json(allAdj.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
