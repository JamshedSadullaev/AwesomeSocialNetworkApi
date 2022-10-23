const { User,Thought}= require("../model");
module.exports = {
    getUser(req,res){
        User.find({},(err,result)=>{
            if (result){
                res.status(200).json(result);
            }else{
                console.log("Error to get all users");
                res.status(500)
                .json({erro:"Error to get all users"});
            }
        });
    },
    singleUser(req,res){
        User.findOne({_id:req.params.userId})
        .populate({
            path:"thoughts",
            path:"friends",
            select:"-__v",
        })
        .then((user)=>
        !user
        ?res.status(404).json({message:"No user with this ID"})
        :res.json(user)
        )
        .catch((err)=>res.status(500).json(err));
    },
    newUser(req,res){
        User.create(req.body)
        .then((user)=>res.json(user))
        .catch((err)=>res.status(500).json(err));
    },
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set:req.body},
            {runValidators: true, new: true}
        )
        .then((user)=>
        !user?res.status(404).json({message:"Nothing found with this ID "})
        :res.json(user)
        )
        .catch((err)=>res.status(500).json(err));
    },
    deleteUser(req,res){
        User.findOneAndRemove({_id:req.params.userId})
        .then((user)=>
        !user
        ?res.status(404).json({message:"No user found"})
        :Thought.findOneAndUpdate(
            {userId:req.params.userId},
            {$pull:{thoughts:req.params.userId}},
            {new:true}
        )
        )
        .then((thought)=>
        !res.status(404).json({message:"User removed"})
        ).catch((err)=>res.status(500).json(err));
    },
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{friends:req.params.friendId}}
        ).then((user)=>
        !user?res.status(404).json({message:"No user found"})
        : res.json(user)
        ).catch((err)=>res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found " })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}