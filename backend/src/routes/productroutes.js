const express = require("express");
const Products = require("../models/product.models");
const productModels = require("../models/product.models");
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Error fetching products", error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Error deleting product", error });
  }
});

router.post('/add',async (req,res)=>{
    try{
    const {name, price, image, description, category, id } = req.body
    if(!name || !price || !image || !description || !category || ! id) {
        return res.status(400).json({message: "All are required"})
    }
    const newProdut = new Products({
        name,
      price,
      image,
      description,
      category,
      id,
    })
   await newProdut.save();
    res.status(200).json({message:"New product added"})
    }
   catch(error){
  res.status(500).json({message: "Error",error})
   }

})



router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } 
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product", error });
  }
});

module.exports = router;
