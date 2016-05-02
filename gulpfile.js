var gulp = require('gulp');
var path = require('path');

var NwBuilder = require('nw-builder');
var spawn = require('child_process').spawn;

platforms = {"win32": "win64", "darwin": "osx64", "linux": "linux64"};
binary_names = {"win32": "timer.exe", "darwin": "timer.app", "linux": "timer"};
platform = platforms[process.platform];
binary_name = binary_names[process.platform];
binary_root = path.join('build', 'timer', platform);
binary_path = path.join('build', 'timer', platform, binary_name);

var nw = new NwBuilder({
  files: [
      "./**"
  ],
  platforms: [platform],
  version: "0.12.0",
  buildDir: "./build"
});

nw.on('log', console.log);

gulp.task('default', function(){
  console.log("this is a default task");
});

gulp.task('build', function(){
  nw.build().then(function(){
    console.log('build success!');
  }).catch(function(error){
    console.log(error);
  });
});


gulp.task('run', function(){
  var args = [];
  if (process.platform === 'win32' || process.platform === 'darwin') {
    args = ["--disable-gpu", "--force-cpu-draw"];
  } else {
    args = ["--disable-gpu", "--enable-transparent-visuals"]
  }
  console.log(binary_path)
  nwapp = spawn(binary_path, args);
});

gulp.task('start', function(){
  console.log("build and run");
});
