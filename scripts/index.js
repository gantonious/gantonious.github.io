// this function allows for smooth scrolling
// CREDIT TO CSS-TRICKS, SOURCE: http://css-tricks.com/snippets/jquery/smooth-scrolling/
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

// initializes index, the index is used to prevent pointless rendering when the page is scrolled
var index = -1;

$(window).scroll(function() {
	var scroll = $(window).scrollTop();
    var about_location = $("#about").position();
    var projects_location = $("#projects").position();
    var header_bottom = $("#home").height();

    // updates nav bar links to indicate current location on the page
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


function pull_twitch_info(user){
    var src = "https://api.twitch.tv/kraken/streams/" + user;

    $.ajax({
        url: src,
        type: 'get',
        dataType: 'jsonp',
        success:function(twitch_info){
            if (twitch_info.stream == null) {
                // execute if not streaming
            } else {
                // execute if streaming
                $("#live").css('display', 'inline-block');
            }
        }
    });
}

function github_commits(user, limit){
    var i = 0; // universal counter
    var k = 0; // PushEvent counter
    var out = ""; // the html that will grab the commits

    $.ajax({
        url: 'https://api.github.com/users/' + user,
        type: 'get',
        dataType: 'json',
        success:function(events){
            // formats the user data
            out += '<div class="activity_block"><div class="activity_icon"><a href="https://github.com/' + user; 
            out += '"><img style="width: 64px; height: 64px; border-radius: 3px;" src="'+ events.avatar_url + '"></a></div>';
            out += '<div class="activity_content" style="left: 75px; top: 2px;"><span style="font-size: 110%;">' + events.name + '</span><br>';
            out += events.login + '</div></div>';
        }  
    });

    $.ajax({
        url: 'https://api.github.com/users/' + user + '/events',
        type: 'get',
        dataType: 'json',
        success:function(events){
            // formats the commit data
            while(k < limit && i < events.length){
                if (events[i].type == "PushEvent"){
                    var d = (events[i].created_at.split("T")[0]).split("-");
                    var date = new Date(d[0], d[1] - 1, d[2]);
                    date = date.toLocaleDateString();

                    out += '<div class="activity_block"><div class="activity_content"> pushed ' 
                    out += '<a href="https://github.com/' + events[i].repo.name + '/commit/' + events[i].payload.head + '">' 
                    out += "'" + events[i].payload.commits[0].message.split("\n")[0] + "'" + '</a>' + ' to '; 
                    out += '<a href="https://github.com/' + events[i].repo.name + '">' + events[i].repo.name + '</a>';
                    out += '<br><span style="font-size:85%;">on ' + date + '</span></div></div>';
                    k++;
                }
                i++;
            } 
            // applies the html
            $("#activity").html(out);
        }  
    });
}

$(window).load(function() {
    // loads first snip-it into snip-it viewer
    document.getElementById("viewer").innerHTML = document.getElementById("PRJ0").innerHTML;
    document.getElementById("description").innerHTML = document.getElementById("DES0").innerHTML;
    $("#BUT0").css('color', '#35343B');
    $("#BUT0").css('background-color', '#FEFAFF');

    // checks to see if im streaming on twitch
    pull_twitch_info("gflight92");
    // pulls latest commits from github
    github_commits("gantonious", 5);
});

function updateProjectPreview(ID){
    var project;
    var description;

    // resets button colors
    $("#BUT0").css('color', '#FEFAFF');
    $("#BUT0").css('background-color', '#35343B');
    $("#BUT1").css('color', '#FEFAFF');
    $("#BUT1").css('background-color', '#35343B');
    $("#BUT2").css('color', '#FEFAFF');
    $("#BUT2").css('background-color', '#35343B');
    $("#BUT3").css('color', '#FEFAFF');
    $("#BUT3").css('background-color', '#35343B');

    // updates viewer window, description, and indicates selected button
    switch(ID) {
        case 0:
            project = document.getElementById("PRJ0");
            description = document.getElementById("DES0");
            document.getElementById("viewer").innerHTML = project.innerHTML;
            document.getElementById("description").innerHTML = description.innerHTML;
            $("#BUT0").css('color', '#35343B');
            $("#BUT0").css('background-color', '#FEFAFF');
            break;
        case 1:
            project = document.getElementById("PRJ1");
            description = document.getElementById("DES1");
            document.getElementById("viewer").innerHTML = project.innerHTML;
            document.getElementById("description").innerHTML = description.innerHTML;
            $("#BUT1").css('color', '#35343B');
            $("#BUT1").css('background-color', '#FEFAFF');
            break;
        case 2:
            project = document.getElementById("PRJ2");
            description = document.getElementById("DES2");
            document.getElementById("viewer").innerHTML = project.innerHTML;
            document.getElementById("description").innerHTML = description.innerHTML;
            $("#BUT2").css('color', '#35343B');
            $("#BUT2").css('background-color', '#FEFAFF');
            break;
        case 3:
            project = document.getElementById("PRJ3");
            description = document.getElementById("DES3");
            document.getElementById("viewer").innerHTML = project.innerHTML;
            document.getElementById("description").innerHTML = description.innerHTML;
            $("#BUT3").css('color', '#35343B');
            $("#BUT3").css('background-color', '#FEFAFF');
            break;
    }
}