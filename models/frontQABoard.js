module.exports = (sequelize, DataTypes) => {
	return sequelize.define('frontQABoard', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		writer: {
			type: DataTypes.STRING(20),
			allowNull: false,
		
		},
		title: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		viewCnt: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
		contents: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	},
	{
		timestamps: true,
	})
}