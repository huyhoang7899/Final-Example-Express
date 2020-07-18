module.exports.postCreate = function(req, res, next) {
  var errors = [];
  if(req.body.name.length > 30) {
    errors.push('Name shop only allow 30 characters !');
  }
  if(!req.body.name) {
    errors.push('Name Shop is required !');
  }

  if(errors.length) {
    res.render('shop/create', {
      errors: errors,
    });
    return;
  }
  next();
}
