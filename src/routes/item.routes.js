const router = require('express-promise-router')();
const itemController = require('../controllers/item.controller');

// ==> Definindo as rotas de Register e Login - 'User'
// ==> Rota responsável por register
router.post('/register', itemController.register);
// ==> Rota responsável por login
router.post('/login', itemController.login);

// ==> Definindo as rotas do CRUD - 'Item':
// ==> Rota responsável por criar um novo 'Item': (POST): localhost:3000/api/item
router.post('/items', itemController.authenticateToken, itemController.createItem);
// ==> Rota responsável por listar todos os 'Item': (GET): localhost:3000/api/item
router.get('/items', itemController.authenticateToken, itemController.listAllItem);
// ==> Rota responsável por atualizar 'Item' pelo 'Id': (PUT): localhost: 3000/api/item/:id
router.put('/items/:id', itemController.authenticateToken, itemController.updateItemById);
// ==> Rota responsável por excluir 'Item' pelo 'Id': (DELETE): localhost:3000/api/item/:id
router.delete('/items/:id', itemController.authenticateToken, itemController.deleteItemById);
module.exports = router;
