module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Contact
    router.post("/", contacts.createContact);
  
    // Retrieve all Contacts
    //router.get("/", contacts.getAllContacts);
  
    // Retrieve a single Contact with id
    router.get("/:id", contacts.getContactById);

    // Retrieve contacts that matches firstname
    router.get("/", contacts.findAllContactsByFirstname);
  
    // Update a Contact with id
    router.put("/:id", contacts.updateContactById);
  
    // Delete a Contact with id
    router.delete("/:id", contacts.deleteContactById);
  
    // Delete all Contacts
    router.delete("/", contacts.deleteAllContacts);
  
    app.use("/api/contacts", router);
  };
  