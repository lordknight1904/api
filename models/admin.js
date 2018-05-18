import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import config from '../config'
const Schema = mongoose.Schema;

function encrypt(password){
  const cipher = crypto.createCipher('aes-256-cbc', config.SERVER_ADMIN_PASSWORD_SECRET);
  let encrypted = cipher.update(password,'utf8','hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
function decrypt(password){
  if (password === null || typeof password === 'undefined') {return password;}
  const decipher = crypto.createDecipher('aes-256-cbc', config.SERVER_ADMIN_PASSWORD_SECRET);
  let decrypted = decipher.update(password,'hex','utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const adminSchema = new Schema({
  username: {
    type: 'String',
    required: [true, 'Username must be provided.'],
    min: [6, 'Username must contains 6 character or more.'],
    max: [20, 'Username must contains less than 20 characters.'],
    unique: true
  },
  password: { type: 'String',
    required: [true, 'Password must be provided.'],
    min: [6, 'Password must contains 6 character or more.'],
    max: [20, 'Password must contains less than 20 characters.'],
    get: decrypt,
    set: encrypt
  },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: [true, 'Role must be provided.'] },
  dateCreated: { type: Date, default: Date.now },
});
adminSchema.plugin(uniqueValidator, { message: 'This {PATH} has been taken.' });

adminSchema.statics = {
  get(id, cb) {
    return this.findById({ _id: id }).populate('role', 'name').exec(cb);
  },
  getAll(cb) {
    return this.find({}).populate('role', 'name').exec(cb);
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
  authenticate(admin, cb) {
    return this.findOne({ username: admin.username, password: admin.password})
      .populate('role', 'name')
      .exec(cb);
  }
};

export default mongoose.model('Admin', adminSchema);