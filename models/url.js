const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema( 
    {
        originalUrl: {
            type: String,
            required: true,
        },
        shortenedUrl: {
            type: String,
            required: true,
            unique: true
        },
        visited: [
            {
                timestamp: { type: Number }
            }
        ]
    },
    {
        timestamp: true
    }
)

const urlModel = mongoose.model("shortUrls", urlSchema);

module.exports = urlModel;