const jsonServer = require("json-server");
const server = jsonServer.create();

const middlewares = jsonServer.defaults();

// Configuração dos middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/auth", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
  }

  // Simulação de autenticação
  if (email === "daniel@gmail.com" && password === "123456") {
    res.status(200).json({ token: "1234567890" });
  } else {
    res.status(401).json({ erro: "Credenciais inválidas" });
  }
});

// Iniciando o servidor
const porta = 3000;
server.listen(porta, () => {
  console.log(`JSON Server está rodando na porta ${porta}`);
});
