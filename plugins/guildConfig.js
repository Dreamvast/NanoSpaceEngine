const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
	guild: {
		type: mongoose.SchemaTypes.String,
		required: true,
		unique: true,
	},
	prefix: {
		type: mongoose.SchemaTypes.String,
		required: true,
		default: 'd!',
	},
	defaultRole: {
		type: mongoose.SchemaTypes.String,
		required: false,
	},
	memberLogChannel: {
		type: mongoose.SchemaTypes.String,
		required: false,
	}
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema)