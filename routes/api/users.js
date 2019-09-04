const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Shipments = require('../../models/Shipment');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport  = require('passport');

const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');

router.get('/test',(req,res) => 
{
  res.json({msg:'user works'})
});

//register api
router.post('/register', (req,res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({username: req.body.username})
    .then(user =>{
      if(user){
        return res.status(400).json({username:'Username already exists'});
      } 
      else{
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          type: req.body.type
        });
        bcrypt.genSalt(10, (err,salt) =>{
           bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err;
            newUser.password = hash;
            newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
           });
        });
      }
    });
});

//all api
router.get('/all', (req, res) => {
  const errors = {};

  User.find()
  .populate('shipments')
    .then(allWorkers => {
      if (!allWorkers) {
        errors.worker = 'There are no Workers';
        return res.status(404).json(errors);
      }

      res.json(allWorkers);
    })
    .catch(err => res.status(404).json({ profile: 'There are no Workers' }));
});

//find by handle
router.get('/id/:_id', (req, res) => {
  const errors = {};

  User.findOne({ _id: req.params._id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//delete user by ID
router.delete(
  '/id/:_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    {
    User.findOneAndRemove({ _id: req.params._id }).then(
      
        res.json({ success: true })
      );
    }});
  


//login api
router.post('/login', (req, res) =>
{
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username})
  .populate('shipments')
    .then(user =>{
      if(!user){
        errors.username = 'User not Found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password,user.password)
        .then(isMatch => {
          if(isMatch){
            //successful login
            const payload = {id: user.id, name: user.name, username: user.username, type: user.type, shipments: user.shipments}
            jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err,token) => {
              res.json({
                  success: true,
                  token: 'Bearer ' + token
                });  
            });
          }
          else{
            errors.password = 'Incorrect Password';
            return res.status(400).json(errors);
          }
        });
    });
});

//api/users/current
router.get('/current', passport.authenticate('jwt', {session: false}),(req,res) =>{
  res.json({
    id: req.user.id,
    name: req.user.name,
    username: req.user.username,
    type: req.user.type

   });
});



module.exports = router;