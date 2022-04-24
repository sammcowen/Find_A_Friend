const {Thought, User} = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req,res){
        Thought.find({})
        .populate({
            path:'user',
            seelct:'-__v'
        })
        .select('-__v')
        .sort({_id:-1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
    },
    // get one thought by id 
    getThoughtById({params}, res) {
        Thought.findOne({_id:params.id})
        .populate({
            path:'user',
            select:'-__v'
        })
        .select('-__v')
        // .sort({_id:-1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    // create  a thought 
    createNewThought({params,body},res){
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {username:body.username},
                {$push:{ thoughts: _id}},
                {new:true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message:'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // add a reaction 
    addReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$push: {reactions: body}},
            {new:true, runValidators:true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message:"no thought with this id!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // delete a reaction 
    deleteReactionById({params}, res) {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$pull: {reactions: {reactionId:params.reactionId}}},
            {new:true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    // update a thought by id
    updateThoughtById({params,body},res) {
        Thought.findOneAndUpdate(
            {_id:params.id},
            bnody, 
            {new:true, runValidators:true}
        )
        .then(updatedThought => {
            if(!updatedThought) {
                return res.status(404).json({message:'No thought with this id '});
            }
            res.json(updatedThought);
        })
        .catch(err =>res.json(err));
    },

    // delete  thought by id
    deleteThoughtById({params,body},res) {
        Thought.findOneAndDelete({_id:params.id})
        .then(deletedThought => {
            if(!deletedThought) {
                return res.status(404).json({message:"No thought with this id!"})
            }
            res.json(deletedThought);
        }) 
        .catch(err => res.json(err));
    }
};
module.exports = thoughtController;