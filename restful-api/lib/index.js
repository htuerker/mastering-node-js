const lib = require("./data");

// lib.read('test', 'newFile', function(err, data) {
//     if(!err) {
//         console.log('Success: ', data);
//     } else {
//         console.log('Failure: ', err);
//     }
// });

// lib.create('test', 'newFile', { a: 1, b: 2}, function(err) {
//     if(!err) {
//         console.log('Success!');
//     } else {
//         console.log('Failure!', err);
//     }
// });

// lib.update('test', 'newFile', { a: 1, b: 4, c: 5 }, function(err, data) {
//     if(!err) {
//         console.log('Success!');
//     } else {
//         console.log('Failure!', err);
//     }
// });

lib.delete("test", "newFile", function (err) {
  if (!err) {
    console.log("Success");
  } else {
    console.log("Failure!");
  }
});
