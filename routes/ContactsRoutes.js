import express from "express";
import {
  createContactController,
  deleteContactController,
  getContactsController,
  searchContactController,
  updateContactController,
} from "../controllers/ContactController.js";

const router = express.Router();

// routes
router.post("/create-contact", createContactController);

// update contact
router.put("/update-contact/:cid", updateContactController);

// get contacts
router.get("/get-contact", getContactsController);

// delete contact
router.delete("/delete-contact/:cid", deleteContactController);

// search contact
router.get("/search/:keyword", searchContactController);

export default router;
