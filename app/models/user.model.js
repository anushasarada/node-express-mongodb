// const mongoose = require("mongoose")
// const User = mongoose.model(
//     "user",
//     new mongoose.Schema({
//         firstname: String,
//         lastname: String,
//         email: String,
//         password: String
//     })
// )
// mongoose.exports = User;

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        roles: [
          // {
          //   type: mongoose.Schema.Types.ObjectId,
          //   ref: "Role"
          // }
        ]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };
  
  