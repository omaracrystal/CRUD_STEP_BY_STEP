# CRUD APP STEPS

## Project Structure
1. yo galvanize-express
2. npm install
3. npm mongoose --save
4. npm dotenv --save
5. go into app.js and put at the top = 
```
var dotenv = require('dotenv');
dotenv.load();
```
6. place ``.env`` at the bottom of .gitignore file
7. ``touch .env`` in the route directory
8. Just double check to make sure package.json has all those saved
        {
          "name": "_example",
          "version": "0.0.0",
          "private": true,
          "scripts": {
            "start": "node ./server/bin/www"
          },
          "dependencies": {
            "body-parser": "~1.13.2",
            "cookie-parser": "~1.3.5",
            "debug": "~2.2.0",
            "dotenv": "^1.2.0",
            "express": "~4.13.1",
            "mongoose": "^4.1.7",
            "morgan": "~1.6.1",
            "serve-favicon": "~2.3.0",
            "swig": "^1.4.2"
          }
        }
9. commit -m "initial commit"

## Create Schema and connect Mongoose to .env and models
1. Create Schema in ``models`` folder under ``server`` directory... lets call it ``llama.js``
2. On top put 
``var mongoose = require('mongoose');``
``var Schema = mongoose.Schema;``
3. Set up schema and structure in llamas.js
```
var Llama = new Schema({
    name: String,
    age: Number,
    spitter: Boolean
});

//pull info from .env file
mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose.model("llamas", Llama) || 'mongodb://localhost/...'
```
4. In the .env file place ``MONGO_URI=mogodb://localhost/llama`` on top... and pull the mongoose.connect to that file by writing ``process.env.MONGO_URI`` 

## Make Routes
1. create ``api.js`` within route folder
2. add this to the ``api.js`` file (same as index.js) starting point
```
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```
3. Pull in Schema on top of api.js
``var Llama = require('../models/llama.js')``
4. Update api.js
```
var Llama = require('../models/llama.js')
var express = require('express');
var router = express.Router();

//get all llamas
router.get('/llamas', function(req, res, next) {
  
});

//post llama
router.post('/llamas', function(req, res, next) {
  
});

//get one llamas
router.get('/llama/:id', function(req, res, next) {
  
});

//update one llamas
router.update('/llama/:id', function(req, res, next) {
  
});

//delete one llamas
router.delete('/llama/:id', function(req, res, next) {
  
});

module.exports = router;
```
5. Let app.js that we need to connect to these routes (if all routes are in index then we don't need to add ``app.use('/api', llamas))``
Add a new variable to //** routes **// section
```
var routes = require('./routes/index.js');
var llams = require('./routes/llamas.js')

// ** main routes ** //
app.use('/', routes);
app.use('/api/', llamas)
```

## TESTING
6. Test in terminal or go to local host in url
``sudo mongod`` in one terminal 
``nodemon`` in second terminal
7. Testing GET route ``http GET http://localhost:3000/api/llamas``
8. Complete Post now:
 - add new instance of the Schema within the post router and save it function
 ```
 //post llama
router.post('/llamas', function(req, res, next) {
    //or just write : // or var newLlama = new Llama(req.body);
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
 ```
- now test POST route in terminal:
``http POST http://localhost:3000/api/llamas name="Tina" age=12 spitter=true``
or 
``http POST -f http://localhost:3000/api/llamas name="Tina" age=12 spitter=true``
or
``http POST --form http://localhost:3000/api/llamas name="Tina" age=12 spitter=true``
9. set up router.get - mongoose find function ``(return res.json(llamas))``
```
router.get('/llamas', function(req, res, next) {
    Llama.find(function(err, llamas) {
        if (err) {
            res.json({'message': err});
        } else {
            res.json(llamas)
        }
    })
});
```
10. Hepful resource :  mongoosejs.com/docs/api.html 
11. Add get one llama
```
//get one llamas
router.get('/llama/:id', function(req, res, next) {
  Llama.findById(req.params.id, function(err, llama) {
    if (err) {
      res.json({'message': err});
    } else {
      res.json(llama)
    }
  })
});
```
**TESTING**
``http GET http://localhost:3000/api/llama/id#``
12. Setting up PUT Route
```
//update one llamas
router.put('/llama/:id', function(req, res, next) {
  //*** reference mongoosejs.com/docs/api/html ***//
    var options = {new: true};
  Llama.findByIdAndUpdate(req.params.id, req.body, options, function(err, llama) {
    if (err) {
      res.json({'message': err});
    } else {
      res.json(llama);
    }
  })
});
```
**TESTING**
``http PUT http://localhost:3000/api/llama/id# changes=change``
13. Setting up DELETE Route
```
//delete one llama
router.delete('/llama/:id', function(req, res, next) {
  Llama.findByIdAndRemove(req.params.id, fucntion(err, llama) {
     if (err) {
        res.json({'message': err});
      } else {
        res.json(llama)
      }
  })
});
```
**TESTING**
``http DELETE http://localhost:3000/api/llama/id#``












