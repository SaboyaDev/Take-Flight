module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  // User.associate = function(models) {
  //   // User.hasMany(models.Entry, {
  //   //   onDelete. "cascade"
  //   // });

  //   User.hasMany(models.UserFlyingData, {});
  // };

  return Users;
};
