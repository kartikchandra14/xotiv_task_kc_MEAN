const express = require('express');

const router = express.Router();
const { adminGuard } = require('../auth/aclService');
// const ContactService = require('./contactsService');
const CustomErrorService = require('../../../utils/customErrorService');

// const { ObjectID } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

const getMongoDBClient = require('../../../db/mongodbClient');
const config = require('config');

const url = config.db.url;
const mongoClient = require('mongodb').MongoClient;
    this.dbClient = getMongoDBClient();
    this.collection = 'contacts';

// const contactService = new ContactService();
router.get('/getContact', (req, res) => {
    mongoClient.connect(url, function(err,client){
        if(err){
            console.log('error ==>', err);
        }else{
            // console.log('connected to ==>', url);
            let db = client.db('bundle-node');
            // console.log('client.db ==>', db);
            var collection = db.collection('user');
            collection.find().toArray(function(err, resOfData){
                if(err){
                    // console.log('error in toArray() ==>',err);
                    res.sendStatus(403).send();
                }else if(resOfData.length){
                    console.log('response ==>', resOfData);
                    res.send(resOfData);
                }else{
                    // console.log('no result found', resOfData);
                    res.send();
                }
                client.close();
            });
        }
    }); 
    // contactService
    //   .list(req.query)
    //   .then(users => res.send(users));
  });
  
  router.put('/putContact/:contact_id', (req, res) => {
      const idToSearch= parseInt(req.params.contact_id);
      const name = req.body.name;
    // userService
    //   .editCurrentUser(req.body, req.user.id)
    //   .then(user => res.send(user))
    //   .catch(error => {
    //     if (error instanceof CustomErrorService) {
    //       res.status(error.metadata && error.metadata.error.code)
    //         .send(error);
    //     }
    //   });
    mongoClient.connect(url, function(err,client){
        if(err){
            console.log('error ==>', err);
        }else{
            // console.log('connected to ==>', url);
            let db = client.db('bundle-node');
            // console.log('client.db ==>', db);
            var collection = db.collection('user');
            console.log('params',idToSearch , req.params, typeof(parseInt(req.params.contact_id)), req.params.contact_id);
            collection.find({'user_id' : idToSearch }).toArray(function(err, resOfData){
                console.log('resOfData', resOfData)
                if(err){
                    console.log('error in toArray() ==>',err);
                    const errorData = {
                        error: {
                          code: 409,
                          message: 'id not exist please dont change user id',
                          type: 'exist',
                        },
                      };
                    res.sendStatus(403).send(errorData);
                }else if(resOfData.length){
                    console.log('response ==>', resOfData, req.body, idToSearch,  name);
                    if(idToSearch !== undefined && name !== undefined){

                        collection.updateOne({'user_id' : idToSearch }, { $set: req.body } , function (err, updatedRes){
                            console.log('updateResponse ===>', updatedRes);       
                            if(err){
                                console.error(err);
                                res.send(err);
                            }
                            const { matchedCount, modifiedCount } = updatedRes;
                            if(matchedCount && modifiedCount) {
                              console.log(`Successfully added a new review.`,matchedCount, modifiedCount)
                              res.send({  code: 204, field: 'updated', type: 'exist'});
                            }
                            else{
                                res.send({  code: 204, field: 'Not updated', type: 'exist'});
                            }
                        });
                    }
                }else{
                    console.log('no result found', resOfData);
                    res.send();
                }
                client.close();
            });
        }
    });
});

router.post('/postContact', (req, res) => {
    const idToSearch= parseInt(req.body.user_id);
    const name = req.body.name;
    mongoClient.connect(url, function(err,client){
        if(err){
            console.log('error ==>', err);
        }else{
            // console.log('connected to ==>', url);
            let db = client.db('bundle-node');
            // console.log('client.db ==>', db);
            var collection = db.collection('user');
            console.log('params', req.body);
            collection.find({'user_id' : idToSearch }).toArray(function(err, resOfData){
                console.log('resOfData', resOfData)
                if(err){
                    console.log('error in toArray() ==>',err);
                    const errorData = {
                        error: {
                          code: 409,
                          field: 'email not exist',
                          type: 'exist',
                        },
                      };
                    res.sendStatus(403).send(errorData);
                }else if(resOfData.length > 0){
                    console.log('response ==>', resOfData, req.body, idToSearch,  name);
                    res.send({code:200, message: 'already exist in db'});
                }else{
                    console.log('now insert only', resOfData);
                    // ---------------
            collection.insert( req.body  , function (err, createRes){
                console.log('updateResponse ===>', createRes);       
                if(err){
                    console.error(err);
                    res.send(err);
                }
                const { insertedCount } = createRes;
                if(insertedCount) {
                  console.log(`Successfully added a new data`,insertedCount);
                  res.send({  code: 201, field: 'created', type: 'exist'});
                }
                else{
                    res.send({  code: 204, field: 'Not created', type: 'exist'});
                }
            });
                }
                client.close();
            });
            
        }
    });
});

router.delete('/deleteContact/:contact_id', (req, res) => {

    const idToSearch= parseInt(req.params.contact_id);
    // userService
    //   .deleteUser(req.params.id)
    //   .then(() => res.send({ id: req.params.id }));
     mongoClient.connect(url, function(err,client){
      if(err){
          console.log('error ==>', err);
      }else{
          // console.log('connected to ==>', url);
          let db = client.db('bundle-node');
          // console.log('client.db ==>', db);
          var collection = db.collection('user');
          console.log('params',idToSearch , req.params, typeof(parseInt(req.params.contact_id)),);
          collection.find({'user_id' : idToSearch }).toArray(function(err, resOfData){
            //   console.log('resOfData', resOfData)
              if(err){
                  console.log('error in toArray() ==>',err);
                  const errorData = {
                      error: {
                        code: 409,
                        field: 'email not exist',
                        type: 'exist',
                      },
                    };
                  res.sendStatus(403).send(errorData);
              }else if(resOfData.length){
                  console.log('response ==>', resOfData, req.body, idToSearch);
                  if(idToSearch !== undefined){

                      collection.remove({'user_id' : idToSearch } , {justOne: true}, function (err, deleteRes){
                          console.log('deleteRes ===>', deleteRes);       
                          if(err){
                              console.error(err);
                              res.send(err);
                          }
                          if(deleteRes){
                            console.log(`Successfully deleted ${idToSearch}`);
                            res.send({  code: 202, field: 'deleted', type: 'exist'});
                          }
                          else{
                              res.send({  code: 204, field: 'Not deleted', type: 'exist'});
                          }
                      });
                  }
              }else{
                  console.log('no result found', resOfData);
                  res.send();
              }
              client.close();
          });
      }
  });
});

// router.get('/current', (req, res) => {
//   userService
//     .findById(req.user.id)
//     .then(user => res.send(user));
// });


// router.get('/:id', adminGuard, (req, res) => {
//   userService
//     .findById(req.params.id)
//     .then(user => res.send(user));
// });

// router.put('/:id', adminGuard, (req, res) => {
//   userService
//     .editUser(req.body, req.params.id)
//     .then(user => res.send(user))
//     .catch(error => {
//       if (error instanceof CustomErrorService) {
//         res.status(error.metadata && error.metadata.error.code)
//           .send(error);
//       }
//     });
// });

module.exports = router;
