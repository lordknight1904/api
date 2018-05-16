import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const importSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'Import for product must be provided'] },
  code: { type: 'String', required: [true, 'Import paper code must be provided'] },
  quantity: { type: 'number', required: [true, 'Quantity must be provided'] },
  description: { type: 'String', required: [true, 'Import description must be provided'] },
  vendor: { type: 'String', required: [true, 'Vendor name must be provided'] },
  note: { type: 'String', default: '' },
  dateCreated: { type: Date, default: Date.now },
});

importSchema.statics = {
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

export default mongoose.model('Import', importSchema);