$( document ) .ready(function(){
  var test = $( '#test' );
      button = $( 'button' );
  button.on('click',function(){
    if (button.html() == 'hide') {
      button.html('show')
    }else{
      button.html('hide')
    };

    $('#list').toggleClass("hidden");
    // alert('new');

     console.log(test.find('ul'));
  });
});