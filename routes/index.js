var express = require('express');
var router = express.Router();
var piblaster = require('pi-blaster.js');

router.post('/drive', function(req, res, next) {
  console.log('driving', req.body.direction);
  res.send('');
  switch(req.body.direction){
    case 'up':
piblaster.setPwm(22, 0 );
piblaster.setPwm(24, 0 );
piblaster.setPwm(23, 0.5 );
piblaster.setPwm(25, 0.5 );
setTimeout(function(){
        piblaster.setPwm(23, 0 );
        piblaster.setPwm(25, 0 );
},1000);
      break;

    case 'down':
piblaster.setPwm(22, 1 );
piblaster.setPwm(24, 1 );
piblaster.setPwm(23, 0.5 );
piblaster.setPwm(25, 0.5 );
setTimeout(function(){
        piblaster.setPwm(23, 0 );
        piblaster.setPwm(25, 0 );
},1000);
      break;
    case 'right':
piblaster.setPwm(22, 1 );
piblaster.setPwm(24, 0 );
piblaster.setPwm(23, 0.5 );
piblaster.setPwm(25, 0.5 );
setTimeout(function(){
        piblaster.setPwm(23, 0 );
        piblaster.setPwm(25, 0 );
},250);
      break;
    case 'left':
piblaster.setPwm(22, 0 );
piblaster.setPwm(24, 1 );
piblaster.setPwm(23, 0.5 );
piblaster.setPwm(25, 0.5 );
setTimeout(function(){
        piblaster.setPwm(23, 0 );
        piblaster.setPwm(25, 0 );
},250);
      break;
  }  
});

module.exports = router;
