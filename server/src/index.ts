import 'source-map-support/register';
import * as express from 'express';

const app = express();

app.get('/api/greeting', (req, res) => {
  res.send({
    greeting: "Hello world!"
  })
})

app.get('/api/test', (req, res) => {
  throw Error('Test');
})



const PORT = 3009;

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
