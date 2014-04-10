var assert = require('assert');

var Facematch = require('../lib/facematch.js');

var imgFiles = [
  'Mona.jpg', 'Mona.jpg',
  '228fc7d.jpg', 'sailhead.jpg',
  'Mona.jpg', 'me.jpg',
  'SirSeanConnery.jpg', 'sailhead.jpg'
];

var imgs;


before(function () {
  imgs = imgFiles.map(function (img) {
    return __dirname + '/images/' + img;
  });
});


describe('comparing', function () {

  describe('Mona & Mona', function () {
    it('should find a match', function (cb) {
      var fm = new Facematch();
      fm.compare(imgs[0], imgs[1], function (err, diff) {
        if (err) return cb(err);
        assert(diff === 0);
        cb();
        console.log('Images absDiff is %d', diff);
      });
    });
  });

  describe('sailor & sailor', function () {
    it('should find a match', function (cb) {
      var fm = new Facematch();
      fm.compare(imgs[2], imgs[3], function (err, diff) {
        if (err) return cb(err);
        assert(diff >= 0);
        cb();
        console.log('Images absDiff is %d', diff);
      });
    });
  });

  // describe('Mona & I', function () {
  //   it('should not find a match', function (cb) {
  //     var fm = new Facematch();
  //     fm.compare(imgs[4], imgs[5], function (err, diff) {
  //       if (err) return cb(err);
  //       assert(diff > 0);
  //       cb();
  //       console.log('Images absDiff is %d', diff);
  //     });
  //   });
  // });

});
