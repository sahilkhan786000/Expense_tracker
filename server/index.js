import express from 'express';
import mongoDB from './db.js';
import routes from './routes/route.js';
import cors from 'cors';
import path from 'path';


const _dirname = path.resolve()
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true})); 
app.use('/', routes);

app.use(express.static(path.join(_dirname, "./me/build")))

app.get('*', function(_,res){
  res.sendFile(path.join(__dirname, "./me/build/index.html", function(err){
    res.status(500).send(err);
  }))
})

const PORT = 5000 ;
// Connect to database before starting server
mongoDB();

app.listen(PORT, () => {
  console.log(`Server is started on PORT ${PORT}`);
});