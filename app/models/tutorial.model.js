module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};

// Result
// {
//   "title": "JS Tutorial",
//   "description": "Description for Tutorial",
//   "published": true,
//   "createdAt": "2020-02-02T02:59:31.198Z",
//   "updatedAt": "2020-02-02T02:59:31.198Z",
//   "id": "5e363b135036a835ac1a7da8"
// }

//CRUD operations
// create a new Tutorial: object.save()
// find a Tutorial by id: findById(id)
// retrieve all Tutorials: find()
// update a Tutorial by id: findByIdAndUpdate(id, data)
// remove a Tutorial: findByIdAndRemove(id)
// remove all Tutorials: deleteMany()
// find all Tutorials by title: find({ title: { $regex: new RegExp(title), $options: “i” } })
