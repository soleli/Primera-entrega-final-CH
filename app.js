const express = require("express");
const app = express();
const path = require("path");
const productsRoutes = require('./src/routes/api/productsRoutes');
const methodOverride =  require('method-override');

const cors = require("cors");

app.use(cors());


app.set('views', './src/views');
app.set('view engine', 'ejs');

// ************ Para usar Post ************
app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(methodOverride('_method'));




const pathStatic = path.resolve(__dirname, "./public");
app.use(express.static(pathStatic));

app.use('/api/products' ,productsRoutes);

//app.use('/api/products' ,apiProductsRoutes);





// ******* Error 404*********
app.use((req , res ,next) =>{
    res.status(404).render('not-found');
})



app.listen(process.env.PORT || 8080, () => console.log("server running "));

