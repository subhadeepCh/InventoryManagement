$(window).on("load",function(){
     $(".loaderwrapper").fadeOut("slow",()=>{
		 $(".spinner").fadeOut("slow");
	 });
	$("#bar").hide();
});
 $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your password'
                },
                {
                  type   : 'length[6]',
                  prompt : 'Your password must be at least 6 characters'
                }
              ]
            }
          }
        })
      ;
    })
  ;

$(document).ready(function() { 
    $(".alert-success").fadeTo(2000, 500).slideUp(500, function() {
      $(".alert-success").slideUp(500);
    });
	 $(".alert-danger").fadeTo(2000, 500).slideUp(500, function() {
      $(".alert-danger").slideUp(1000);
    });
  });
//=====================================================================
var i = 0;
function move() {
	$("#bar").toggle();
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 10;
    var id = setInterval(frame, 800);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width  + "%";
      }
    }
  }
}