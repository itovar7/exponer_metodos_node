var sequelize = require('../conexion');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var DataTypes = require("sequelize");
var User = sequelize.sequelize.define('mock_data', {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      Username: DataTypes.STRING
}, {
            instanceMethods: {
                  retrieveAll: function (onSuccess, onError) {
                        User.findAll({}, { raw: true }).success(onSuccess).error(onError);
                  },
                  retrieveById: function (user_id, onSuccess, onError) {
                        User.find({ where: { id: user_id } }, { raw: true }).success(onSuccess).error(onError);
                  },
                  add: function (onSuccess, onError) {
                        var first_name = this.first_name;
                        var last_name = this.last_name;
                        var email = this.email;
                        var Username = this.Username;
                        var password = this.password;

                        var shasum = crypto.createHash('sha1');
                        shasum.update(password);
                        password = shasum.digest('hex');

                        User.build({ first_name: first_name, last_name: last_name, email: email, Username: Username, password: password })
                              .save().success(onSuccess).error(onError);
                  },
                  updateById: function (user_id, onSuccess, onError) {
                        var first_name = this.first_name;
                        var last_name = this.last_name;
                        var email = this.email;
                        var id = user_id;
                        var Username = this.Username;
                        var password = this.password;

                        var shasum = crypto.createHash('sha1');
                        shasum.update(password);
                        password = shasum.digest('hex');

                        User.update({ first_name: first_name, last_name: last_name, email: email, Username: Username, password: password }, { where: { id: id } }).success(onSuccess).error(onError);
                  },
                  removeById: function (user_id, onSuccess, onError) {
                        User.destroy({ where: { id: user_id } }).success(onSuccess).error(onError);
                  },
                  validaPassword: function (password, passwd, done, user) {
                        bcrypt.compare(password, passwd, function (err, isMatch) {
                              if (err) console.log(err)
                              if (isMatch) {
                                    return done(null, user);
                              } else {
                                    return done(null, false);
                              }
                        });
                  }
            }
      });

exports.User = User;