var cv = require('opencv');
var async = require('async');

function Facematch () {

  this._detectObjects = function (im, callback) {
    var object, img;
    var options = {
      scale: 2
    };
    im.detectObject(cv.FACE_CASCADE, options, function (err, objects) {
      if (err) return callback(err);
      // console.log(objects);
      if (objects.length === 0) return callback('No objects found');
      for (var i in objects) {
        object = objects[i];
        img = im.roi(object.x, object.y, object.width, object.height);
        self.faces.push(img);
      }
      callback();
    });
  };

  this._calcDiff = function (callback) {
    var im1 = self.faces[0];
    var im2 = self.faces[1];
    // im1.save('im1.jpg');
    // im2.save('im2.jpg');
    var diff = new cv.Matrix(im1.width(), im1.height());
    diff.absDiff(im1, im2);
    diff.convertGrayscale();
    callback(null, diff.countNonZero());
  };

  var self = this;
  this.ims = [];
  this.faces = [];

}

Facematch.prototype.compare = function (img1, img2, callback) {

  var self = this;
  var images = [img1, img2];
  var diff;

  async.series([
    function (callback) {
      async.map(images, cv.readImage, function (err, results) {
        if (err) return callback(err);
        self.ims = results;
        callback();
      });
    },
    function (callback) {
      async.each(self.ims, self._detectObjects, callback);
    },
    function (callback) {
      if (self.faces.length < 2) return callback('Not enough faces');
      self._calcDiff(function (err, result) {
        if (err) return callback(err);
        diff = result;
        callback();
      });
    }
  ], function (err) {
    callback(err, diff);
  });

};

module.exports = Facematch;
