const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name:{type: 'string',require:true},
  price:{type: 'number',require:true},
  quantity:{type: 'number',require:true},
  description:{type:'string',required:true},
})

const Product = mongoose.model('Product',productSchema);

module.exports=Product;

