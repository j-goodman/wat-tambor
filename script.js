var position = {
  accel: 0,
  x: 0,
};

var lost = false;
var won = false;
var starttime = 0;

var startgame = function () {
  var error;
  var meter;
  var needle;
  var start;
  var video;
  lost = false;
  won = false;
  error = document.getElementsByClassName('error-video')[0];
  meter = document.getElementsByClassName('meter')[0];
  needle = document.getElementsByClassName('needle')[0];
  start = document.getElementsByClassName('start')[0];
  video = document.getElementsByClassName('video')[0];
  start.innerText = "Mash the left and right arrow keys.";
  start.onclick = null;
  video.play();
  position.x = Math.random() - 0.5;
  position.accel = 0;
  starttime = new Date().getTime() / 1000;
  interval = window.setInterval(function () {
    var needle;
    var counter;
    needle = document.getElementsByClassName('needle')[0];
    counter = document.getElementsByClassName('counter')[0];
    if (position.x > 0) {
      position.accel += Math.random() * 5 - 2;
    } else {
      position.accel -= Math.random() * 5 - 2;
    }
    if (position.accel > 8) { position.accel = 8; }
    if (position.accel < -8) { position.accel = -8; }
    position.x += position.accel;
    if (position.x > 60 || position.x < -60) {
      lose();
    }
    needle.style.transform = 'translateX(' + position.x + 'px)';
    counter.innerText = Math.round(new Date().getTime() / 100 - starttime * 10) / 10;
  }, 80);
};

onkeydown = function (event) {
  if (event.keyCode === 37) { // left
    position.x -= 14;
  } else if (event.keyCode === 39) { // right
    position.x += 14;
  }
};

var lose = function () {
  var error;
  var start;
  var video;
  if (lost) { return false; }
  lost = true;
  error = document.getElementsByClassName('error-video')[0];
  start = document.getElementsByClassName('start')[0];
  video = document.getElementsByClassName('video')[0];
  video.style.display = 'none';
  error.style.display = 'block';
  if (!won) {
    start.onclick = startgame;
    start.innerText = "You're embarrassed in front of everyone. Try again?";
  }
  video.currentTime = 0;
  video.pause();
  error.play();
  window.clearInterval(interval);
};

var win = function () {
  var music;
  var start;
  won = true;
  music = document.getElementById('victory');
  start = document.getElementsByClassName('start')[0];
  start.innerText = "You made it through the meeting without embarrassing yourself in front of Count Dooku!";
  music.play();
};

window.onload = function () {
  document.getElementsByClassName('video')[0].addEventListener('ended', win, false);
};
