const mongoose = require('mongoose')
// const { nftSchema } = require('./nftSchema')
const Schema = mongoose.Schema

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

const nftSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})
const offerSchema = new Schema({
    iget: {
        type: [nftSchema],
        required: true
    },
    youget: {
        type: [nftSchema],
        required: true
    },
    madeToID: {
        type: String,
        required: true
    },
    madeToName: {
        type: String,
        required: true
    },
    madeByID: {
        type: String,
        required: true
    },
    madeByName: {
        type: String,
        required: true
    }
})

module.exports = {
    offerSchema: mongoose.model('offer', offerSchema)
}