'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.blog, {foreignKey: "id_category"})
    }
  }
  blogCategory.init({
    category: {
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
    modelName: 'blogCategory',
  });
  return blogCategory;
};