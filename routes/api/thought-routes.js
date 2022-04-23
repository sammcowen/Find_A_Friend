const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createNewThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReactionById
} = require('../../controllers/thought-controller');

router.route('/')
.get(getAllThoughts)
.post(createNewThought)

router
.route('/:id')
.get(getThoughtById)
.put(updateThoughtById)
.delete(deleteThoughtById)

router 
.route('/:thoughtId/reactions')
.post(createReaction)

router
.route('./thoughtId:reactionId')
.delete(deleteReactionById)

module.exports=router;