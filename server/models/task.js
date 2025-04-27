const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const Task = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: Number, required: true, default: 1, enum: [1, 2, 3] },
    due: { type: Date, required: true },
    CreationDate: { 
        type: Date, 
        required: true,
	    default: () => new Date(),
	    immutable: true
    }
});

Task.virtual("dueFormatted").get(function() {
    return DateTime.fromJSDate(this.due).toLocaleString(DateTime.DATE_MED);
});

Task.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Task", Task);