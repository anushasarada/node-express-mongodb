module.exports = app => {
    const groups = require("../controllers/group.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Group
    router.post("/", groups.createGroup);
  
    // Retrieve all Groups
    router.get("/", groups.findAllGroupsByTitle);
  
    // Retrieve a single Group with id
    router.get("/:id", groups.getGroupById);
  
    // Update a Group with id
    router.put("/:id", groups.updateGroupById);
  
    // Delete a Group with id
    router.delete("/:id", groups.deleteGroupById);
  
    // Delete all Groups
    router.delete("/", groups.deleteAllGroups);
  
    app.use("/api/groups", router);
  };
  