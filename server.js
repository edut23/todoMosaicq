const app = require('./src/app');
console.log("buildando");
const port = process.env.PORT;
app.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});