import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const cart = new mongoose.Schema({
  products: [{
  product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        require: true
     },
     
     quantity: {
        type: Number,
        default: 1
     }}],
     cart:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
   },
},{ timestamps: true });

cart.plugin(mongoosePaginate);
export default mongoose.model('Carts', cart);
