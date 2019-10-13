(function($){

  $.fn.shuffleLetters = function(prop){

      var options = $.extend({
          "step"      : 10,           // How many times should the letters be changed
          "fps"       : 10,           // Frames Per Second
          "text"      : "",           // Use this text instead of the contents
          "callback"  : function(){},  // Run once the animation is complete
          "run"       : true
      },prop)

      return this.each(function(){

          var el = $(this),
              str = "";
          if(el.data('animated')){
            console.log('animated1')
            return true;
          }
          el.data('animated',true);
          if(options.text) {
            str = options.text.split('');
          }
          else {
            str = el.text().split('');
          }

          var types = [],
            letters = [];
          for(var i=0;i<str.length;i++){
            var ch = str[i];
            types[i] = 'number';
            letters.push(i);
          }          

          (function shuffle(start){
            var i,
                len = letters.length, 
                strCopy = str.slice(0); 
            if(el.data('animated') === false){
              return false;
            }
            if(start>len){
              el.data('animated',false);
              options.callback(el);
              return;
            }
            for(i=Math.max(start,0); i < len; i++){
              let rndindex = Math.floor(Math.random() * (+10 - +0)) + +0;
              strCopy[letters[i]] = rndindex;
            }
            el.text(strCopy.join(""));
            setTimeout(function(){
              shuffle(start+1);
            },1000/options.fps);
          })(-options.step);
      });
  };
  
})(jQuery);

const loop = (obj) => {
  console.log(obj);
  obj.shuffleLetters({callback:loop});
}