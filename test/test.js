var assert = require('assert');
var fs = require('fs');

var Facematch = require('../lib/facematch.js');

// var imgFiles = ['228fc7d.jpg', 'sailhead.jpg'];
// var imgFiles = ['sailhead.jpg', 'sailhead2.jpg'];
var imgFiles = ['Mona.jpg', 'Mona.jpg'];

var imgs = [];

before(function () {
  for (var i in imgFiles) {
    imgs.push(fs.readFileSync(__dirname + '/images/' + imgFiles[i]));
  }
});

describe('match', function(){
  describe('#faces', function(){
    it('should match faces', function (cb) {

      var fm = new Facematch();
      fm.compare(imgs[0], imgs[1], function (err, diff) {
        if (err) return cb(err);
        assert(diff >= 0);
        cb();
        console.log('Images absDiff is %d', diff);
      });

    });
  });
});
