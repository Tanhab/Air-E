const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const latitudeValidator = (value, helpers)=>{

  if(!(value>=-90 && value<=90)){
    return helpers.message('latitude must be in range [-90, 90]');
  }

  return value;
}

const longitudeValidator = (value, helpers)=>{

  if(!(value>=-180 && value<=180)){
    return helpers.message('longitude must be in range [-180, 180]');
  }

  return value;
}

module.exports = {
  objectId,
  password,
  longitudeValidator,
  latitudeValidator
};
