const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    DeleteUserById,
    // addFriend,
    // removeFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
router
    .route('/:id')
    .get(getUserById)
   .put(updateUserById)
   .delete(DeleteUserById)

   router
//    .route('/:userId/friends/:friendId')
//    .post(addFriend)
//    .delete(removeFriend)

   module.exports = router;
