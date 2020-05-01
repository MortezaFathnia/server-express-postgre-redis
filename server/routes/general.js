require('dotenv').config();

const express = require('express');
const router = express.Router();

function login(req, res) {
  let self = this;

  if (req.user.role != 'guest') {
    self.log.verbose('logged in user tries to login: ' + JSON.stringify(req.user));
    res.status(403).send('forbidden');
  }
  else {
    self.auth.authenticate('login', (err, user, info) => {
      if (err) {
        self.log.error(err);
        res.status(500).send({
          message: 'error in server'
        });
      }
      if (info != undefined) {
        self.log.info(info.message);
        res.send(info.message);
      }
      else {
        req.logIn(user, err => {
          if (err) {
            self.log.error(err);
            res.status(500).send({
              message: 'error in server',
            });
          }
          else {
            res.redirect('/');
          }
        });
      }
    })(req, res);
  }
}

function register(req, res) {
  let self = this;

  if (req.user.role != 'guest') {
    self.log.verbose('logged in user tries to register: ' + JSON.stringify(req.user));
    res.status(403).send('forbidden');
  }
  else {
    self.auth.authenticate('register', (err, user, info) => {
      if (err) {
        self.log.error(err);
        res.status(500).send({
          message: 'error in server'
        });
      }
      if (info != undefined) {
        self.log.info(info.message);
        res.send(info.message);
      }
      else {
        res.status(200).send({ message: 'user successfully registered.' });
      }
    })(req, res);
  }
}

function logout(req, res) {
  let self = this;

  if (req.user.role == 'guest') {
    self.log.verbose('guest tries to logout');
    res.status(403).send('forbidden');
  }
  else {
    req.logOut();
    res.redirect('/');
  }
}

module.exports = function () {
  let self = this;

  router.post('/login', login.bind(self));
  router.post('/register', register.bind(self));
  router.post('/logout', logout.bind(self));

  return router;
};