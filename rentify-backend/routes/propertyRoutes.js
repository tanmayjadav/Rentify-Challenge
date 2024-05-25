import express from 'express';

import {
    addProperty,
    getSellerProperties,
    updateProperty,
    deleteProperty,
    getAllProperties,
  showInterest,
  getPropertyById,
  addLikeToProperty,
} from '../controllers/propertyControllers.js';
import { sendEmail } from '../controllers/sendEmail.js';

const router = express.Router();

router.post('/addproperties', addProperty);
router.get('/properties/:sellerId', getSellerProperties);
router.put('/properties/:id', updateProperty);
router.delete('/properties/:id', deleteProperty);
router.get('/property/:id', getPropertyById);
router.put('/property/like/:id', addLikeToProperty);

router.get('/properties', getAllProperties);
router.get('/property/interest/:pId', showInterest);

router.post("/sendmail",sendEmail)

export default router;

