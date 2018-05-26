import * as express from 'express';

const app = express();

app.get('/api/greeting', (req, res) => res.send({
  greeting: "Hello world!"
}))



const PORT = 3009;

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
