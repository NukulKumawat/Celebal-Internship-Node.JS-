const express= require("express")
const mongoose= require("mongoose")
const Product=require("../Assignment 5/models/product.models")
const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.get('/',(req,res)=>{
    res.send("Hello!!! ")
})


/*CREATE  A PRODUCT*/

app.post('/product',async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})


/*GET ALL PRODUCTS*/

app.get('/products',async(req,res)=>{
    try {
        // const products = await Product.find({});
        // res.status(200).json(products);
       Product.find({}).then(function(products){
            res.json(products)
        })
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})



/*GET A PRODUCT by ID*/

app.get('/product/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


/*UPDATE A PRODUCT BY ID*/

app.put('/product/:id',async(req,res)=>{
    try {
        const{id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with id: ${id}`})
        }
        const updatedProduct= await Product.findById(id);
        res.status(200).json(updatedProduct);
        
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/*DELETE A PRODUCT BY ID */

app.delete('/product/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `Cannot find any product with id: ${id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/*DELETE ALL PRODUCTS*/

app.delete('/products',async(req,res)=>{
    try {
        const products=await Product.deleteMany({});
        res.status(200).json(products)        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

/*MONGODB CONNECTION */

mongoose.connect('mongodb+srv://admin:1234@cluster0.paddfcn.mongodb.net/')
.then(()=>{
    app.listen(3000,()=>{
        console.log("Node API running on port 3000")
    })
    console.log("connected to mongodb")
}).catch((error)=>{
    console.log(error)
})