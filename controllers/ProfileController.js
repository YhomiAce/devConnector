const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getProfile = async (req, res)=>{
    try {
        const profile = await  Profile.findOne({user: req.user.id}).populate('users',['name, avatar']);
        if(!profile){
            return res.status(404).send({
                success: false,
                message: "Profile Not Found"
            });
        }
        return res.status(200).send({
            success: true,
            profile
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            success: false,
            message: 'Server Error'
        })
    }
}