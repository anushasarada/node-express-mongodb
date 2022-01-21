const db = require("../models");
const Contact = db.contacts;
const config = require("../config/auth.config.js")
const User = db.users;

// Create and Save a new Contact
exports.createContact = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipcode: req.body.zipcode,
    active: req.body.active ? req.body.active : true,
    grouptitle: req.body.grouptitle,
  });

  // Save Contact in the database
  contact
    .save(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAllContactsByFirstname = (req, res) => {

  const firstname = req.query.firstname;
  //Check if url has firstname param, if not then list all contacts
  var condition = firstname ? { firstname: { $regex: new RegExp(firstname), $options: "i" } } : {};

  Contact.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Contact with an id
exports.getContactById = (req, res) => {
  const id = req.params.id;

  Contact.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with id=" + id });
    });
};

// Find contacts that matches firstname
// exports.getContactByFirstName = (req, res) => {
//   const firstname = req.params.firstname;

//   console.log("Attempted Search using firstname")
//   console.log(firstname)

//   Contact.findOne({"firstname":firstname})
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Contact with first name=" + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Contact with first name=" + id });
//     });
// };

// Update a Contact by the id in the request
exports.updateContactById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
        });
      } else res.send({ message: "Contact was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};

// Delete a Contact with the specified id in the request
exports.deleteContactById = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      } else {
        res.send({
          message: "Contact was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};

// Delete all Contacts from the database.
exports.deleteAllContacts = (req, res) => {
  Contact.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Contacts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts."
      });
    });
}; 

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user  = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    console.log("signup data sent from ui to server")
    console.log(user)
    user.save((err, user) => {
        if(err){
            res.status(500).send({ message: err});
            return;
        }
        res.send({ message: "User was registered successfully! "})
    })
}