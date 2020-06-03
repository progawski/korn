$(document).ready(function(){

    // Open video in fullscreen mode on click and pause i it is closed

    $('.videoButton').click(function(){
        $(this).next('.video').get(0).play();
        $(this).next('.video').get(0).webkitRequestFullScreen();
    });
    $('.video').bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
        var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        if(!state){
            $(this).get(0).pause();
        } 
    });

    // Hamburger effect and menu slider

    var $hamburger = $(".hamburger");
    $hamburger.on("click", function() {
        $hamburger.toggleClass("is-active"); 
        $("#menu").slideToggle();
    });

    // Change container to carousel when window width is less or equal to 992px

    if($(window).width() <= 992) {
        $("#carouselContainer").addClass("carousel");
    } else{
        $("#carouselContainer").removeClass("carousel");
    }

    // Change container to carousel while resizing when window width is less or equal to 992px
    // Delete inline style added after slideToggle() and change hamburger icon to non-active, when resize (>=768)

    $(window).resize(function() {
        if($(window).width() <= 992) {
            $("#carouselContainer").addClass("carousel");
        } else{
            $("#carouselContainer").removeClass("carousel");
        }
        if($(window).width() >= 768) {
            $("#menu").css("display", "");
            $hamburger.removeClass("is-active"); 
        }
    });

    // Resize the navigation when scrolling

    $(window).scroll(function(){
        if($(document.documentElement).scrollTop() > 0) {
            $("header").css({
                "position" : "fixed",
                "z-index" : "2",
                "background-color" : "rgba(0,0,0,0.98)",
                "transition" : "all .4s ease-in-out",
                "border-bottom" : "1px solid rgba(255,255,255,0.2)"
            });
            $("#brandImage img").css({
                "height" : "70px",
                "transition" : "all .4s ease-in-out"
            });
            $(".menuLink").css({
                "font-size" : "1.1em",
                "transition" : "all .4s ease-in-out"
            });
        } 
        else{
            $("header").css({
                "position" : "",
                "z-index" : "0",
                "background-color" : "none",
                "border-bottom" : "none",
                "transition" : "all .4s ease-in-out"
            });
            $("#brandImage img").css({
                "height" : "100px",
                "transition" : "all .4s ease-in-out"
            });
            $(".menuLink").css({
                "font-size" : "1.3em",
                "transition" : "all .4s ease-in-out"
            });
        } 
    });

    // Smooth auto-scrolling

    $("a[href^='#']").click(function(e) {
        e.preventDefault(); 
        if($(this).attr("href") == "#top"){
            $("body, html").animate({scrollTop: 0}, 1000, 'swing');
        } 
        else{
            var position = $($(this).attr("href")).offset().top; 
            $("body, html").animate({scrollTop: position-45}, 1000, 'swing');
        }   
    });

    //Carousel

    var interval = window.setInterval(rotateStrips, 5000);
    $('#nextStrip').on('click', leftStrip);
    $('#previousStrip').on('click', rightStrip);
  
    function rotateStrips(){
        $('#nextStrip').off('click');
        $('#previousStrip').off('click');

        var firstStrip = $('.carousel').find('.strip:first');
        var width = firstStrip.outerWidth();
        
        firstStrip.animate({marginLeft: -width}, 1000, function(){
            var lastStrip = $('.carousel').find('.strip:last')
            lastStrip.after(firstStrip);
            firstStrip.css({marginLeft: 4});
            $('#nextStrip').on('click', leftStrip);
            $('#previousStrip').on('click', rightStrip);
        });
    }

    function leftStrip(){
        window.clearInterval(interval);
        $('#nextStrip').off('click');
        $('#previousStrip').off('click');

        var currentStrip = $('.carousel').find('.strip:first');
        var width = currentStrip.outerWidth();

        currentStrip.animate({marginLeft: -width}, 1000, function(){
            var lastStrip = $('.carousel').find('.strip:last')
            lastStrip.after(currentStrip);
            currentStrip.css({marginLeft: 4});
            $('#nextStrip').on('click', leftStrip);
            $('#previousStrip').on('click', rightStrip);
            interval = window.setInterval(rotateStrips, 5000);
        });
      }

    function rightStrip(){
        window.clearInterval(interval);
        $('#nextStrip').off('click');
        $('#previousStrip').off('click');

        var currentStrip = $('.carousel').find('.strip:first');
        var width = currentStrip.outerWidth();
        var previousStrip = $('.carousel').find('.strip:last')

        currentStrip.before(previousStrip);
        previousStrip.css({marginLeft: -width})
        
        previousStrip.animate({marginLeft: 4}, 1000, function(){
            $('#nextStrip').on('click', leftStrip);
            $('#previousStrip').on('click', rightStrip);
            interval = window.setInterval(rotateStrips, 5000);
        });
      }

    // Animation on scroll configuration

    AOS.init({
        once: true,
        duration: 800
    });

    // Disable download control and picture in picture in each video 
    $("video").each(function(){
        $(this).attr('controlsList','nodownload');
        $(this).attr('disablePictureInPicture','true');
        $(this).load();
    });

});