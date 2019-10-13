const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/config');
const VerifyToken = require('../modules/VerifyToken');
const models  = require('../models');
const uuidv4 = require('uuid/v4');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/list', (req, res) => {
  models.Guest.findAndCountAll({
    include: [{
      model: models.Guesthistory,
    }]
  }).then( guests => {
      return res.status(200).send({"status": 200, "data": guests, "msg": "OK"})
    }).catch(err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": [], "msg": "Error Retrieving data.."})
    });
});

router.get('/listall', (req, res) => {
  models.Guest.findAll({
    include: [{
      model: models.Guesthistory
    }]
  }).then( guests => {
      return res.status(200).send({"status": 200, "data": guests, "msg": "OK"})
    }).catch(err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": [], "msg": "Error Retrieving data.."})
    });
});

router.get('/countsignedin', (req, res) => {
  models.Guesthistory.count({
  }).then( guesthistories => {
      return res.status(200).send({"status": 200, "data": guesthistories, "msg": "OK"})
    }).catch(err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": 0, "msg": "Error Retrieving data.."})
    });
});

router.get('/countguest', (req, res) => {
  models.Guest.count({
  }).then( guests => {
      return res.status(200).send({"status": 200, "data": guests, "msg": "OK"})
    }).catch(err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": 0, "msg": "Error Retrieving data.."})
    });
});

router.get('/random/:numrand/:updatedval', (req, res) => {
  models.Guest.findAll({ 
      order: sequelize.literal('rand()'), 
      limit: parseInt(req.params.numrand),
      include: [{
        model: models.Guesthistory, 
        required: true,
        where: {
          hasprize: 0
        }
      }],
    })
    .then( guests => {
      // update hasprize value
      sequelize.Promise.map(guests, (g) => {
        return g.Guesthistory.update({hasprize:req.params.updatedval})
      })
      return res.status(200).send({"status": 200, "data": guests, "msg": "OK"})      
    }).catch(err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": [], "msg": "Error Retrieving data.."})
    });
});

router.post('/revertrandom/:guestregnumber/:updatedval', (req, res) => {
  models.Guest.findAll({
      where: {
        regnumber: req.params.guestregnumber  
      },
      include: [{
        model: models.Guesthistory, 
        required: true
      }],
    })
    .then( guests => {
      // update hasprize value
      sequelize.Promise.map(guests, (g) => {
        return g.Guesthistory.update({hasprize:req.params.updatedval})
      })
      return res.status(200).send({"status": 200, "data": guests, "msg": "OK"})      
    }).catch(err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": [], "msg": "Error Retrieving data.."})
    });
});


router.post('/add', VerifyToken, (req, res) => {
  if (!req.body.code){
    gen_code = uuidv4();
  } else{
    gen_code = req.body.code;
  }

  models.Guest.create({
    name: req.body.name,
    shop_name: req.body.shop_name,
    num_invited: req.body.num_invited,
    city: req.body.city,
    code: gen_code,
    guesttype: req.body.guesttype,
    desknumber: req.body.desknumber,
    regnumber: req.body.regnumber
  }).then(result => {
    console.log(result);
    return res.status(200).send({"status": 200, "data": result, "msg": "OK"});
  }).catch(err => {
    console.log(err);
    return res.status(500).send({"status": 500, "data": [], "msg": "Error Sending Data.."});
  });
});


router.post('/addbulk', VerifyToken, (req, res) => {
  const listguest = req.body.data
  console.log(listguest)
  let complete_data = []
  listguest.forEach(eachguest => {
    if (!eachguest.code){
      gen_code = uuidv4();
    } else{
      gen_code = eachguest.code;
    }
    const each_data = {
      "name": eachguest.name,
      "shop_name": eachguest.shop_name,
      "num_invited": eachguest.num_invited,
      "city": eachguest.city,
      "code": gen_code,
      "guesttype": eachguest.guesttype,
      "desknumber": eachguest.desknumber,
      "regnumber": eachguest.regnumber
    }
    complete_data.push(each_data);
  });

  models.Guest.bulkCreate(complete_data).then(result => {
    console.log(result);
    return res.status(200).send({"status": 200, "data": result, "msg": "OK"});
  }).catch(err => {
    console.log(err);
    return res.status(500).send({"status": 500, "data": [], "msg": "Error Sending Data.."});
  });
  
});

router.get('/signin/:code', VerifyToken, (req, res) => {
  const req_code = req.params.code
  console.log(req_code)
  models.Guest.findOne({
    where: {code: req_code}
  }).then(result => {
    if (!result){
      throw new Error('no such user');
    }
    let gh = models.Guesthistory.build({
      checkin: sequelize.literal('CURRENT_TIMESTAMP')
    })
    gh.setGuest(result,  {save: false})
    gh.save().then( result2 => {
      return res.status(200).send({"status": 200, "data": result2, "guest": result, "msg": "OK"});
    }).catch(err2 => {
      console.log(err2)
      const data = {
        "id": "signedin"
      }
      return res.status(200).send({"status": 200, "data": data, "guest": result, "msg": "Error Saving Guest Checkin.."})
    })
  }).catch(err => {
    console.log(err)
    const data = {
      "id": "No Such User"
    }
    const guest = {
      "id": "No Such User",
      "name": "No Such User",
      "shop_name": "No Such User",
      "city": "No Such User",
      "num_invited": "No Such User",
      "num_reg": "No Such User"
    }

    return res.status(500).send({"status": 500, "data": data, "guest": guest, "msg": "Guest Not Found.."})
  });

  //console.log(guest)
  //return res.status(200).send({"status": 200, "data": uest, "msg": "OK"})

});



router.get('/directsignin/:code', (req, res) => {
  const req_code = req.params.code
  console.log(req_code)
  models.Guest.findOne({
    where: {code: req_code}
  }).then(result => {
    if (!result){
      throw new Error('no such user');
    }
    let gh = models.Guesthistory.build({
      checkin: sequelize.literal('CURRENT_TIMESTAMP')
    })
    gh.setGuest(result,  {save: false})
    gh.save().then( result2 => {
      return res.status(200).send({"status": 200, "data": result2, "guest": result, "msg": "OK"});
    }).catch(err2 => {
      console.log(err2)
      const data = {
        "id": "signedin"
      }
      return res.status(500).send({"status": 500, "data": data, "guest": result, "msg": "Error Saving Guest Checkin.."})
    })
  }).catch(err => {
    console.log(err)
    const data = {
      "id": "No Such User"
    }
    const guest = {
      "id": "No Such User",
      "name": "No Such User",
      "shop_name": "No Such User",
      "city": "No Such User",
      "num_invited": "No Such User",
      "num_reg": "No Such User"
    }

    return res.status(500).send({"status": 500, "data": data, "guest": guest, "msg": "Guest Not Found.."})
  });

  //console.log(guest)
  //return res.status(200).send({"status": 200, "data": uest, "msg": "OK"})

});

module.exports = router;
