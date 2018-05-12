import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bearSchema = new Schema({
  name: { type: 'String', required: [true, 'Name must be provided'] },
  age: { type: 'number', required: [true, 'Age must be provided'] },
  dateCreated: { type: Date, default: Date.now },
});
const handleDuplicate = (error, res, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Name existed'));
  } else {
    next();
  }
};

// bearSchema.post('save', handleDuplicate);
// bearSchema.post('update', handleDuplicate);
// bearSchema.post('findOneAndUpdate', handleDuplicate);
// bearSchema.post('insertMany', handleDuplicate);

bearSchema.statics = {
  get(id, cb) {
    return this.findById({ _id: id }).exec(cb);
  },
  getAll(cb) {
    return this.find({}, cb);
  },
  add(obj, cb) {
    return this.create(obj, cb);
  },
  put(id, obj, cb) {
    return this.findOneAndUpdate({ _id: id }, obj).exec(cb);
  },
  delete(id, cb) {
    return this.findOneAndDelete({ _id: id }).exec(cb);
  }
};

export default mongoose.model('Bear', bearSchema);