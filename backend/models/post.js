const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    username:{
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'Name cannot exceed 100 characters']
    },

    title: {
        type: String,
        required: [true, 'Please enter title'],
        trim: true,
        maxLength: [100, 'Title cannot exceed 100 characters']
    },

    content: {
        type: String,
        required: [true, 'Please enter content'],
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);