const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

app.set('view engine', 'ejs')

const authRouter = require('./router/router');
const usergameRouter = require('./router/usergame');

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter)

app.use('/usergame', usergameRouter)

app.get('/', function(req, res){
    res.render('home')
})
app.get('/rock-paper-scissor', function(req, res){
    res.render('chapter4')
})
app.get('/vs-player'), function(req,res){
    res.render('vsPlayer')
}
app.get('/create-room', (req, res) => {

    const roomId = uuidv4(); 
    res.render('create-room', { roomId });
  });

app.listen(process.env.PORT, () =>{
    console.log(`server running on PORT ${process.env.PORT}`)
})