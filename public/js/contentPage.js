$(document).ready(function() {
    let flag= 0;
   
    $(".thumbnail").hover(function(){  // function to reveal stars on thumbnail while hovering
        $(this).children(".details").show();
        }, function(){
            $(".details").hide();
           });

    $(".thumbnail").hover(function(){  // function to reveal stars on thumbnail while hovering
        $(this).addClass("animated pulse");
        }, function(){
            $(".thumbnail").removeClass("animated pulse");
           });
    $(function() {
        $('.trigger').click(function() {
            $(this).addClass('open');
            $('.toolbar').show();
            $('.pseudo-circle').addClass('open');
        });
        $('.close').click(function() {
            $('.trigger').removeClass('open');
            $('.pseudo-circle').removeClass('open');
            $('.toolbar').hide();
        })
    });
    
});