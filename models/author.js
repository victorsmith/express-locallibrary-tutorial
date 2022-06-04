const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
	first_name: { type: String, required: true, maxLength: 100 },
	family_name: { type: String, required: true, maxLength: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function () {
	// To avoid errors in cases where an author does not have either a family name or first name
	// We want to make sure we handle the exception by returning an empty string for that case
	var fullname = '';
	if (this.first_name && this.family_name) {
		fullname = this.family_name + ', ' + this.first_name;
	}
	if (!this.first_name || !this.family_name) {
		fullname = '';
	}
	return fullname;
});

AuthorSchema.virtual('lifespan').get( function () {

	let dateOfBirth = this.date_of_birth
		? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
				DateTime.DATE_MED
		  )
		: 'Unknown';
	
	let dateOfDeath = this.date_of_death
		? DateTime.fromJSDate(this.date_of_death).toLocaleString(
				DateTime.DATE_MED
		  )
		: 'Unknown';
	
	let output = `${dateOfBirth} - ${dateOfDeath}`
	return output;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
	return '/catalog/author/' + this._id;
});


AuthorSchema.virtual('')

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
