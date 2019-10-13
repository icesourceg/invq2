const stoploop = (indexnumber) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let selectedshopname = '#shopname-' + indexnumber;
  let selectedname = '#name-' + indexnumber;
  let selectedcity = '#city-' + indexnumber;
  $(selectedregnum).data('animated', false);
  $(selectedregnum).text($(selectedregnum).data('value'));
  $(selectedshopname).html($(selectedshopname).data('value'));
  $(selectedname).html($(selectedname).data('value'));  
  $(selectedcity).html($(selectedcity).data('value'));  
}



const revertrandom = (indexnumber) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let regnumber = $(selectedregnum).data('value');
  let revertvalue = -1;
  let url = window.location.origin + "/api/guest/revertrandom/" + regnumber + "/" + revertvalue 
  $.post( url, function( data ) {
    console.log(data)
    
  });
}

const resetloop = (indexnumber) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let selectedshopname = '#shopname-' + indexnumber;
  let selectedname = '#name-' + indexnumber;
  let selectedcity = '#city-' + indexnumber;
  $(selectedregnum).text('0000');
  $(selectedshopname).html('-');
  $(selectedname).html('-');
  $(selectedcity).html('-');
}

const getnewrandom = (indexnumber, updatedval) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let selectedshopname = '#shopname-' + indexnumber;
  let selectedname = '#name-' + indexnumber;
  let selectedcity = '#city-' + indexnumber;
  let url = window.location.origin + "/api/guest/random/1/" + updatedval
  $.get( url, function( data ) {
    console.log(data)
    $(selectedregnum).data('value', data.data[0].regnumber);
    $(selectedshopname).data('value', data.data[0].shop_name);
    $(selectedname).data('value', data.data[0].name);
    $(selectedcity).data('value', data.data[0].city);
  });
}


$(document).ready(function() {
  let loopindex = 0;
  let prizeindex = 0;
  let selectedregnum = '';

  $('body').keyup(function(e){
    if(e.keyCode == 32){
      if (loopindex % 2 === 0){
        selectedregnum = '#regnum-'+prizeindex;
        console.log(selectedregnum);
        $(selectedregnum).text("0000");
        loop($(selectedregnum));

      } else {
        console.log(selectedregnum);
        stoploop(prizeindex)
        prizeindex++;
      }
      loopindex++;
    } else if(e.keyCode == 82){
      loopindex = loopindex - 2;
      prizeindex = prizeindex -1;
      revertrandom(prizeindex);
      resetloop(prizeindex);
      getnewrandom(prizeindex,3);
    }
 });
});
