$(document).ready(function(){
  $(document).keyup(function(e) { 
    if (e.keyCode == 32) {
      window.location.replace('/scan');
    }
  });
});