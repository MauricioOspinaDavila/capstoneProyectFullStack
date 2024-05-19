import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { createUser } from "./models/user.js";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(express.json());
app.use(router);

// Crear un usuario admin de ejemplo (solo para desarrollo)
const seedAdmin = async () => {
  const adminUser = await createUser(
    "Admin User",
    "admin@example.com",
    bcrypt.hashSync("admin_password", 10),
    null,
    "admin"
  );
  console.log("Admin user created:", adminUser);
};

seedAdmin();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
