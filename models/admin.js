import mongoose from 'mongoose';
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
  username: { type: 'String', required: [true, 'Username must be provided'] },
  password: { type: 'String', required: [true, 'Password must be provided'], get: decrypt, set: encrypt },
  role: { type: 'String', required: [true, 'Role must be provided'] },
  dateCreated: { type: Date, default: Date.now },
});

adminSchema.statics = {
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
  authenticate(username, password, cb) {
    return this.findOne({ username, password}).exec(cb);
  }
};

export default mongoose.model('Admin', adminSchema);