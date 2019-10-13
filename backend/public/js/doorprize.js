

const stoploop = (indexnumber) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let selecteddetails = '#details-' + indexnumber;
  $(selectedregnum).data('animated', false);
  $(selectedregnum).text($(selectedregnum).data('regnumber'));
  let details = "<strong>" + $(selecteddetails).data('shopname') + "</strong><br />-" +
                "<br />" + $(selecteddetails).data('name') + "</strong><br />-" +
                "<br />" + $(selecteddetails).data('city');
  $(selecteddetails).html(details);  
}

const revertrandom = (indexnumber) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let regnumber = $(selectedregnum).data('regnumber');
  let revertvalue = -1;
  let url = window.location.origin + "/api/guest/revertrandom/" + regnumber + "/" + revertvalue 
  $.post( url, function( data ) {
    console.log(data)
    
  });
}

const resetloop = (indexnumber) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let selecteddetails = '#details-' + indexnumber;
  $(selectedregnum).text('0000');
  let details = '-';
  $(selecteddetails).html(details);
}

const getnewrandom = (indexnumber, updatedval) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let selecteddetails = '#details-' + indexnumber;
  let url = window.location.origin + "/api/guest/random/1/" + updatedval
  $.get( url, function( data ) {
    console.log(data)
    $(selectedregnum).data('regnumber', data.data[0].regnumber);
    $(selecteddetails).data('shopname', data.data[0].shop_name);
    $(selecteddetails).data('name', data.data[0].name);
    $(selecteddetails).data('city', data.data[0].city);
  });
}


$(document).ready(function() {
  let loopindex = 0;
  let prizeindex = 0;
  let selectedregnum = '';
  let selecteddetails = '';

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
      if (window.location.pathname === '/doorprize1'){
        getnewrandom(prizeindex,1);
      } else {
        getnewrandom(prizeindex,2);
      }
    }
 });
});
