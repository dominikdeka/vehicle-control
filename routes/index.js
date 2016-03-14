var express = require('express');
var router = express.Router();
var piblaster = require('pi-blaster.js');
var actions = new Array();
var drive = function(actions){
  var direction = actions.shift(); 
      switch(direction){
        case 'up':
          piblaster.setPwm(22, 0 );
          piblaster.setPwm(24, 0 );
          piblaster.setPwm(23, 0.5 );
          piblaster.setPwm(25, 0.51 );
          setTimeout(function(){
                  piblaster.setPwm(23, 0 );
                  piblaster.setPwm(25, 0 );
                  if(actions.length >0){
                    setTimeout(function(){drive(actions);} , 200);
                  }
          },1500);
          break;
        case 'down':
          piblaster.setPwm(22, 1 );
          piblaster.setPwm(24, 1 );
          piblaster.setPwm(23, 0.5 );
          piblaster.setPwm(25, 0.5 );
          setTimeout(function(){
                  piblaster.setPwm(23, 0 );
                  piblaster.setPwm(25, 0 );
                  if(actions.length >0){
                    setTimeout(function(){drive(actions);} , 200);
                  }
          },1500);
          break;
        case 'right':
//          piblaster.setPwm(22, 1 );
          piblaster.setPwm(24, 0 );
          //piblaster.setPwm(23, 0.5 );
          piblaster.setPwm(25, 0.5 );
          setTimeout(function(){
                  piblaster.setPwm(23, 0 );
                  piblaster.setPwm(25, 0 );
                  if(actions.length >0){
                    setTimeout(function(){drive(actions);} , 200);
                  }
          },750);
          break;
        case 'left':
          piblaster.setPwm(22, 0 );
//          piblaster.setPwm(24, 1 );
          piblaster.setPwm(23, 0.5 );
//          piblaster.setPwm(25, 0.5 );
          setTimeout(function(){
                  piblaster.setPwm(23, 0 );
                  piblaster.setPwm(25, 0 );
                  if(actions.length >0){
                    setTimeout(function(){drive(actions);} , 200);
                  }
          },750);
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
