import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['burgers', 'sides', 'drinks', 'desserts'],
    required: true,
  },
  image: { type: String, required: true },
  badge: { type: String, default: '' },       // e.g. "Best Seller", "Spicy", "New"
  available: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
