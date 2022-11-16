const express = require('express')

const app =  express()

const port = 8080


const Contenedor = require('../productos/contenedor')
const productos = new Contenedor("./productos.json");

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views','./views')
app.set('view engine','ejs')

app.get('/', async (req,res)=>{
    let getAll = await productos.getAll()
    console.log('Todos los archivos')
    console.log(getAll)
    if(getAll === undefined){
        
        getAll=[]
    }
    res.render('inicio',{getAll})
})

app.get('/productos', async (req,res)=>{
    let getAll = await productos.getAll()
    console.log('Todos los archivos')
    console.log(getAll)
    if(getAll === undefined){
        
        getAll=[]
    }
    res.render('allProducts',{getAll})
})

app.post('/productos', async (req,res)=>{

    console.log(`post req recibida con exito`);
    const data = req.body;
    console.log(data);
    const nuevoProducto = await productos.save(data);
    // productos.push(req.body)
    res.redirect('/')
    console.log(productos.length)
    console.log(productos)
})
const server =  app.listen(port,()=>{
    console.log(`Servidor escuchado en http://localhost:${port}`)
})
server.on('error',err =>{
    console.log('Error en sercvidor',err)
})