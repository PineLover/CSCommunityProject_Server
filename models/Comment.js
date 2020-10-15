module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Comment', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
		},
		parentId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNULL: false
		},
		category: {
			type: DataTypes.STRING(20),
			allowNULL: false,
		},
		articleId: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
		page: {
			type: DataTypes.INTEGER.UNSIGNED,
			alloNULL: false,
		},
		email: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique:true,
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		body: {
			type: DataTypes.STRING(3000),
			allowNull: false,
		}
	},
		{
			timestamps: true,
		})
}
