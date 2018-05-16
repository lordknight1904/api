import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  title: { type: 'String', required: [true, 'Username must be provided'] },
  description: { type: 'String', required: [true, 'Username must be provided'] },
  image: { type: 'String', required: [true, 'Username must be provided'] },
  note: { type: 'String', default: '' },
  dateCreated: { type: Date, default: Date.now },
});

orderSchema.statics = {
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

export default mongoose.model('Order', orderSchema);