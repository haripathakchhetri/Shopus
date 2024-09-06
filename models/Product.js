
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true,
    enum: ['samsung', 'apple', 'dolce']
  },

  category: {
    type: String,
    required: true,
    enum: ['clothes', 'tech']
  },

  stock: {
    type: Number,
    required: true
  },

  rating: {
    type: Number,
    default: 0
  },

  reviews: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
      },

      comment: {
        type: String,
        required: true
      },

      rating: {
        type: Number,
        required: true
      }
    }
  ]

}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema);