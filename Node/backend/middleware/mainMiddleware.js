const { userSchema } = require('../schemas/userSchema')
module.exports = {
    checkInputs: async (req, res, next)=>{
        const check = await userSchema.find({username: req.body.username})
        if (check.length >= 1) {
            if (check.length > 1) console.log('douplicate usernames in db. username ' + req.body.username)
            return res.send({error: 'username taken'})
        }
        if (!RegExp('^(?=.*?[A-Z])').test(req.body.username)) return res.send({error: `username must include a Capital letter`})
        if (req.body.username.length < 5) return res.send({error: 'username too short'})
        if (!(req.body.password.length <= 30)) return res.send({error: 'password too long'})
        if (!(req.body.password.length > 5)) return res.send({error: 'password too short'})
        next()
    },
    nftCheck: (req, res, next) => {
        if (!req.body.image) return res.send({error: 'url is empty'})
        if (!req.session.user) return res.send({error: 'please log in to upload NFTs'}) 
        next()
    }
}