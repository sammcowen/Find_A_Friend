const {Schema, model} = require('mongoose');
const ThoughtSchema = newSchema({
    thoughtText:{
        type:String,
        required:true,
        minLength:1,
        maxLength:280
    },
    createdAt:{
        type:Date,
        default:Date.now,
        // getter code figure out later
    },
    username:{
        type:String,
        required:true,
        // user that created this thought. need to refernce the user model here probablynot sure
    },
    reactions: []
        // code will go here

    },
    {
        toJSON: {
            virtual:true,
            getters:true
        },
        id:false
    }
);
    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length
    
});
 const Thought = model('Thought', ThoughtSchema);

 module.exports = Thought;
