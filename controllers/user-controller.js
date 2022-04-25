const { User } = require('../models');


const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });
    },
    // get user by ID with thoughts

    getUserById({params}, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },
    // update a user by id 
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json("No user with this id");
                    return;
                }
                res.json(dbUserData);
            }).catch(err => res.status(400).json(err));
    },
    // add a friend 
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        ).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json('No user found with this id');
                return;
            }
            res.json(dbUserData);
        })
            .catch(err => res.json(err))
    },
    // remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));


    },
// delete user by id 
deleteUserById({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json("no user found with this id!");
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
}
};
module.exports = userController;