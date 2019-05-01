const router = require('express').Router();
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = {
  client: 'sqlite3', 
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true, 
  debug:true, 
}

const db = knex(knexConfig); 


router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err); 
    });
});

router.post('/', (req,res) => {

  db('zoos')
  .insert(req.body, 'id')
    .then(results => {
      res.status(200).json(results);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {

    db('zoos')
    .where({ id: req.params.id})
    .first()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(404).json({error: "a zoo with this id doesn't exist"})
    })
})

router.delete('/:id', (req,res) => {
  db('zoos')
  .where ('id', req.params.id)
  .first()
  .del()
  .then(deleted => {
    res.status(204).end()
})
.catch( err=>{
    res.status(404).json({error: 'a user with that id does not exist'})
})
})



router.put('/:id', (req,res) => {
  db('zoos')
    .where('id', req.params.id)
    .first()
    .update({name: req.body})
})
module.exports = router;