var express = require('express');
var router = express.Router();
var piblaster = require('pi-blaster.js');
var actions = new Array();
var drive = function(actions){
  var direction = actions.shift(); 
      switch(direction){
        case 'up':
          piblaster.setPwm(22, 1 );
          piblaster.setPwm(24, 1 );
          piblaster.setPwm(23, 0.7 );
          piblaster.setPwm(25, 0.69 );
          setTimeout(function(){
                  piblaster.setPwm(23, 0 );
                  piblaster.setPwm(25, 0 );
                  if(actions.length >0){
                    setTimeout(function(){drive(actions);} , 200);
                  }
          },600);
          break;
        case 'down':
          piblaster.setPwm(22, 0 );
          piblaster.setPwm(24, 0 );
          piblaster.setPwm(23, 0.7 );
          piblaster.setPwm(25, 0.69 );
          setTimeout(function(){
                  piblaster.setPwm(23, 0 );
                  piblaster.setPwm(25, 0 );
                  if(actions.length >0){
                    setTimeout(function(){drive(actions);} , 200);
                  }
          },600);
          break;
        case 'right':
          piblaster.setPwm(24, 0 );
          piblaster.setPwm(22, 1 );
          piblaster.setPwm(25, 0.34 );
          piblaster.setPwm(23, 0.34 );
          setTimeout(function(){
                  piblaster.setPwm(23, 0 );
                  piblaster.setPwm(25, 0 );
                  if(actions.length >0){
                    setTimeout(function(){drive(actions);} , 200);
                  }
          },300);
          break;
        case 'left':
          piblaster.setPwm(24, 1 );
          piblaster.setPwm(22, 0 );
          piblaster.setPwm(25, 0.34 );
          piblaster.setPwm(23, 0.34 );
          setTimeout(function(){
                  piblaster.setPwm(23, 0 );
                  piblaster.setPwm(25, 0 );
                  if(actions.length >0){
                    setTimeout(function(){drive(actions);} , 200);
                  }
          },300);
          break;
      }
}
router.post('/drive', function(req, res, next) {
  console.log(req.body);
  console.log('driving', req.body.direction);
  if(req.body.direction == 'start'){
    drive(actions);
  } else if (typeof req.body.direction != 'undefined') {
    actions = [req.body.direction];
    drive(actions);
  } else {
    actions = req.body;
    drive(actions);
  }
  res.send('');
});

module.exports = router;
