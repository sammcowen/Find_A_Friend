const { Schema, model} = require('mongoose');

const UserSchema = new Schema ({
username: {
    type:String,
    unique:true, 
    required:true, 
    trimmed:true
},
email: {
    type:String,
    required:true,
    unique:true,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],

    
},
// thoughts: [
//     {
//         type:Schema.Types.ObjectId,
//         ref:'Thought'
//     }
// ],
// friends: [
//     {
//         type:Schema.Types.ObjectId,
//         ref:'User'
//     }
// ]
},
{
    toJSON: {
        virtual:true
    },
    id:false
}
);
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;