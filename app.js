const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index');

var app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(routes);
app.use((req, res)=>{
    res.status(404).render('404');
});

app.listen(process.env.PORT || 3000);