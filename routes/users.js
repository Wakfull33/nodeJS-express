const express = require('express')
const router = express.Router()
const pug = require('pug')
const users = require("../models/users")
const session = require('express-session')

router.post('/', (req, res, next) => {

  if(res.get('Accept') === 'application/json')
    res.type('json')
  else
    res.type('html')

    users.create({
      nom: req.body.nom,
      password: hash,
      createdAt: new Date()
    }).then( () =>
    res.format({
      html: () => {
        res.redirect('/users') },
      json: () => { res.send({ message: 'User successfully added !' }) }
    })
    );
});

router.get('/', (req, res, next) => {
  const index = './views/users/index.pug';
  const render = pug.compileFile(index);

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else{
    res.type('html');
  }

  users.findAll().then( (result) =>
  res.format({
    html: () => {
      const html = render({
        title: 'Users',
        users: result
      });
      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html);
      res.end();},
    json: (result) => { res.json(result) }
  }));

});

router.post('/login', (req, res, next) => {
    // TO DO
});

router.get('/login', (req, res, next) => {
  const index = './views/users/login.pug';
  const render = pug.compileFile(index);

  if(res.get('Accept') === 'application/json')
    res.type('json')
  else
    res.type('html')
  
  res.format({
    html: () => {
      const html = render({
        title: 'Login',
      });

      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html);
      res.end();},
    json: (result) => { res.json(result) }
  })

});

router.get('/add', (req, res, next) => {
  const index = './views/addUser.pug';
  const render = pug.compileFile(render);
  const html = render({
    title: 'add'
  });

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  res.format({
    html: () => {
      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html); },
    json: (result) => { res.json(result) }
  });

  res.end();
});

router.get('/:userId', (req, res, next) => {
  const index = './views/users/show.pug';
  const render = pug.compileFile(index);

  if(res.get('Accept') === 'application/json')
    res.type('json')
  else 
    res.type('html')

  users.find({
    where: {
      id: req.params.userId
    }
  }).then( (result) =>
  res.format({
    html: () => {
      const html = render({
        title: 'show',
        resultName: result.nom,
        resultDateCreated: result.createdAt,
        resultDateUpdated: result.updateddAt,
      });

      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html);
      res.end();},
    json: (result) => { res.json(result) }
  })
  );
});


router.delete('/:userId', (req, res, next) => {

  if(res.get('Accept') === 'application/json'){
    res.type('json');
  }else {
    res.type('html');
  }

  users.destroy({
    where: {
      id: req.params.userId
    }
  }).then(()=>
  res.format({
    html: () => {
      res.redirect('/users'); },
    json: () => { res.send({ message: 'User successfully removed !' }) }
  })
  );
});


router.patch('/:userId', (req, res, next) => {

  if(res.get('Accept') === 'application/json')
    res.type('json')
  else
    res.type('html')
    users.update(
    {
      nom: req.body.nom,
      password: req.body.password
    },
    {
      where: {
        id: req.params.userId
      }
    }
    ).then(()=>
    res.format({
      html: () => {
        res.redirect('/users'); },
      json: () => { res.send({ message: '' }) }
    }));
});

router.get('/:userId/edit', (req, res, next) => {
  const index = './views/users/edit.pug';
  const render = pug.compileFile(index);

  if(res.get('Accept') === 'application/json')
    res.type('json')
  else
    res.type('html')

  users.find({
    where: {
      id: req.params.userId
    }
  }).then( (result) =>
  res.format({
    html: () => {
      const html = render({
        title: 'edit',
        user: result,
      });

      res.writeHead(200, { 'Content-Type': 'text/html' } );
      res.write(html);
      res.end();},
    json: (result) => { res.json(result) }
  })
  );

});

module.exports = router;