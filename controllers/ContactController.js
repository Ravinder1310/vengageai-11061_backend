import ContactsModel from "../models/ContactsModel.js";
import dotenv from "dotenv";

dotenv.config();


// create contact controller
export const createContactController = async (req, res) => {
  try {
    const { name, phone } = req.body;
    
    // validation
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!phone) {
      return res.status(400).send({ error: "Phone is required" });
    }

    
    const contact = new ContactsModel({ ...req.body});
    await contact.save();
    res.status(201).send({
      success: true,
      message: "Contact created successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false, 
      message: "Error in creating contact",
      error,
    });
  }
};

// get all contacts controller
export const getContactsController = async (req, res) => {
  try {
    const contacts = await ContactsModel.find({})
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: contacts.length,
      message: "All contacts",
      contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all contacts",
      error,
    });
  }
};

// delete contact controller
export const deleteContactController = async (req, res) => {
  try {
    await ContactsModel.findByIdAndDelete(req.params.cid);
    res.status(200).send({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.statsu(500).send({
      success: false,
      message: "Error while deleting contact",
      error,
    });
  }
};

// update contact controller
export const updateContactController = async (req, res) => {
  try {
    const { name, phone } =
      req.body;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !phone:
        return res.status(500).send({ error: "Phone is Required" });
      default:
        break;
    }
    const contact = await ContactsModel.findByIdAndUpdate(
      req.params.cid,
      { ...req.body},
      { new: true }
    );
    await contact.save();
    res.status(201).send({
      success: true,
      product: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating contact",
      error,
    });
  }
};


// search contact controller
export const searchContactController = async(req,res) => {
  try {
    const {keyword} = req.params;
    const results = await ContactsModel.find({
      $or:[
        {name:{$regex :keyword, $options:"i"}},
        {phone:{$regex :keyword, $options:"i"}}
      ]
    })
    res.json(results)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while searching contact",
      error,
    });
  }
}
