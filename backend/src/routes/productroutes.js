const express = require("express")
const Products = require("../models/product.models")
const router  = express.Router()


router.get("/products", async(req,res)=>{
    try{
    const products = await Products.find()
    res.status(200).json(products)  
    }
    catch(error){
        res.status(500).json({
            message:"Error Fetching ",error
        });
    }
})
module.exports = router