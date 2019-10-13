$(document).ready(function() {
  var base_url = window.location;

  var table = $('#tblguestlist').DataTable({
    "pageLength": 10,
    "order": [[ 6, "desc" ]],
    dom: 'Bfrtip',
    buttons: ['csv'],
    responsive: true,
    columnDefs: [
      {
        "render": function ( data, type, row ) {
          if (row[7] != '-'){
            return moment(row[7]).fromNow() + ' <span class="badge badge-success">signed in</span>';
          } else {
            return '<span class="badge badge-danger">not signed in</span>';
          }
        },
        "targets": [8]
      },

      { "targets": [ 7 ] , "visible": false  }
    ]
  });

  table.buttons().container()
        .appendTo( '#tblguestlist_wrapper .col-md-6:eq(0)' );

  var url = window.location.origin + "/api/guest/countsignedin"
  $.get( url, function( data ) {
    $('#livesignedin').text(data["data"]);
  });
  setInterval(function() {
    $.get( url, function( data ) {
      $('#livesignedin').text(data["data"]);
    });
  }, 5000);

  setInterval(function() {
    location.reload();
  }, 50000);
} );