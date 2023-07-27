'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogKeywords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.blog, {foreignKey: "id_blog"} );
    }
  }
  blogKeywords.init({
    id_blog: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    keywordName: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'blogKeywords',
  });
  return blogKeywords;
};