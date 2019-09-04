const express = require('express');
const router = express.Router();
const passport  = require('passport');
const mongoose = require('mongoose');

const isEmpty= require('../../validator/is-empty');

const Shipments = require('../../models/Shipment');

const validateShipmentInput = require('../../validator/shipment');

router.get('/test',(req,res) => 
{
  res.json({msg:'shipment works'})
});


//create-shipment
router.post('/create-shipment', passport.authenticate('jwt', {session: false}), (req,res) => {

  const { errors, isValid } = validateShipmentInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Shipments.findOne({shipmentName: req.body.shipmentName})
    .then(shipment =>{
      if(shipment){
        return res.status(400).json({shipmentName:'Shipment already exists, use a unique name'});
      } 
      else{
        const newShipment = new Shipments({
          shipmentName: req.body.shipmentName,
          status: req.body.status
        });
        newShipment.save()
            .then(shipment => res.json(shipment))
            .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

//all api
router.get('/all', (req, res) => {
  const errors = {};

  Shipments.find()
    .then(allShipments => {
      if (!allShipments) {
        errors.worker = 'There are no Shipments';
        return res.status(404).json(errors);
      }

      res.json(allShipments);
    })
    .catch(err => res.status(404).json({ shipment: 'There are no Shipments' }));
});

//find by id
router.get('/id/:_id', (req, res) => {
  const errors = {};

  Shipments.findOne({ _id: req.params._id })
    
    .then(shipment => {
      if (!shipment) {
        errors.noshipment = 'There is no Shipment for this user';
        res.status(404).json(errors);
      }

      res.json(shipment);
    })
    .catch(err => res.status(404).json(err));
});

//delete shipment by ID
router.delete(
  '/id/:_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    {
    Shipments.findOneAndRemove({ _id: req.params._id }).then(
      
        res.json({ success: true })
      );
    }});


//update shipment
router.post('/update-shipment', passport.authenticate('jwt',{session:false}), (req,res) => {

  if(req.body.shipmentStatus.length < 5)
  {
    res.status(404).json({statusError:'shipment must be between 5 to 1500 characters'})
  }
  else{
  

  Shipments.findOne({_id: req.body.shipmentId })
    .then(oldshipment => {
      
 
      if(oldshipment.wait)
      {
        res.status(404).json({statusError: 'Cant be updated before the first update occur'});
        
      }
      else
      {
        Shipments.findOneAndUpdate(
          { _id: req.body.shipmentId },
        { $set: {wait: true } }
        ).then(shipmentWait1 => console.log('Waiting to update'));
        let count = Math.floor(Math.random() * 61);
        
        setTimeout(() => {
          Shipments.findOneAndUpdate(
            { _id: req.body.shipmentId },
          { $set: {wait: false , status:req.body.shipmentStatus} }
          ).then(shipmentWait2 => console.log('Updated'));
        }, count*1000);
        res.json({updateSuccessful:`Update successful! Will be updated after timeout of ${count} seconds`});
      }
    })
    .catch(err => console.log(err))
}});

//Get all the shipments
router.get('/', passport.authenticate('jwt',{session:false}), (req,res) => {
  const errors = {};  
  
  Shipments.find({workers: req.user.id })
    .then(shipments =>{
      if(!shipments){
        return res.json('No Shipments for this worker');
      }
      else{
        return res.json(shipments);
      }
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;