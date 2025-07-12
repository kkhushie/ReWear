const express=require('express')
const productRouter=express.Router()

const {createProduct,getAllProducts,getProductById,getRelatedProducts} = require("../controllers/product.controller");
const {protect} =require('../middlewares/authMiddleware')

productRouter.post("/", protect, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/users/:userId/products",getRelatedProducts );
  

module.exports=productRouter