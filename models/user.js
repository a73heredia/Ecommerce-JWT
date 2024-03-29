import mongoose from 'mongoose'

const user = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
  age: Number,
  password: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts', require: true },
  role: {
    type: String,
    enum: ['admin', 'usuario', 'premium'],
    default: 'usuario',
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts', required: true },
  status: { type: String, default: 'inactive', enum: ['active', 'inactive'] },
  documents: [{
    name: String,
    reference: String,
  }],
  last_connection: Date,
}, { timestamps: true })



export default mongoose.model('User', user)