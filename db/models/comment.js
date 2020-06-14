'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    text: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        len: [2, 500]
      }
    },
    userIpAddress: {
      type: DataTypes.STRING(39),
      allowNull: false,
    },
    filmId: {
      // id of film on star wars api
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    }
  }, {
    defaultScope: {
      order: [
        ['createdAt', 'ASC']
      ]
    }
  });

  Comment.associate = function(models) {

  };

  return Comment;
};
