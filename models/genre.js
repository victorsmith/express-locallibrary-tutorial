const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
	name: { type: String, maxlength: 100, minlength: 3, required: true },
});

GenreSchema.virtual('url').get( () => {
    return '/genre/' + this.name;
})

module.exports = mongoose.model('Genre', GenreSchema);