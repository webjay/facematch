# Facematch

Match faces in profile images via [OpenCV](http://opencv.org).

## Setup

As this package uses [node-opencv](https://github.com/peterbraden/node-opencv) you need to be aware that node-opencv requires OpenCV to be installed. Thus, before you `npm install facematch` you should install OpenCV.

On my Mac I installed OpenCV like this:

    brew tap homebrew/science
    brew install opencv

Then, in your project:

    npm install facematch --save

## Usage

### Methods

#### compare

Arguments: img1, img2, callback

The callback is called with the arguments err and diff.

img1 and img2 can be either Buffer or path.

    var fm = new Facematch();
    fm.compare(imgBuffer1, imgBuffer2, function (err, diff) {
      if (err) throw err;
      console.log('Images absDiff is %d', diff);
    });
