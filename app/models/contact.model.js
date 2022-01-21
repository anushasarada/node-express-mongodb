module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstname: String,
        lastname: String,
        phone: Number,
        email: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        country: String,
        zipcode: Number,
        active: Boolean,
        grouptitle: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Contact = mongoose.model("contact", schema);
    return Contact;
  };
  
  