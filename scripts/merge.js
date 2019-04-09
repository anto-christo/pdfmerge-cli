'use strict';

const merge = require('easy-pdf-merge');

let mergeFiles = (filesToBeMerged, destinationFileName) => {
  return new Promise((resolve, reject) => {
    merge(filesToBeMerged, destinationFileName, function (err) {
      if (err)
        reject(err);
      resolve();
    });
  });
}

module.exports = mergeFiles;