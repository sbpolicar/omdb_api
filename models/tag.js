'use strict';
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args: [3, 20],
          msg: " Tag entries must be between 3 and 20 characters."
        },
        is: {
          args: ["^[a-z]+$",'i'],
          msg: " Tag entries cannot contain numbers."
        }
      }
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.tag.belongsToMany(models.favorite, {through: "favoritesTags"});
      }
    }
  });
  return tag;
};