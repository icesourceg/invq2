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
  let req_code = req.body.qrdata;
  const rest_url = config.api.guest_signin.url + "/" + req_code;
  console.log(rest_url);
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    console.log(body)
    let jsondata = JSON.parse(body)
    console.log(jsondata);
    console.log('sendsocket');
    if(!err && resp.statusCode == 200){
      let num_reg = jsondata.data.id
      jsondata.data.id = numpad(num_reg,4)
      io.emit('hi!', 'refreshsignedin');
      return res.render('signin', {data:jsondata,moment: moment});
    } else {
      return res.render('signin', {data:jsondata, moment: moment});
    }      
  });

  //return res.status(200).send({"status": 200, "data": rows})
  //return res.render('signin', {data: [], moment: moment});
});

router.get('/scan', (req, res) => {
  //return res.status(200).send({"status": 200, "data": rows})
  return res.render('scan', {data: []});
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
      'title': "DOORPRIZE 2gr EMAS",
      'rows': jsondata,
    };
    return res.render('doorprize1', {data: content, numpad :numpad});
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
      'title': "DOORPRIZE Voucher Hotel",
      'rows': jsondata,
    };
  return res.render('doorprize1', {data: content, numpad :numpad});
  });
});

router.get('/doorprize3', (req, res) => {
  const rest_url = config.api.doorprize3.url
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    console.log(jsondata)
    let content = {
      'title': "DOORPRIZE Voucher 500,000",
      'rows': jsondata,
    };
  return res.render('doorprize2', {data: content, numpad :numpad});
  });
});

router.get('/doorprize4', (req, res) => {
  const rest_url = config.api.doorprize4.url
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    console.log(jsondata)
    let content = {
      'title': "DOORPRIZE Voucher 1,000,000",
      'rows': jsondata,
    };
  return res.render('doorprize2', {data: content, numpad :numpad});
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
      return res.render('guestlist', {data:jsondata.data, 
                                  moment: moment, numpad :numpad});
    } else {
      return res.render('guestlist');
    }      
  });
});


router.get('/guestlistall', (req, res) => {
  return res.render('guestlist');
});


module.exports = router;
