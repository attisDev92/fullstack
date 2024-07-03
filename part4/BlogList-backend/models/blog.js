const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,  
        minLength:3,
        required: true
    },
    author: {
        type: String,
        minLength:4,
        required: true
    },
    url: {
        type: String,
        minLength: 8,
        required:true
    },
    likes: {
        type: Number, 
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: {
        type: Array,
        default: [],
    }
    
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);
