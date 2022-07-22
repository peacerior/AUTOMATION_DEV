// kd-tree implementation: https://github.com/ubilabs/kd-tree-javascript

// output canvas
var viewWidth = 0,
    viewHeight = 0,
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

// settings for image processing and drawing
// some combinations may be very slow :)
var settings = {
  width:250,
  height:280,
  threshold:196,
  sampleScaleX:0.8,
  sampleScaleY:0.8,
  maxWeight:24,
  frameStep:2,
  lineWidth:0.05,
  noise:2
};

var sprite;

var frames = [];
var startFrame = 15;

var image = document.createElement('img');
image.crossOrigin = 'Anonymous';
image.src = './the_dancer.png';
image.onload = function() {

  window.addEventListener('resize', resize);
  resize();

  sprite = new Sprite(image, 250, 280, (1000/18));

  for (var i = 0; i < sprite.frameCount; i++) {
    frames[i] = new Frame(i !== startFrame);

    sprite.frameIndex = i;
    sprite.drawFrame();

    frames[i].processImage(sprite.canvas);
    frames[i].update();
  }

  sprite.frameIndex = startFrame;

  requestAnimationFrame(update);
};

function resize() {

  var height = Math.min(window.innerWidth, window.innerHeight);
  var ratio = settings.width / settings.height;
  var width = height * ratio;
	var dpr = window.devicePixelRatio || 1;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  viewWidth = canvas.width = canvas.clientWidth * dpr;
  viewHeight = canvas.height = canvas.clientHeight * dpr;
}

// draw the stuff

function update() {
  var currentFrame = frames[sprite.frameIndex];

  currentFrame.update();

  if (currentFrame.skipDrawing || currentFrame.drawingComplete) {
    sprite.update(1000/60);
  }

  ctx.clearRect(0, 0, viewWidth, viewHeight);
  currentFrame.draw(ctx);

  requestAnimationFrame(update);
}

// utils

function map(s, a1, a2, b1, b2) {
  return ((s - a1)/(a2 - a1)) * (b2 - b1) + b1
}

/////////////////////////////
// Classes
/////////////////////////////

function Frame(skipDrawing) {
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');

  this.currentFrame = 0;
  this.drawingComplete = false;
  this.skipDrawing = skipDrawing;
}
Frame.prototype = {
  processImage:function(image) {
    this.canvas.width = settings.width;
    this.canvas.height = settings.height;

    this._getPoints(image);
    this._getPath();

    this.ctx.clearRect(0, 0, settings.width, settings.height);

    this.canvas.width = viewWidth;
    this.canvas.height = viewHeight;
  },
  _getPoints:function(image) {
    var threshold = settings.threshold,
        sampleScaleX = settings.sampleScaleX,
        sampleScaleY = settings.sampleScaleY,
        outputScaleX = sampleScaleX * (settings.width / viewWidth),
        outputScaleY = sampleScaleY * (settings.height / viewHeight),
        infOutputScaleX = 1 / outputScaleX,
        infOutputScaleY = 1 / outputScaleY,
        maxWeight = settings.maxWeight,
        sampleSizeX = (settings.width * sampleScaleX) | 0,
        sampleSizeY = (settings.height * sampleScaleY) | 0;

    this.ctx.drawImage(image, 0, 0, sampleSizeX, sampleSizeY);

    var imageData = this.ctx.getImageData(0, 0, sampleSizeX, sampleSizeY),
        pixels = imageData.data,
        points = [];

    for (var i = 0; i < pixels.length; i += 4) {
      var r = pixels[i    ],
          g = pixels[i + 1],
          b = pixels[i + 2],
          avg = ((r + g + b) / 3) | 0,
          x = ((i / 4) % sampleSizeX) * infOutputScaleX,
          y = ((i / 4 / sampleSizeY) | 0) * infOutputScaleY;

      if (avg > threshold) {
        var p = {
          x:x + (Math.random() * 2 - 1) * settings.noise,
          y:y + (Math.random() * 2 - 1) * settings.noise,
          weight:map(avg, threshold, 255, 1, maxWeight) | 0
        };

        points.push(p);
      }
    }

    this.points = points;
  },
  _getPath:function() {
    var distance = function(a, b) {
          var dx = (a.x - b.x) + Math.random() - 0.5;
          var dy = (a.y - b.y) + Math.random() - 0.5;

          return dx * dx + dy * dy;
        },
        dims = ['x', 'y'];

    var pathTree = new kdTree(this.points, distance, dims),
        copyTree = new kdTree(this.points, distance, dims),
        path = [],
        point = this.points[0],
        length = this.points.length,
        next;

    while (length) {
      next = pathTree.nearest(point, 1)[0][0];
      point = next;

      pathTree.remove(point);
      path.push(point);

      length--;
    }

    this.path = path;
    this.tree = copyTree;
  },

  update:function() {
    if (this.drawingComplete === true) return;

    var point = this.path[this.currentFrame],
        step = 0,
        steps = settings.frameStep;

    var neighbors;
    var ctx = this.ctx;

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = settings.lineWidth;

    while ((this.skipDrawing || ++step <= steps) && point) {
      ctx.beginPath();

      //var f = (Math.random() > 0.5 ? 1 : -1) * 0.1;
      ctx.moveTo(point.x, point.y);

      neighbors = this.tree.nearest(point, point.weight);

      neighbors.forEach(function(n){
        ctx.lineTo(n[0].x, n[0].y);
      });

      ctx.stroke();

      point = this.path[++this.currentFrame];
    }

    if (!point) {
      this.drawingComplete = true;
    }
  },
  draw:function(ctx) {
    ctx.drawImage(this.canvas, 0, 0);
  }
};

function Sprite(img, fw, fh, interval) {
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');

  this.frameWidth = this.canvas.width = fw;
  this.frameHeight = this.canvas.height = fh;
  this.img = img;
  this.interval = interval;
  this.time = 0;
  this.frameIndex = 0;
  this.dirty = false;

  this.calcFrames();
}
Sprite.prototype = {
  calcFrames:function() {
    this.frames = [];

    var count = (this.img.naturalWidth / this.frameWidth) | 0;

    for (var i = 0; i < count; i++) {
      this.frames.push([
        i * this.frameWidth,
        0,
        this.frameWidth,
        this.frameHeight
      ]);
    }

    this.frameCount = count;
  },
  update:function(dt) {
    this.time += dt;

    if (this.time >= this.interval) {
      if (++this.frameIndex === this.frames.length) {
        this.frameIndex = 0;
      }

      this.time = 0;
      this.drawFrame();
    }
  },
  drawFrame:function() {
    var f = this.frames[this.frameIndex];

    this.ctx.clearRect(0, 0, this.frameWidth, this.frameHeight);
    this.ctx.drawImage(this.img, f[0], f[1], f[2], f[3], 0, 0, this.frameWidth, this.frameHeight);
    this.dirty = true;
  },
  draw:function(ctx) {
    ctx.drawImage(this.canvas, 0, 0, 250, 280);
  }
};
