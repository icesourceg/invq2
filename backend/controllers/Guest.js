const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const moment = require('moment');
const config = require('../config/config');
const model = require('../models');
const numpad = require('../modules/Numberpad');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/signedin', (req, res) => {
  let io = req.app.get('socketio');
  req_code = req.body.qrdata
  const rest_url = config.api.guest_signin.url + "/" + req_code 
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    console.log(jsondata)
    
    
    console.log('sendsocket');
    if(!err && resp.statusCode == 200){
      let num_reg = jsondata.data.id
      jsondata.data.id = numpad(num_reg,4)
      console.log(jsondata)
      io.emit('hi!', 'refreshsignedin');
      return res.render('signingold', {data:jsondata,moment: moment});
    } else {
      return res.render('signingold', {data:jsondata, moment: moment});
    }      
  });

  //return res.status(200).send({"status": 200, "data": rows})
  //return res.render('signin', {data: [], moment: moment});
});

router.get('/scan', (req, res) => {
  //return res.status(200).send({"status": 200, "data": rows})
  return res.render('scangold', {data: []});
});


router.get('/doorprize1', (req, res) => {
  //return res.status(200).send({"status": 200, "data": rows})
  const rest_url = config.api.doorprize1.url
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    console.log(jsondata)
    let content = {
      'title': "DOORPRIZE 5gr EMAS",
      'rows': jsondata,
    };
    return res.render('doorprizegold', {data: content, numpad :numpad});
  });
});

router.get('/doorprize2', (req, res) => {
  const rest_url = config.api.doorprize2.url
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    console.log(jsondata)
    let content = {
      'title': "DOORPRIZE 10gr EMAS",
      'rows': jsondata,
    };
  return res.render('doorprize2gold', {data: content, numpad :numpad});
  });
});


router.get('/grandprize', (req, res) => {
  const rest_url = config.api.grandprize.url
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    console.log(jsondata)
    let content = {
      'title': "GRANDPRIZE 25gr EMAS",
      'rows': jsondata,
    };
  return res.render('grandprizegold', {data: content, numpad :numpad});
  });
  // let content = {
  //   'title': "GRANDPRIZE 25gr EMAS",
  //   'rows': [],
  // };
  // return res.render('grandprize', {data: content, numpad :numpad});
});


router.get('/guestlist', (req, res) => {
  request.get({
    method: 'GET',
    uri: config.api.guest_history.url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    if(!err && resp.statusCode == 200){
      return res.render('guest2gold', {data:jsondata.data, 
                                  moment: moment, numpad :numpad});
    } else {
      return res.render('guest2gold');
    }      
  });
});


router.get('/guestlistall', (req, res) => {
  return res.render('guest2gold');
});

// router.get('/downloadcsv', (req, res) => {
//   request.get({
//     method: 'GET',
//     uri: config.api.guest_history.url,
//     headers: {'x-access-token': config.api.guest_history.token}
//   }, (err, resp, body) => {
//     let jsondata = JSON.parse(body)
//     if(!err && resp.statusCode == 200){
//       return res.render('guest', {data:jsondata.data, 
//                                   moment: moment});
//     } else {
//       return res.render('guesterr');
//     }      
//   });
// });

module.exports = router;
