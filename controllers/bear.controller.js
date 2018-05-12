import Bear from '../models/bear';

export function getAllBear(req, res, next) {
  Bear.getAll((err, bear) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
      req.data = bear;
    }
    next();
  });
}
export function getBear(req, res, next) {
  Bear.get(req.params.id, (err, bear) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
      req.data = bear;
    }
    next();
  });
}
export function addBear(req, res, next) {
  const reqBear = req.body.bear;
  const bear = new Bear({
    name: reqBear.name,
    age: reqBear.age,
  });
  Bear.add(bear, (err, bear) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
    }
    next();
  });
}
export function updateBear(req, res, next) {
  const bear = req.body.bear;
  Bear.put(req.params.id, bear, (err) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else {
      req.status = 200;
    }
    next();
  });
}
export function deleteBear(req, res, next) {
  Bear.delete(req.params.id, (err, bear) => {
    if (err) {
      req.status = 500;
      req.error = err;
    } else if (bear) {
      console.log('not exits');
      req.status = 204;
    } else {
      console.log('here');
      req.status = 404;
    }
    next();
  });
}