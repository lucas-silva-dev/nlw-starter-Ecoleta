const { Router } = require("express");

const database = require("./database/database");

const routes = Router();

routes.get("/", (req, res) => {
  return res.render("index.html");
});

routes.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

routes.post("/create-point", (req, res) => {
  const { name, image, address, address2, state, city, items } = req.body;

  const values = [image, name, address, address2, state, city, items];

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (
      ?,?,?,?,?,?,?
    );
  `;

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("cadastro falhou");
    }

    console.log("Cadastrado com sucesso");
    console.log(this);

    return res.render("create-point.html", { saved: true });
  }

  database.run(query, values, afterInsertData);
});

routes.get("/search", (req, res) => {
  const { state, city } = req.query;

  database.all(
    `SELECT * FROM places WHERE state = '${state}' AND city = '${city}'`,
    function (err, rows) {
      if (err) {
        return console.log(err);
      }

      const total = rows.length;

      return res.render("search-results.html", { places: rows, total });
    }
  );
});

module.exports = routes;
