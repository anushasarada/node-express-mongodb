exports.all = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.user = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.mod = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.admin = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  