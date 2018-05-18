import Role from '../models/role';

export function getAllRole(req, res, next) {
  Role.getAll((err, role) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      console.log(role);
      req.status = 200;
      req.data = role;
    }
    next();
  });
}
export function getRole(req, res, next) {
  Role.get(req.params.id, (err, role) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
      req.data = role;
    }
    next();
  });
}
export function addRole(req, res, next) {
  const reqRole = req.body.role;
  const role = new Role({
    name: reqRole.name,
  });
  Role.add(role, (err, role) => {
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
export function updateRole(req, res, next) {
  const role = req.body.role;
  Role.put(req.params.id, role, (err) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
    }
    next();
  });
}
export function deleteRole(req, res, next) {
  Role.delete(req.params.id, (err, role) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else if (role) {
      console.log('not exits');
      req.status = 204;
    } else {
      console.log('here');
      req.status = 404;
    }
    next();
  });
}