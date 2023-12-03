import express from "express";
import { addRecentContactController, deleteRecentContactController, getRecentContactsController } from "../controllers/RecentContactsController.js";

const router = express.Router();

// routes
router.post("/add-contact", addRecentContactController);

// get contacts
router.get("/get-contact", getRecentContactsController);

// delete contact
router.delete("/delete-contact/:cid", deleteRecentContactController);


export default router;
