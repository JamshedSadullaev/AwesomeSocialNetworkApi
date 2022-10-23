const {Schema,model, Types}= require("mongoose");
const moment = require('moment');
const { moveMessagePortToContext } = require("worker_threads");
const reactionSchema = new Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default:()=>new Types.ObjectId(),
    },
    reactionBody:{
        type:String,
        required:true,
        maxlength:280
    },
    username:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get:(createdAtVal) => moment (createdAtVal).format ("MMM DD, YYYY [at] hh:mm a")
    },

});
const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            minlength:1,
            maxlength:280
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get:(createdAtVal) => moment (createdAtVal).format ("MMM DD, YYYY [at] hh:mm a")
        },
        usernma:{
            type:String,
            required:true
        },
        reactions:[reactionSchema],
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        },
        id:false
    }
    
    );
    ThoughtSchema.virtuals("reactionCount").get(function(){
        return this.reactions.length;
    });
    const Thought = model("Thoughts",ThoughtSchema);
    module.exports =Thought;