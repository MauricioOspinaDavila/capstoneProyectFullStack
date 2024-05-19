import fs from "fs";
import csv from "csv-parser";
import pool from "../config/db.js";

const uploadCSV = (req, res) => {
  const results = [];
  const errors = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      const { name, email, age } = data;
      const errorDetails = {};

      if (!name) errorDetails.name = "El campo 'name' no puede estar vacío.";
      if (!email || !email.includes("@"))
        errorDetails.email = "El formato del campo 'email' es inválido.";
      if (age && !Number.isInteger(+age))
        errorDetails.age = "El campo 'age' debe ser un número positivo.";

      if (Object.keys(errorDetails).length) {
        errors.push({ row: results.length + 1, details: errorDetails });
      } else {
        results.push({ name, email, age: age ? +age : null });
      }
    })
    .on("end", async () => {
      for (const user of results) {
        await pool.query(
          "INSERT INTO users (name, email, age) VALUES ($1, $2, $3)",
          [user.name, user.email, user.age]
        );
      }
      res.json({ ok: true, data: { success: results, errors } });
    });
};

export { uploadCSV };
