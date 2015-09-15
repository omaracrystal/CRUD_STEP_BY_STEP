// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  getLlamas();
  llamaPics();
});

//Submit button, create a llama
$('form').on('submit', function(e){
   e.preventDefault();
   var payload = {
      name: $('#name').val(),
      age: $('#age').val(),
      spitter: spitter
   };
   if($('#spitter').is(':checked')){
      payload.spitter = true;
   } else {
     payload.spitter = false;
   }

   $.post('/api/llamas', payload, function(data){
      $('.message-section').show();
      $('#message').html("Llama has been added!");
   getLlamas();
   });
});


function getLlamas(){
 $('#all-llamas').html('');
 $.get('/api/llamas', function(data){
   for (var i = 0; i < data.length; i++) {
      $('#all-llamas').append(
        '<tr><td>' + data[i].name + '</td><td>' + data[i].age + '</td><td>' + data[i].spitter + '</td><td>' + '<a class="btn btn-danger btn-xs delete-button" id="' + data[i]._id + '" role="button">Delete</a>' + '</td><td><a class="btn btn-primary btn-xs edit-button" id="' + data[i]._id + '" role="button">Edit</a></td></tr>'
     );
   }
      $('form input').val('');
      $('#spitter').removeAttr('checked');
 });
}


function llamaPics(){
  var myPhoto = ["llama1.jpeg", "llama2.jpeg", "llama3.jpeg", "llama4.jpeg", "llama5.jpeg", "llamaMeme.jpeg"];
  $('#llama-pics').html('');
  for (var i = 0; i < myPhoto.length; i++) {
    $('#llama-pics').append('<img src="js/images/' + myPhoto[i] + '" style="width:200px;height:250px;">');
  };
}
