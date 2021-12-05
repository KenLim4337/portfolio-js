$(document).ready(function(){
    //Bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();

    $('body').on('click','.modeToggle',function(){
        $('[data-toggle="tooltip"]').tooltip('hide');
    });

    //Random rotations
    rotateRandom();
    
    //Start slider for Projects
    slickInit('.projects-wrapper');

    //Regulate heights
    var poller = setInterval(function(){
        heightRegulator('.highlighted-skills > .row', 991);
        heightRegulator('.edu-block .card h2', 991);
        heightRegulator('.edu-block .card h4', 991);
        heightRegulator('.edu-block .card h5', 991);
        heightRegulator('.edu-block .edu-body', 991);
    }, 500);

    setTimeout(function(){
        clearInterval(poller);
    },3000);

    $('.modeToggle').click(function(){
        $('body').toggleClass('dark')
    });

    //Global resize function, use sparingly
    $(window).resize(function(){
        //Height regulator section
        heightRegulator('.highlighted-skills > .row', 991);
        heightRegulator('.edu-block .card h2', 991);
        heightRegulator('.edu-block .card h4', 991);
        heightRegulator('.edu-block .card h5', 991);
        heightRegulator('.edu-block .edu-body', 991);
        heightRegulator('.project-thumb img');
        heightRegulator('.project-desc');
    });
});


function heightRegulator(selector, threshold=0) {
    $(selector).css('height', 'auto');

    if($(window).width() > threshold) {
        var maxHeight = 0;

        $(selector).each(function(){
            maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
        });
        
        $(selector).css('height', maxHeight);
    }
}

function slickInit(selector) {
    $(selector).slick({
        slidesToShow: 3,
        adaptiveHeight: true,
        dots: true
    });

    var poller = setInterval(function(){
        heightRegulator('.project-thumb img');
        heightRegulator('.project-desc');
    }, 500);

    setTimeout(function(){
        clearInterval(poller);
    },3000);
}


function rotateRandom() {
    var selected = Math.round(Math.random() * $('.background svg path').length);

    if($('.background svg path:eq('+selected+')').hasClass('animateFwd')) {
        $('.background svg path:eq('+selected+')').removeClass('animateFwd').addClass('animateBwd');
    } else {
        $('.background svg path:eq('+selected+')').removeClass('animateBwd').addClass('animateFwd');
    }

    //Max delay = 5 secs
    var randomTime = Math.random() * 5000;
    //Recursively run
    setTimeout(rotateRandom, randomTime);
}