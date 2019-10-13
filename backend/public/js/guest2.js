function numberPad(num, size) {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function getlivesignedin(){
  let url = window.location.origin + "/api/guest/countsignedin"
  $.get( url, function( data ) {
    $('#livesignedin').text(data["data"]);
  });
}

function getliveguests(){
  let urlguest = window.location.origin + "/api/guest/countguest"
  $.get( urlguest, function( data ) {
    $('#liveguest').text(" / " + data["data"]);
  });
}


$(document).ready(function() {
  const ajax_url = window.location.origin + "/api/guest/listall";
  const signin_url = window.location.origin + "/api/guest/directsignin/";
  const timer = 60000;
  const socket = io();

  getlivesignedin();
  getliveguests();

  socket.on('hi!', (msg) => {
    console.log("socketio: " + msg);
    if (msg === 'refreshsignedin') {
      getlivesignedin();
      table.ajax.reload(null, false);
      getliveguests();
    }
  });

  var table = $('#tblguestlist').DataTable({
    "processing": true,
    "serverSide": false,
    ajax: ajax_url,
    "columns": [
      { "data": "name" },
      { "data": "shop_name" },
      { "data": "city" },
      { "data": "num_invited" },
      { "data": "guesttype" },
      { "data": "desknumber" },
      { "data": "regnumber", "defaultContent": "-" , "mRender": ( data, type, full ) => {
        if (!data){
          return '-';
        } else {
          let formatted_data = numberPad(data,4);
          return formatted_data;
        }
    }
    },
      { "data": "Guesthistory.createdAt", 
          "defaultContent": "-", "mRender": ( data, type, full ) => {
            if (!data){
              return '-';
            } else {
              let formatted_date = moment(data).format("YYYY-MM-DD HH:mm:ss");
              return formatted_date;
            }
        }
      },
      { "data": "Guesthistory.createdAt", "defaultContent": "-", "mRender": ( data, type, full ) => {
         if (!data ){
           return '<span class="badge badge-danger">not signed in</span>';
         } else {
           return moment(data).fromNow() + ' <span class="badge badge-success">signed in</span>';
         }
      } 
    },
    { "data": {"histcreate":"Guesthistory.createdAt", "code": "code"}, 
               "defaultContent": "-", "mRender": ( data, type, full ) => {
        if (!data.Guesthistory ){
          return '<a class="directcheckin" href="' + signin_url + data.code + '">signin</a>';
        } else {
          return '-';
        }
     } 
    }
    ],
    "pageLength": 10,
    "order": [[ 7, "desc" ]],
    dom: 'Bfrtip',
    buttons: ['csv'],
    responsive: true,
    
  });

  table.buttons().container()
        .appendTo( '#tblguestlist_wrapper .col-md-6:eq(0)' );
  $.fn.dataTable.ext.errMode = 'none';

  table.on( 'error.dt', ( e, settings, techNote, message ) => {
    console.log( 'An error has been reported by DataTables: ', message );
  } ) ;

  setInterval( () => {
    console.log('reload content from timer');
    table.ajax.reload(null, false);
    getlivesignedin();
  }, timer );
    
  // setInterval(() => {
  //   
  // }, timer);

  

  $(document).on("click", ".directcheckin", function() {
    var clickur = $(this).attr("href");
    $.get( clickur, ( data ) => {
      console.log(data);
      table.ajax.reload();
      getlivesignedin();
    });
    event.preventDefault();
  });

});