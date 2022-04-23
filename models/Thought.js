const { Schema, model } = require('mongoose');
const moment= require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        trim: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVAl => moment(createdAtVAl).format('MMM DD< YYYY [at] hh:mm a')
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);
const ThoughtSchema = newSchema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // getter code 
        get:(createdAtVAl) => moment(createdAtVAl).format('MMM DD,YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
        // user that created this thought. need to refernce the user model here probablynot sure
        ref:'User'
    },
    reactions: [ReactionSchema],
    

},
    {
        toJSON: {
            virtual: true,
            getters: true
        },
        id: false
    }
);
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length

});
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
