const express = require('express')
const router = express.Router()
const todos = require('../models/todos') 

router.get('/', (req, res, next) => {    
    const index = './views/todos/index.pug'
    const render = pug.compileFile(index)
  
    if(res.get('Accept') === 'application/json')
      res.type('json')
    else
      res.type('html')
  
    todos.findAll().then( (result) =>
    res.format({
      html: () => {
        const html = render({
          title: 'todos',
          todos: result
        });
        res.writeHead(200, { 'Content-Type': 'text/html' } )
        res.write(html)
        res.end()},
      json: (result) => { res.json(result) }
    }))
})

router.post('/', (req, res, next) => {
      
    if(res.get('Accept') === 'application/json')
      res.type('json')
    else
      res.type('html')

    todos.create({
        message: req.body.message,
        completion: false,
        createdAt: new Date()
      }).then( () =>
      res.format({
        html: () => {
          res.redirect('/todos') },
        json: () => { res.send({ message: 'Todo succefully added !' }) }
      })
    )
})

router.get('/:todoId', (req, res, next) => {
    const index = './views/todos/show.pug'
    const render = pug.compileFile(index)
  
    if(res.get('Accept') === 'application/json')
      res.type('json')
    else
      res.type('html')
  
    todos.find({
      where: {
        id: req.params.todoId
      }
    }).then( (result) =>
    res.format({
      html: () => {
        const html = render({
          title: 'show',
          resultMessage: result.message,
          resultCompletion: result.completion,
          resultDateCreated: result.createdAt,
          resultDateUpdated: result.updateddAt,
        });
  
        res.writeHead(200, { 'Content-Type': 'text/html' } );
        res.write(html);
        res.end();},
      json: (result) => { res.json(result) }
    })
    );
})

router.delete('/:todoId', (req, res, next) => {

    if(res.get('Accept') === 'application/json')
      res.type('json')
    else 
      res.type('html')
  
    todos.destroy({
      where: {
        id: req.params.todoId
      }
    }).then(()=>
    res.format({
      html: () => {
        res.redirect('/todos'); },
      json: () => { res.send({ message: 'Todo successfully deleted !' }) }
    })
    )
})

router.patch('/:todoId',  (req, res,next) => {

    if(res.get('Accept') === 'application/json')
        res.type('json')
    else
        res.type('html')
       
      todos.update(
      {
        message: req.body.message,
        completion: req.body.completion
      },
      {
        where: {
          id: req.params.todoId
        }
      }
      ).then(()=>
      res.format({
        html: () => {
          res.redirect('/todos'); },
        json: () => { res.send({ message: 'Todo successfullu edited !' }) }
      }));
});

module.exports = router