var Security = {};

Security.init = function(bang, cb) {
  var logger   = bang.logger;
  var mongoose = bang.mongoose;

    
  var clients = mongoose.model('clients');
  clients.find({}, function(err, docs) {
    docs.forEach(function(doc) {
      doc.remove();
    });
  });

  logger.logMessage('[Server][security] init', function(err, doc) {});

  cb();
};

module.exports = Security;