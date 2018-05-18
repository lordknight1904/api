import Admin from '../models/admin';

export function getAllAdmin(req, res, next) {
  Admin.getAll((err, admin) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
      req.data = admin;
    }
    next();
  });
}
export function getAdmin(req, res, next) {
  Admin.get(req.params.id, (err, admin) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
      req.data = admin;
    }
    next();
  });
}
export function addAdmin(req, res, next) {
  const reqAdmin = req.body.admin;
  const admin = new Admin({
    username: reqAdmin.username,
    password: reqAdmin.password,
    role: reqAdmin.role,
  });
  Admin.add(admin, (err, admin) => {
    if (err) {
      const errors = err.errors;
      const error = errors[Object.keys(errors)[0]];
      req.status = 500;
      req.error = error.message;
    } else {
      req.status = 200;
    }
    next();
  });
}
export function authenticate(req, res, next) {
  const reqAdmin = req.body.admin;
  const admin = new Admin({
    username: reqAdmin.username,
    password: reqAdmin.password,
  });
  Admin.authenticate(admin, (err, admin) => {
    if (err) {
      const errors = err.errors;
      const error = errors[Object.keys(errors)[0]];
      req.status = 500;
      req.error = error.message;
    } else {
      if (admin) {
        req.status = 200;
        req.data = admin.role.name;
      } else {
        req.status = 500;
        req.error = "Not exist";
      }
    }
    next();
  });
}
export function updateAdmin(req, res, next) {
  const admin = req.body.admin;
  Admin.put(req.params.id, admin, (err) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
    }
    next();
  });
}
export function deleteAdmin(req, res, next) {
  Admin.delete(req.params.id, (err, admin) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else if (admin) {
      console.log('not exits');
      req.status = 204;
    } else {
      console.log('here');
      req.status = 404;
    }
    next();
  });
}