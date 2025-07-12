const Product=require('../models/product.model')
// POST /api/products
exports.createProduct = async (req, res) => {
    try {
      const {
        title, description, category, type, size, condition, tags,
        color, pointsRequired, images
      } = req.body;
  console.log(req.user)
      const owner = req.user.id; // assuming JWT middleware adds req.user
      
      const newProduct = await Product.create({
        title, description, category, type, size, condition, tags,
        color, pointsRequired, images, owner
      });
  
      res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  exports.getAllProducts = async (req, res) => {
    try {
      const query = {
        isAvailable: true,
        approvedByAdmin: true,
      };
  
      // Optional category filtering
      if (req.query.category) {
        query.category = req.query.category;
      }
  
      const products = await Product.find(query).populate("owner", "username email");
  
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching products", error });
    }
  };
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate("owner", "username email profileImage");
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching product", error });
    }
  };
  

  exports.getRelatedProducts=async (req, res) => {
    const products = await Product.find({ owner: req.params.userId });
    res.json(products);
  }

  