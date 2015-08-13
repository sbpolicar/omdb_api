'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    favoriteId: DataTypes.INTEGER,
    body: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args: [20, 200],
          msg: " Comment entries must be between 20 and 200 characters."
        }
      }
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.favorite);
      }
    }
  });
  return comment;
};