const isEmpty = require('../validator/is-empty');
const mongoose = require('mongoose');
const User = require('../models/User');
const Shipments = require('../models/Shipment');


module.exports = function assignShipment(data){
  let errors = {};

  //check shipment
  Shipments.findOne({_id: data.shipmentId})
    .then(shipment =>{
      if(shipment){
        //check if worker
        User.findOne({_id: data.userId})
    .then(user =>{
      if(user){

        if(user.type.localeCompare('worker') == 0)
        //assign-shipment, worker and shipment found
          {

            //for shipment to worker
            if(isEmpty(user.shipments))
            {
              user.shipments=shipment._id;
              user.save();
            }
            else{
              
              const workerArray=shipment.workers;
              workerArray.forEach(checkUser);
              function checkUser(value)
                 {
                 if(value.equals(user._id))
                 errors.DuplicateWorkerError = "This worker is already assigned to this shipment";
                 console.log(errors);
                 }
               }

               if(isEmpty(errors))
                {
                  shipment.workers.unshift(user._id);
                  shipment.save();
                }

                //for worker to shipment
            if(isEmpty(shipment.workers))
            {
              shipment.workers=user._id;
              shipment.save();
            }
            else
              {         
                const shipmentsArray=user.shipments;
                shipmentsArray.forEach(checkShipment);
                function checkShipment(value)
                  {
                   if(value.equals(shipment._id))
                   errors.DuplicateShipmentError = 'This shipment is already assigned to this worker';
                   
                  }
                }
            if(isEmpty(errors))
            {
                user.shipments.unshift(shipment._id);
                user.save();
            }
            
        }
        else
        errors.userNotWorker='User found but not a worker';
      } 
      else{
        errors.userNotFound='User not found';
      }
    })
    .catch(err => console.log(err));

      } 
      else{
        errors.shipmentNotFound="Shipment not found"
      }
      console.log(errors);
    })
    .catch(err => console.log(err));
  return{
    errors,
    isValid: isEmpty(errors)
  }
}