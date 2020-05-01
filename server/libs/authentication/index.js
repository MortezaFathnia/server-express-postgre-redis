require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const registerUser = function (username, password, done) {
  let self = this;

  try {
    self.db.User.findAll({
      attributes: ['id'],
      where: {
        username: username
      }
    })
      .then(async (user) => {
        if (user.length) {
          return done(null, false, { message: 'username already taken' });
        }
        else {
          let hashedPassword = await bcrypt.hash(password, process.env.AUTH_SALT);
          self.db.User.create(
            {
              username: username,
              role: 'member',
              password: hashedPassword
            }
          )
            .then(user => {
              self.log.verbose('user successfully registered, ' + JSON.stringify(user));
              return done(null, user);
            })
            .catch(error => {
              throw error;
            })
        }
      })
      .catch(error => {
        done(error);
      })
  }
  catch (err) {
    done(err);
  }
};

const loginUser = function (username, password, done) {
  let self = this;

  try {
    self.db.User.findAll({
      attributes: ['id', 'username', 'password', 'role'],
      where: {
        username: username
      }
    })
      .then(async (user) => {
        if (!user.length) {
          return done(null, false, { message: 'bad username' });
        }
        else if (user.length > 1) {
          return done(null, false, { message: 'more than 1 username' });
        }
        else {
          user = user[0];
          let response = await bcrypt.compare(password, user.password);
          if (response !== true) {
            return done(null, false, { message: 'passwords do not match' });
          }
          self.log.verbose('user found & authenticated: ' + JSON.stringify(user));
          return done(null, user);
        }
      })
      .catch(error => {
        self.log.error(error);
        return done(error)
      })
  }
  catch (err) {
    return done(err);
  }
};

module.exports = function () {

  let self = this;

  passport.serializeUser(function (user, done) {
    let serializeObject = {
      id: user.id,
      username: user.username,
      role: user.role
    }
    self.log.verbose('serializeUser: ' + JSON.stringify(serializeObject));
    done(null, serializeObject);
  });

  passport.deserializeUser(async function (user, done) {
    done(null, user);
  });

  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      registerUser.bind(self)
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      loginUser.bind(self)
    )
  );

  return passport;
};
