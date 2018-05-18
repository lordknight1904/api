import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: 'String', required: [true, 'Name must be provided.'], unique: [true, 'This name has been taken'] },
  dateCreated: { type: Date, default: Date.now },
});
roleSchema.plugin(uniqueValidator, { message: 'This {PATH} has been taken.' });

roleSchema.statics = {
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
  },
};

export default mongoose.model('Role', roleSchema);