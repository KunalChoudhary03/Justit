const express = require("express")
const Cart = require("../models/cart.model")
const verifyToken = require("../middleware/cartMiddleware");

const router = express.Router();

router.post("/addCart",verifyToken,async (req,res)=>{
    try{
        const userId = req.user.id;
        const {productId ,quantity} = req.body;
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,items:[]})
        }
        const existingItem = cart.items.find((item)=> item.productId.toString() === productId);
        if(existingItem){
            existingItem.quantity += quantity;
        }
        else{
            cart.items.push({productId,quantity});
        }
        await cart.save();
        res.json(cart);
    }catch(error){
        res.status(500).json({message: error.message});
    }
   
});


router.get("/get",verifyToken , async (req,res)=>{
    try{
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId}).populate("items.productId");
        res.json(cart || {items:[]});

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});
router.delete("/remove/:productId",verifyToken ,async (req,res)=>{
    try{
        const userId = req.user.id;
        const {productId} = req.params;

        const cart = await Cart.findOne({userId});
        if(!cart) return res.status(404).json({message: "Cart not found"});

        cart.items = cart.items.filter((item)=> item.productId.toString() !==productId);
    await cart.save();
    res.json(cart);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})
module.exports = router;