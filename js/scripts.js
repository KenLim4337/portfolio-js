const modalTitles = {
    'edu-vt': 'Virginia Tech',
    'edu-uq': 'The University of Queensland',
    'proj-cwps': 'Civil War Photo Sleuth',
    'proj-ck': 'Conversion Kings',
    'proj-cd': 'CoviDash',
    'proj-the': 'Thesis Project',
    'proj-rc': 'Rack City',
}

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

    //Dark/light toggle
    $('.modeToggle').click(function(){
        $('body').toggleClass('dark')
    });

    //Modal buttons
    $('[data-bs-toggle="modal"]').click(function(){
        var key = $(this).data('bs-content');

        $('.modal').removeClass('loaded');

        $('.modal .modal-inner').empty();

        $('.modal .modal-content .modal-title').text(modalTitles[key]);

        setTimeout(function(){
            $('.modal').addClass('loaded');
        },2000)

        modalGen(key, function(e){
            $('.modal').addClass('loaded');
        });
    });

    //Hamburger menu
    $('.mobo-toggle').click(function(){
        $('body').toggleClass('show-menu');

        if($('body').hasClass('show-menu')) {
            $('body').addClass('modal-open');
            $('body').css('overflow','hidden');
            $('body').css('padding-right', 20);
        } else {
            $('body').removeClass('modal-open');
            $('body').css('overflow','');
            $('body').css('padding-right', '');
        }
    });
    
    $('.mobo-overlay').click(function(){
        $('body').removeClass('show-menu');
        $('body').removeClass('modal-open');
        $('body').css('overflow','');
        $('body').css('padding-right', '');
    });
    
    $('.nav-item').click(function(){
        $('body').removeClass('show-menu');
        $('body').removeClass('modal-open');
        $('body').css('overflow','');
        $('body').css('padding-right', '');
    });
    
    //Global resize function, use sparingly
    $(window).resize(function(){
        //Height regulator section
        heightRegulator('.highlighted-skills > .row', 991);
        heightRegulator('.edu-block .card h2', 1199);
        heightRegulator('.edu-block .card h4', 1199);
        heightRegulator('.edu-block .card h5', 1199);
        heightRegulator('.edu-block .edu-body', 1199);
        heightRegulator('.project-thumb img', 991);
        heightRegulator('.project-desc', 991);
        $('body').removeClass('show-menu');
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
        dots: true,
        autoplay: true,
        autoplaySpeed: 8000,
        infinite: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    adaptiveHeight: true,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 8000,
                    infinite: true,
                }
            }
        ]
    });

    var poller = setInterval(function(){
        heightRegulator('.project-thumb img', 991);
        heightRegulator('.project-desc', 991);
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

function modalGen(key, callback) {
    var url = '/modals/' + key + '.html'; 

    $.ajax({
        method: "GET",
        url: url,
        dataType: "html"
    }).done(function( data ){
        $('.modal .modal-inner').append(data);
        callback();
    });
}