import dotenv from "dotenv";
import RecentContactsModel from "../models/RecentContactsModel.js";

dotenv.config();


// create contact controller
export const addRecentContactController = async (req, res) => {
  try {
    const { name, phone } = req.body;
    
    // validation
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!phone) {
      return res.status(400).send({ error: "Phone is required" });
    }

    
    const recent = new RecentContactsModel({ ...req.body});
    await recent.save();
    res.status(201).send({
      success: true,
      message: "Contact added successfully",
      recent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false, 
      message: "Error in adding contact",
      error,
    });
  }
};

// get all contacts controller
export const getRecentContactsController = async (req, res) => {
  try {
    const recents = await RecentContactsModel.find({})
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: recents.length,
      message: "All recent calls",
      recents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all recent calls",
      error,
    });
  }
};

// delete contact controller
export const deleteRecentContactController = async (req, res) => {
  try {
    await RecentContactsModel.findByIdAndDelete(req.params.cid);
    res.status(200).send({
      success: true,
      message: "recent call deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.statsu(500).send({
      success: false,
      message: "Error while deleting the recent call",
      error,
    });
  }
};
