const express = require("express");
const { axiosInstance } = require("./api");
const app = express();
const cors = require("cors");
const AuthenticationMiddleware = require("./middlewares/authentication");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
  }
  const allUsers = await axiosInstance.get("/users");

  const user = allUsers.data.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }
  const token = jwt.sign({ userId: user.id }, "TOKEN_SECRET", {
    expiresIn: "1h",
  });
  res.json({ token: token, user: { id: user.id, name: user.name } });
});

app.post("/checkout", async (req, res) => {
  const checkout = await axiosInstance.post("/checkout", {
    userId: req.userId,
    products: req.body.products,
  });

  res.json(checkout.data);
});

app.get("/products", async (req, res) => {
  const allProducts = await axiosInstance.get("/products");
  res.json(allProducts.data);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const allProducts = await axiosInstance.get(`/products/${id}`);
  res.json(allProducts.data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
