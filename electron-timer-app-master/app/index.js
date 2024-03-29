// Require moment.js
const moment = require('moment');
// Require ipcRender
const {ipcRenderer} = require('electron');

// Helper function, to format the time
const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();

    return `${min}:${sec}`;
};

// Listen to the 'timer-change' event
ipcRenderer.on('timer-change', (event, t) => {
    // Initialize time with value send with event
    let currentTime = t;

// Print out the time
    timerDiv.innerHTML = secondsToTime(currentTime);

// Execute every second
    let timer = setInterval(() => {

        // Remove one second
        currentTime = currentTime - 1;

        // Print out the time
        timerDiv.innerHTML = secondsToTime(currentTime);

        // When reaching 0. Stop.
        if (currentTime <= 0) {
            clearInterval(timer);
        }
    }, 1000); // 1 second
});
// <script>
  var canvas = document.getElementById('drawSurface');
  var ctx = canvas.getContext('2d')
  var down = document.getElementById('info');
  var linInfo = document.getElementById('linedata');
  var points = [],
    lines = [],
    guides = [],
    frame = [],
    isDrawing = false,
    counter = 0,
    needRefresh = false;
  ctx.lineCap = 'round';
  ctx.font = "10px Arial";
  ctx.fillStyle = "red"
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)'

  function createButton(txt) {

    var btn = document.createElement("BUTTON"); // Create a <button> element
    var t = document.createTextNode(txt); // Create a text node
    btn.appendChild(t); // Append the text to <button>
    document.body.appendChild(btn); // Append <button> to <body>
  }

  if (window.PointerEvent) {
    function handler(e) {}
    canvas.addEventListener('pointerdown', function Pionterdown(e) {
      isDrawing = true;
      points.push({
        x: e.clientX,
        y: e.clientY,
        p: e.pressure
      });
    });
    canvas.addEventListener('pointerup', function PionterUp(e) {
      isDrawing = false;
      lines.push(points);
      points = [];
      createButton('line ' + lines.length);

      drawFrame()
    });
    canvas.addEventListener('pointermove', function PionterMove(e) {
      if (isDrawing) {
        points.push({
          x: e.clientX,
          y: e.clientY,
          p: e.pressure
        });
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, e.pressure * 10, 0, 2 * Math.PI);
        ctx.fillText(e.pressure, e.clientX, e.clientY);
        ctx.fill()
        // lines[counter].push({
        //   x: e.clientX,
        //   y: e.clientY,
        //   p: e.pressure
        // });
      } else {
        down.innerHTML = JSON.stringify(lines[counter][0].p) // + ' ' + lines[counter][0].x //e.clientX + ' ' + e.clientY

      }
    });
    canvas.addEventListener('pointerenter', handler);
    canvas.addEventListener('pointercancel', handler);
  } else {
    canvas.textContent = 'This browser does not support Pointer Events';
  }

  function drawLines() {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y)
    ctx.lineTo(e.clientX, e.clientY)
    ctx.lineWidth(e.pressure)
    ctx.stroke();
    down.innerHTML = points[points.length - 1].x
    // document.getElementById('linedata').innerHTML += ctx.lineWidth;
  }

  function drawFrame() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < lines.length; i++) {
      ctx.beginPath();
      ctx.lineWidth = 10 * lines[i][0].p;
      for (var j = 1; j < lines[i].length; j++) {
        ctx.beginPath();
        ctx.lineWidth = 10 * lines[i][j].p;
        ctx.moveTo(lines[i][j - 1].x, lines[i][j - 1].y)
        ctx.lineTo(lines[i][j].x, lines[i][j].y)
        ctx.stroke();

      }
    };
  }
  var fps = 24;

  function draw() {
    setTimeout(function() {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (counter < lines.length) {
        // ctx.fillText(JSON.stringify(lines[counter][0].x), 100, 200);
        for (var i = 1; i < lines[counter].length; i++) {
          // ctx.fillText(lines[lines.length - 1].slice(-2)[0].x, 200, 100);

          ctx.beginPath();
          ctx.moveTo(lines[counter][i - 1].x, lines[counter][i - 1].y)
          ctx.lineTo(lines[counter][i].x, lines[counter][i].y)
          ctx.lineWidth = lines[counter][i].p * 30
          ctx.stroke();

        }
        for (var i = 1; i < lines[lines.length - 1].length; i++) {
          ctx.fillText(lines[lines.length - 1][i].x, 200, 100);
          ctx.beginPath();
          ctx.moveTo(lines[lines.length - 1][i - 1].x, lines[lines.length - 1][i - 1].y)
          ctx.lineTo(lines[lines.length - 1][i].x, lines[lines.length - 1][i].y)
          ctx.lineWidth = lines[lines.length - 1].slice(-1)[0].p * 30
          ctx.stroke();
        }
        counter += 1
        needRefresh = true
      } else if (counter == 0) {

        needRefresh = false
      } else {
        counter = 0
      }

    }, 1000 / fps);
  }
  draw();
// </script>
