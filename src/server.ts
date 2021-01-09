import express from 'express';

const app = express();

app.get('/', (request, response) => {
  const teste = 'BLa';

  return response.json({ message: teste });
});

app.listen(3333);
