module.exports = (sequelize, DataTypes) => {
	return sequelize.define('person', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
		age: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
		email: {
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