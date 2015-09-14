var express = require('express');
var router = express.Router();
var Llama = require('../models/llamas.js')

//Get all llamas
router.get('/llamas', function(req, res, next){
  Llama.find({}, function(err, data){
    if(err){
        res.json({'message': err});
    } else{
      res.json(data);
    }
   });
});

//get one llama
router.get('/llama/:id', function(req, res, next) {
  Llama.findById(req.params.id, function(err, llama) {
    if (err) {
      res.json({'message': err});
    } else {
      res.json(llama)
    }
  })
});

//post llamas
router.post('/llamas', function(req, res, next) {
  // or var newLlama = new Llama(req.body);
  var newLlama = new Llama ({
    name: req.body.name,
    age: req.body.age,
    spitter: req.body.spitter
  });
  newLlama.save(function(err, llama) {
    if (err) {
      res.json({'message': err});
    } else {
      res.json(llama)
    }
  })
});


//update one llama
router.put('/llama/:id', function(req, res, next) {
  //*** reference mongoosejs.com/docs/api/html ***//
  //A.findByIdAndUpdate(id, update, options, callback) // executes
  //A.findByIdAndUpdate(id, update, options) // returns Query
  //A.findByIdAndUpdate(id, update, callback) // executes
  //adding {new:true} in the third passed agrument this will output the updates in the terminal instead of the original
    var options = {new: true};
  Llama.findByIdAndUpdate(req.params.id, req.body, options, function(err, llama) {
    if (err) {
      res.json({'message': err});
    } else {
      res.json(llama);
    }
  })
});

//delete one llama
router.delete('/llama/:id', function(req, res, next) {
  Llama.findByIdAndRemove(req.params.id, function(err, llama) {
     if (err) {
        res.json({'message': err});
      } else {
        res.json(llama)
      }
  })
});

module.exports = router;
