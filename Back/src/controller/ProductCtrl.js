let productModel = require("../models/ProductModel");


exports.addProduct = (req, res) => {
  // console.log("REQ.BODY:", req.body);
  // console.log("REQ.FILE:", req.file);
  const { Name, description, price, category_id } = req.body;
  const image_url = req.file ? req.file.filename : null;

  if (!Name || !price) {
    return res.status(400).send({ error: "Name and Price are required" });
  }
  productModel.addProduct(Name, description, parseFloat(price), image_url, category_id)
    .then((result) => res.status(200).send({ message: "Product added successfully", data: result }))
    .catch((err) => res.status(500).send({ error: err }));
};




//add product by category
exports.getProductsByCategory = (req, res) => {
  const category_id = parseInt(req.params.category_id);
  productModel.getProductsByCategory(category_id)
    .then((products) => {;
      res.json(products);
    })
    .catch((err) => {
     console.log(" Error fetching products:", err);
      res.status(500).json({ error: "Server Error" });
    });
};

//cart products
exports.getProductById = (req, res) => {
  const { id } = req.params;
  productModel
    .findProductById(id)
    .then((product) => {
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    })
    .catch((err) => res.status(500).json({ error: err }));
};



// view products

exports.getAllProducts =(req, res) => {
    productModel.viewAllProducts()
    .then((result)=>{
      res.send(result);
    }).catch((err)=>{
      res.send("Data not found")
    })
};




exports.UpdateProd = (req, res) => {
  let { name, description, price, image_url, category_id } = req.body; // lowercase
  let id = req.params.id;

  productModel.UpdateProd(name, description, price, image_url, category_id, id)
    .then((result) => res.send({ message: "Product updated successfully", result }))
    .catch((err) => res.status(500).send(err));
};


exports.DeleteProduct = (req, res) => {
  let id = req.params.id;

  productModel.DeleteProd(id)
    .then((result) => res.send({ message: "Product deleted successfully", result }))
    .catch((err) => res.status(500).send(err));
};























































