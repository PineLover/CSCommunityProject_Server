module.exports = (sequelize, DataTypes) => {
	return sequelize.define('person', {
		email: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
		age: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		pwd: {
			type: DataTypes.STRING(20),
			allowNull: false,
		}
	},
	{
		timestamps: true,
	})
}
