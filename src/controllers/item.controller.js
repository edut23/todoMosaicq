const db = require("../config/database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ==> Método responsável por criar um novo 'User':
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, hashedPassword]
  );
  res.status(201).send({
    message: "User added successfully!",
  });
}

// ==> Método responsável por realizar o login do 'User';
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verifica se o usuário existe
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Verifica a senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, "SECRET_KEY", { expiresIn: '24h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Proteção de rotas
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ==> Método responsável por criar um novo 'Item':
exports.createItem = async (req, res) => {
  const { title, description, status, creation } = req.body;
  const fixDate = new Date(creation * 1000).toISOString();
  const { rows } = await db.query(
    "INSERT INTO item (title, description, status, creation) VALUES ($1, $2, $3, $4)",
    [title, description, status, fixDate]
  );
  res.status(201).send({
    message: "Item added successfully!",
    body: {
      item: { title, description, status, creation }
    },  
  });
};

// ==> Método responsável por listar todos os 'Item':
exports.listAllItem = async (req, res) => {
  const response = await db.query('SELECT * FROM item ORDER BY itemid ASC');
  res.status(200).send(response.rows);
};

// ==> Método responsável por atualizar um 'Item' pelo 'Id':
exports.updateItemById = async (req, res) => {
  const itemId = parseInt(req.params.id);
  const { title, description, status, creation } = req.body;
  const fixDate = new Date(creation * 1000).toISOString();
  const response = await db.query(
    "UPDATE item SET title = $1, description = $2, status = $3, creation = $4 WHERE itemid = $5",
    [title, description, status, fixDate, itemId]
  );
  res.status(200).send({ message: "Item Updated Successfully!" });
};

// ==> Método responsável por excluir um 'Item' pelo 'Id':
exports.deleteItemById = async (req, res) => {
  const itemId = parseInt(req.params.id);
  await db.query('DELETE FROM item WHERE itemId = $1', [
    itemId
  ]);
  res.status(200).send({ message: 'Item deleted successfully!', itemId });
};