import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: 'String', required: [true, 'Product name must be provided'] },
  code: { type: 'String', required: [true, 'Product code must be provided'] },
  description: { type: 'String', required: [true, 'Product description must be provided'] },
  images: [
    {
      type: 'String', required: [true, 'At least one image must be uploaded'],
    }
  ],
  price: { type: 'number', required: [true, 'Price must be uploaded'] },
  note: { type: 'String', default: '' },
  dateCreated: { type: Date, default: Date.now },
});

productSchema.statics = {
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

export default mongoose.model('Product', productSchema);