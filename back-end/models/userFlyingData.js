module.exports = function(sequelize, DataTypes) {
  var userFlyingData = sequelize.define('userFlyingData', {
    pitch: DataTypes.DECIMAL,
    roll: DataTypes.DECIMAL,
    yaw: DataTypes.DECIMAL,
    vgx: DataTypes.DECIMAL,
    vgy: DataTypes.DECIMAL,
    vgz: DataTypes.DECIMAL,
    templ: DataTypes.DECIMAL,
    temph: DataTypes.DECIMAL,
    tof: DataTypes.DECIMAL,
    h: DataTypes.DECIMAL,
    bat: DataTypes.DECIMAL,
    baro: DataTypes.DECIMAL,
    time: DataTypes.DECIMAL,
    agx: DataTypes.DECIMAL,
    agy: DataTypes.DECIMAL,
    agz: DataTypes.DECIMAL
  });

  // userFlyingData.associate = function(models) {
  //   userFlyingData.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return userFlyingData;
};
