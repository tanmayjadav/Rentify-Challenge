import { Property } from "../models/propertyModels.js";
import { User } from "../models/userModels.js";
import ErrorHandler from "../middlewares/error.js";

export const addProperty = async (req, res, next) => {
  const {
    place,
    area,
    bedrooms,
    bathrooms,
    nearbyHospitals,
    nearbyColleges,
    price,
    image,
    description,
    sellerId,
  } = req.body;
  const user = await User.findById(sellerId);
  if (user) {
    try {
      const property = new Property({
        place,
        area,
        bedrooms,
        bathrooms,
        nearbyHospitals,
        nearbyColleges,
        price,
        image,
        description,
        sellerId,
      });

      await property.save();
      res.status(201).json({
        success: true,
        message: "Property added successfully",
        property,
      });
    } catch (error) {
      console.log(error);
      next(ErrorHandler);
    }
  } else {
    res.status(500).json({
      success: false,
      message: "user does not exists",
    });
  }
};

export const getSellerProperties = async (req, res, next) => {
  const sellerId = req.params.sellerId;
  try {
    const properties = await Property.find({ sellerId });

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log(error);
    // next(ErrorHandler);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const updates = req.body;

    const property = await Property.findByIdAndUpdate(propertyId, updates, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.log(error);
    // next(ErrorHandler);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findByIdAndDelete(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.log(error);
    // next(ErrorHandler);
  }
};

export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().populate(
      "sellerId",
      "firstName lastName email"
    );

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log(error);
    // next(ErrorHandler);
  }
};

export const showInterest = async (req, res, next) => {
  try {
    const propertyId = req.params.pId;
    const property = await Property.findById(propertyId).populate(
      "sellerId",
      "firstName lastName email phoneNumber"
    );
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.log(error);
    next(ErrorHandler);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId).populate(
      "sellerId",
      "firstName lastName email"
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);
    // next(error); // Assuming ErrorHandler is defined elsewhere
  }
};


export const addLikeToProperty = async (req, res, next) => {
  const propertyId = req.params.id;
  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    property.likes += 1;

    await property.save();

    res.status(200).json({
      success: true,
      message: 'Property liked successfully',
      property,
    });
  } catch (error) {
    console.log(error);
  }
};