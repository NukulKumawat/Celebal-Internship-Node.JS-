const express=require('express')
const router= express.Router();
const User=require('../models/user.models')

router.post('/',async(req,res)=>{
    try {
        const user=new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);   
        console.log(error.message);
    }
})



router.get('/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(404).send();
        }

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send(error);
        console.log(error.message);
    }
})

router.get('/',async(req,res)=>{
    try {
        User.find({}).then(function(users){
            res.json(users)
        })

    } catch (error) {
        res.status(500).send(error);
        console.log(error.message);
    }
})



router.patch('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  module.exports = router;
