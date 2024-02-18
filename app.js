const express = require("express")
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json())

app.set('view engine','ejs')

const dbURI = `mongodb+srv://node_authen:nodeauth62@nodetuts.ugdrw6w.mongodb.net/node-auth`
mongoose.connect(dbURI)//retryWrites=true&w=majority {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}
.then((result) => app.listen(3002))
.catch((err) => console.log(err))

app.use(authRoutes);
app.get('/',(req,res) => res.render('home'))
app.get('/smoothies',(req,res) => res.render('smoothies'))
