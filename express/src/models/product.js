import mongoose from 'mongoose'; 

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  availability: Boolean
});

export default mongoose.model('productos', productSchema);