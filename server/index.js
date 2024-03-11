import express from 'express';
import mongoDB from './db.js';
import routes from './routes/route.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors()); // Assuming you need CORS
app.use('/', routes);

app.use(express.static(path.join(__dirname, "./me/build")));

app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, "./me/build/index.html"), function (err) {
    res.status(500).send(err);
  });
});

const PORT = process.env.PORT || 5000;
// Connect to database before starting server
mongoDB();

app.listen(PORT, () => {
  console.log(`Server is started on PORT ${PORT}`);
});
