const express = require("express");
const cors = require("cors");
const app = express();
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./db.sqlite",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;

//route

app.get("/api/users", async (req, res) => {
  knex("users")
    .select("username", "password")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/users/:username", async (req, res) => {
  let username = req.params.username;

  knex("users")
    .select("username", "password")
    .where({
      username: username,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// app.get("/api/users?username=:username", async (req, res) => {
//   let username = req.params.username;
//   knex("users")
//     .where("username", username)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

app.delete("/api/users/:id", (req, res) => {
  let id = req.params.id;
  knex("users")
    .where("id", id)
    .del()
    .then((result) => {
      res.json({ status: 200 });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/users", (req, res) => {
  knex("users")
    .insert({ username: req.body.username, password: req.body.password })
    .then((result) => {
      res.json({ success: true, message: 200 });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/users", (req, res) => {
  knex("users")
    .insert({ username: req.body.username, password: req.body.password })
    .then((result) => {
      res.json({ success: true, message: 200 });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/notes", (req, res) => {
  knex("notes")
    .select("*")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//listener
app.listen(PORT, () => {
  console.log("terhubung ke server");
});
