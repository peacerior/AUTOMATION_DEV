/** Timer code **/
var Timer = (function() {
  
  function Timer(options) {
    this.fps = options.fps || 16;
    this.onTick = options.onTick || function(dt) {};
    this._frameInterval = 1000 / this.fps;
  }
  
  Timer.prototype.start = function() {
    
    this.startTime = this.lastTime = window.performance.now();
    this.mainloop();
    
  };
  
  Timer.prototype.mainloop = function(now) {

    requestAnimationFrame(this.mainloop.bind(this));
    
    var dt = now - this.lastTime;

    if(dt > this._frameInterval) {

      this.lastTime = now;
      this.onTick(dt / 1000);

    }
  };
  
  return Timer;
  
})();

/** Test it out **/

(function() {
  
  var ITEM_SPEED = 80;
  
  var FPSes = [8,16,60];
  
  FPSes.forEach(function(fps, idx) {
    
    (function() {
      var x = 0;
      var $item = $('#items div').eq(idx);
      $item.text(fps);

      var T = new Timer({
        fps: fps,
        onTick: function(delta) {

          if(x > 400) return;

          x += (ITEM_SPEED * delta);
          $item.css('transform', 'translate3d(' + x + 'px,0,0)');

        }
      });

      console.log(T);
      T.start();
    })();
    
    
  });
  
  
  
})();