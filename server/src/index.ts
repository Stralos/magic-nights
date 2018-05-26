import * as express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'))



const PORT = 3009;

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
