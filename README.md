# Facematch

Match faces in profile images via [OpenCV](http://opencv.org).

## Setup

As this package uses [node-opencv](https://github.com/peterbraden/node-opencv) you need to be aware that node-opencv requires OpenCV to be installed. Thus, before you `npm install facematch`, install OpenCV.

On my Mac I did this:

    brew tap homebrew/science
    brew install opencv

Then, in your project:

    npm install facematch --save
