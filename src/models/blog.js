"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class blog extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.user, { foreignKey: "id_user" });
      		this.belongsTo(models.blogCategory, {foreignKey: "id_category"} );
      		this.hasMany(models.blogKeywords, {foreignKey: "id_blog"});
		}
	}
	blog.init(
		{
			  title: {
				type: DataTypes.STRING,
				allowNull: false,
			  },
			  content: {
				type: DataTypes.TEXT,
				allowNull: false,
			  },
			  country: {
				type: DataTypes.STRING,
				allowNull: false,
			  },
			  id_user: {
				type: DataTypes.INTEGER,
				allowNull: false,
			  },
			  id_category: {
				type: DataTypes.INTEGER,
				allowNull: false,
			  },
			  imgBlog: {
				type: DataTypes.STRING,
				allowNull: false,
			  },
			  videoUrl: {
				type: DataTypes.STRING
			  },
			  createdAt: {
				type: DataTypes.DATE
			  },
			  updatedAt: {
				type: DataTypes.DATE
			  }
		},
		{
			sequelize,
			modelName: "blog",
		}
	);
	return blog;
};
