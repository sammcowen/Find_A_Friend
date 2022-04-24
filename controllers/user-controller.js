const { User } = require('../models/User');

const userController = {
    // get all users
    // getAllUsers(req, res) {
    //     User.find({})
    //         .populate({
    //             path: 'thoughts',
    //             select: '-__v'
    //         })
    //         .select('-__v')
    //         .then(dbUserData => res.json(dbUserData))
    //         .catch(err => {
    //             console.log(err)
    //             res.status(500).json(err)
    //         });
    // },
    // // get user by ID with thoughts

    // getUserById(req, res) {
    //     User.findOne({ _id: params.id })
    //         .populate({
    //             path: 'thoughts',
    //             select: '-__v'
    //         })
    //         .populate({
    //             path: 'friends',
    //             select: '-__v'
    //         })
    //         .select('-__v')
    //         .then(dbUserData => res.json(dbUserData))
    //         .catch(err => {
    //             console.log(err)
    //             res.status(500).json(err)
    //         });
    // },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    }
};
module.exports=userController;