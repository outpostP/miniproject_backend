"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.blog, { foreignKey: "id_user" });
		}
	}
	user.init(
		{
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			  },
			  email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			  },
			  phone: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			  },
			  password: {
				type: DataTypes.STRING,
				allowNull: false
			  },
			  imgProfile: {
				type: DataTypes.STRING
			  },
			  isVerified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			  },
			  createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			  },
			  updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			  }
		},
		{
			sequelize,
			modelName: "user",
		}
	);
	return user;
};
