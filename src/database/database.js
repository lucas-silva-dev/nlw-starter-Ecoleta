const { resolve } = require("path");
const { Database } = require("sqlite3").verbose();

const database = new Database(resolve(__dirname, "database.sqlite"));
module.exports = database;

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `);
});
