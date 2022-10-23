const { MongoGridFSChunkError } = require("mongodb");
const { Thought, User} = require("../model");
module.exports={
    getAllThought(req,res){
        Thought.find({},(err,result)=>{
            if(result){
                res.status(200).json(result);
            }else{
                console.log("Error getting  thoughts");
                res.status(500).json({err:"Error getting thoughts"})
            }
        });
    },
    getSingleThoughts(req,res){
        Thought.findOne({_id:req.params.thoughtId}).populate({path:"reactions",select:"-__v",})
        .then((thought)=>!thought?res.status(404).json({message:"No thought with this Id"})
        :res.json(thought)
        ).catch((err)=>res.status(500).json(err));
    },
    createThought(req,res){
        Thought.create(req.body)
        .then((thought)=>{
            return User.findOneAndUpdate(
                {_id:req.body.userId},
                {$addToSet:{ thought:thought._id}},
                {new:true}
            );
        })
        .then((user)=>
        !user?res.status(404).json({
            message:"Thought created",
        })
        :res.json("Thought created")
        ).catch((err)=>res.status(500).json(err));
    },
    updateThought(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$set:req.body},
            {runValidators:true , new:true}
        )
        .then((thought)=>
        !thought? res.status(404).json({message:"No thought with this ID"})
        :res.json(thought)
        )
        .catch((err)=>res.status(500).json(err));
    },
    deleteThought(req,res){
        Thought.findOneAndRemove({_id:req.params.thoughtId})
        .then((thought)=>
        !thought
        ?res.status(404).json({message:"No thought found"})
        :res.json(thought)
        )
        .catch((err)=>res.status(500).json(err));
    },
    addReaction(req,res)
{
    Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$addToSet:{reactions:req.body}}
    )
    .then((thought)=>
    !thought
    ?res.status(404).json({message:"No thought found"})
    :res.json(thought)
    )
    .catch((err)=>res.status(500).json(err));
},
deleteReaction(req,res){
    Thought.findOneAndRemove({_id:req.params.thoughtId})
    .then((thought)=>
    !thought
    ?res.status(404).json({message:"No thought found"})
    :res.json(thought)
    )
    .catch((err)=>res.status(500).json(err));
},
};