$(document).ready(function(){
  $('#qrdata').focus();

  $('body').click(function()  {
    $('#qrdata').focus();
  });

  $('#qrdata').on("paste", function(){
    if($('#qrdata').val().length >= 36){
      $('#scanform').submit();
      $('#qrdata').val('SCAN CODE');
      return false;
    }
  });
});