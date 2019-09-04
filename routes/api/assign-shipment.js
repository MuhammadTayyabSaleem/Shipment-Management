const express = require('express');
const router = express.Router();
const passport  = require('passport');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Shipments = require('../../models/Shipment');
const isEmpty = require('../../validator/is-empty');


router.get('/test',(req,res) => 
{
  res.json({msg:'user works'})
});

// gets shipmentId and userId
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {
  var errors={};
  var flag=1;
  var flag2=1;
  if(req.body.shipmentId.length<24)
  {
    res.status(404).json({shipmentError:'Shipment id must be of 24 characters',workerError:' User id must be of 24 characters'})
  }
  
  else if(req.body.userId.length<24)
  {
    res.status(404).json({workerError:' User id must be of 24 characters'})
  }
  else{
  //check shipment
  Shipments.findOne({_id: req.body.shipmentId})
    .then(shipment =>{
      if(shipment){
        //check if worker
        User.findOne({_id: req.body.userId})
    .then(user =>{
      if(user){

        if(user.type.localeCompare('worker') == 0)
        //assign-shipment, worker and shipment found
          {

            //for shipment to (worker.shipment)
            if(isEmpty(user.shipments))
            {
              user.shipments=shipment._id;
              user.save();
              console.log('user.s wass empty');
              flag=0;
            }
            else{
              
              const workerArray=user.shipments;
              workerArray.forEach(checkUser);
              function checkUser(value)
                 {
                 if(value.equals(shipment._id)){
                 errors.workerError = "This worker is already assigned to this shipment";
                
                }
                 }
               }

               if(isEmpty(errors) && flag == 1)
                {
                  user.shipments.unshift(shipment._id);
                  user.save();
                 
                  
                }

                //for worker to (shipment.worker)
            if(isEmpty(shipment.workers))
            {
              shipment.workers=user._id;
              shipment.save();
              
              flag2=0;
              return res.json({sucess:'done'});
            }
            else
              {         
                const shipmentsArray=shipment.workers;
                shipmentsArray.forEach(checkShipment);
                function checkShipment(value)
                  {
                   if(value.equals(user._id)){
                   errors.shipmentError = 'This shipment is already assigned to this worker';
                   console.log(value);
                   return res.status(404).json(errors);}
                  }
                }

            if(isEmpty(errors) && flag2==1)
            {
                shipment.workers.unshift(user._id);
                shipment.save();
                console.log('u.s saved in array');
                return res.json({sucess:'done'});
            }
            
        }
        else{
          return res.status(404).json({workerError:'User found but not a worker'});
        
      }
      } 
      else{
        return res.json({workerError:'User not found'});
        
      }
    })
    .catch(err => console.log(err));

      } 
      else{
        return res.status(404).json({shipmentError:"Shipment not found"});
        
      }
    })
    .catch(err => console.log(err));
    
  }}
);

  

module.exports = router;