# CRUD APP STEPS

## Project Structure
1. ``yo galvanize-express``
2. ``npm install``
3. ``npm mongoose --save``
4. ``npm dotenv --save``

5. go into app.js and put at the top = 
```
var dotenv = require('dotenv');
dotenv.load();
```

6. place ``.env`` at the bottom of ``.gitignore`` file

7. ``touch .env`` in the route directory

8. Just double check to make sure ``package.json`` has all those saved
```
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
```
9. commit!

## Create Schema and connect Mongoose to .env and models
1. Create Schema in ``models`` folder under ``server`` directory... lets call it ``llama.js``

2. On top of ``llama.js``:
```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
```

3. Now set up schema and its structure in ``llamas.js``:
```
var Llama = new Schema({
    name: String,
    age: Number,
    spitter: Boolean
});

//pull info from .env file
mongoose.connect(process.env.MONGO_URI); //|| 'mongodb://localhost/...'

module.exports = mongoose.model("llamas", Llama)
```

4. In the ``.env`` file place ``MONGO_URI=mongodb://localhost/llamas`` on top... now grab it in ``llamas.js`` file by using ``mongoose.connect`` to pull that saved URI by writing: ``process.env.MONGO_URI`` 

## Set up Routes
1. create ``api.js`` within route folder

2. add this to the ``api.js`` file (same as ``index.js``) starting point
```
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

3. Pull in **Schema** on top of ``api.js``
``var Llama = require('../models/llama.js')``

4. Update ``api.js``
```
var express = require('express');
var router = express.Router();
var Llama = require('../models/llamas.js')

//get all llamas
router.get('/llamas', function(req, res, next) {
  res.send("hello");
});

//get one llamas
router.get('/llama/:id', function(req, res, next) {
});

//post llamas
router.post('/llamas', function(req, res, next) {
});

//update one llama
router.put('/llama/:id', function(req, res, next) {
});

//delete one llama
router.delete('/llama/:id', function(req, res, next) {
});

module.exports = router;
```

5. Let's tell ``app.js`` that we need to connect to these routes (if all routes are in index then we don't need to add ``app.use('/api', llamas)``)
Go into ``app.js`` and add to the routes sections:
```
//** routes **//
var routes = require('./routes/index.js');
var llams = require('./routes/llamas.js')

// ** main routes ** //
app.use('/', routes);
app.use('/api/', llamas)
```

## TESTING and updating Routes
1. Test in terminal or go to local host url in browser
``sudo mongod`` in second terminal 
``nodemon`` in third terminal

2. **Testing** in terminal the **GET router** ``http GET http://localhost:3000/api/llamas``

3. Set up **POST router** now:
 - add new instance of the Schema within the post router and save it function
 ```
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
      res.json(llama) //data can be named anything
    }
  })
});
 ```
**Testing POST router** in terminal:
```
http POST http://localhost:3000/api/llamas name="Tina" age=12 spitter=true``
or
http POST -f http://localhost:3000/api/llamas name="Tina" age=12 spitter=true``
or
http POST --form http://localhost:3000/api/llamas name="Tina" age=12 spitter=true``
```

9. Now update **GET aLL router** 
    - mongoose find function
```
router.get('/llamas', function(req, res, next) {
    Llama.find(function(err, llamas) {
        if (err) {
            res.json({'message': err});
        } else {
            res.json(llamas); //data can be named anything
        }
    })
});
```
**TESTING GET all router** in terminal:
``http GET http://localhost:3000/api/llamas``

10. Helpful resource : [mongoosejs.com/docs/api.html](mongoosejs.com/docs/api.html)

11. Set up **GET one router** 
```
//get one llama
router.get('/llama/:id', function(req, res, next) {
  Llama.findById(req.params.id, function(err, llama) {
    if (err) {
      res.json({'message': err});
    } else {
      res.json(llama);
    }
  })
});
```
**TESTING GET one router** in terminal:
``http GET http://localhost:3000/api/llama/id#``

12. Set up **PUT router** 
```
//update one llama
router.put('/llama/:id', function(req, res, next) {
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
```
**TESTING PUT router** in terminal:
``http PUT http://localhost:3000/api/llama/id# changes=change``

13. Setting up **DELETE router**
```
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
```
**TESTING DELETE router** in terminal:
``http DELETE http://localhost:3000/api/llama/id#``

# Set up View
1. Create Form, Table, whatever in ``index.html`` (or create a new html file) under ``views`` on the server side
2. Set up **ids** to each area of the form so that it points to each property of the **schema**
3. We are going to use **JSON** to auto populate all llamas below the form and so we attach the ``id="all-lamas"`` to a seperate div, table, whatever below the input form
4. Under client side in the ``main.js`` file add a ``payload`` to the "submit" form function. Then run tests throughout...
```
$('form').on('submit', function(e){
    e.preventDefault();
    var payload = {
        name: $('#name').val(),
        age: $('#age').val(),
        spitter: $('#spitter').val()
    };

    if($('#spitter').is(:'checked')){
        payload.spitter = true;
    } else {
            payload.spitter = false
        }
    console.log(payload) //test here or httpie

    $.post('/api/llamas', payload, function(data){
        $('.message-section').show(); //bootstrap alert alert-success, and on client side, set css display: none
        console.log(data); //test here or httpie < should have Id now
        $('#message').html('Llama has been added!');

        //populate the table from function below
        getLlamas();
    });
})
```

5. Define a function outside of submit so that it will append the llamas
    - don't forget to call function in **document.ready** to pre-load the data
```
function getLlamas(){
    //target table and clear out fields
    $('#all-llamas').html('');

    //inside ajax and iterate over all the data (all the llamas)
    $.get('/api/llams', function(data) {
        //test = console.log(data)-- don't forget to call function
        for (var i=0; i < data.length; i++) {
            $('#all-llamas').append(
                  '<tr><td>' + data[i].name + '</td><td>' + data[i].age + '</td><td>' + data[i].spitter + '</td></tr>'
            );
        }
        //clear out form and checkbox area
        $('form input').val('');
        $('#spitter').removeAttr('checked');
    });
}
```

# THE END!








