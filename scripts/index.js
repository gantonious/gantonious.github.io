$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                scrollTop: target.offset().top - 80
                }, 350);
                return false;
            }
        }
    });
});

$(window).scroll(function() {
	var scroll = $(window).scrollTop();
    var about_location = $("#about").position();
    var projects_location = $("#projects").position();
    var header_bottom = $("#home").height();
    var index = -1;

    
  	if (index != 0 && scroll < about_location.top - 50) {
  		document.getElementById("abt").style.color = "white";
        document.getElementById("hme").style.color = "#1597D8";
        index = 0;
  	} else if (index != 1 && scroll > about_location.top - 50 && scroll < projects_location.top - 50 ) {
  		document.getElementById("abt").style.color = "#1597D8";
        document.getElementById("hme").style.color = "white";
        document.getElementById("prj").style.color = "white";
        index = 1;
  	} else if (index != 2 && scroll > projects_location.top - 50){
        document.getElementById("hme").style.color = "white";
        document.getElementById("abt").style.color = "white";
        document.getElementById("prj").style.color = "#1597D8";
        index = 2;
    }
    
});

$(window).load(function() {
    document.getElementById("viewer").innerHTML = document.getElementById("PRJ0").innerHTML;
    $("#BUT0").css('color', '#35343B');
    $("#BUT0").css('background-color', '#FEFAFF');
});

function updateProjectPreview(ID){
    var project;
    switch(ID) {
        case 0:
            project = document.getElementById("PRJ0");
            document.getElementById("viewer").innerHTML = project.innerHTML;
            $("#BUT0").css('color', '#35343B');
            $("#BUT0").css('background-color', '#FEFAFF');
            $("#BUT1").css('color', '#FEFAFF');
            $("#BUT1").css('background-color', '#35343B');
            break;
        case 1:
            project = document.getElementById("PRJ1");
            document.getElementById("viewer").innerHTML = project.innerHTML;
            $("#BUT0").css('color', '#FEFAFF');
            $("#BUT0").css('background-color', '#35343B');
            $("#BUT1").css('color', '#35343B');
            $("#BUT1").css('background-color', '#FEFAFF');
            break;
    }
}