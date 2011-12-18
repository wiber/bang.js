module.exports = {
  path: '/Users/mkunze/bang.js',
  debug: true,
  web: require('./web.js'),
  db:  require('./db.js'),
  
  // Not modularized yet
  logger: {
    filePath: 'bang.message.log'
  }
};