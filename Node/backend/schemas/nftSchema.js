const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = {
    nftSchema: mongoose.model('nft', nftSchema)
}