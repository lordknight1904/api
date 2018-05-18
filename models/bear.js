import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;

const bearSchema = new Schema({
  name: { type: 'String', required: [true, 'Name must be provided'] },
  age: { type: 'number', required: [true, 'Age must be provided'] },
  dateCreated: { type: Date, default: Date.now },
});
bearSchema.plugin(uniqueValidator, { message: 'This {PATH} has been taken.' });

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