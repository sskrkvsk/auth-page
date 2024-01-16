var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
var crypto = require('crypto');

mkdirp.sync('var/db');

var db = new sqlite3.Database('var/db/info.db');
// serialize execute a series of operations within a transaction. All at once or none at all
db.serialize(function() {
    // "\" - line continuation 
    // BLOB - Binary Large Object
    db.run("CREATE TABLE IF NOT EXISTS users ( \
      id INTEGER PRIMARY KEY, \
      username TEXT UNIQUE, \
      hashed_password BLOB, \
      salt BLOB, \
      name TEXT, \
      email TEXT UNIQUE, \
      email_verified INTEGER \
    )");
    
    db.run("CREATE TABLE IF NOT EXISTS federated_credentials ( \
      id INTEGER PRIMARY KEY, \
      user_id INTEGER NOT NULL, \
      provider TEXT NOT NULL, \
      subject TEXT NOT NULL, \
      UNIQUE (provider, subject) \
    )");
    
    // create an initial user (username: theuser, password: initialpassword)
    var salt = crypto.randomBytes(16);
    db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
      'theuser',
      crypto.pbkdf2Sync('initialpassword', salt, 310000, 32, 'sha256'),
      salt
    ]);
  });
  
  module.exports = db;