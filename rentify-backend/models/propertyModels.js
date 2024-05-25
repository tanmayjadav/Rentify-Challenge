import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  nearbyHospitals: {
    type:Number
  },
  nearbyColleges: {
    type:Number
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image:{
    type:[String],
    required:true,
  },
  likes:{
    type:Number
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const Property = mongoose.model('Property', propertySchema);
