// set rnd header bgd
var h_rnd = RND(0, 100);
if( h_rnd > 95 ) {
    $('#top-header').addClass('bgd-3');
} else if( h_rnd > 80 ) {
    $('#top-header').addClass('bgd-2');
} else {
    $('#top-header').addClass('bgd-1');
}
//set rnd class for #works
if( h_rnd > 55 ) {
    $('#works').addClass('inverse');
}

// Browser
var ob = getBrowser();
if(ob.browser == 'chrome'){ $('html').addClass('br-chrome') }
if(ob.browser == 'safari'){ $('html').addClass('br-safari') }
if(ob.browser == 'firefox'){ $('html').addClass('br-firefox')}
if(ob.browser == 'edge'){ $('html').addClass('br-edge')}
if(ob.browser == 'ie11'){ $('html').addClass('br-ie11')}
if(ob.browser == 'ie'){
    $('html').addClass('br-ie');
    if(ob.versionShort == '12'){ $('html').addClass('ie12'); }
    if(ob.versionShort == '11'){ $('html').addClass('ie11'); }
    if(ob.versionShort == '10'){ $('html').addClass('ie10'); }
    if(ob.versionShort == '9') { $('html').addClass('ie9'); }
}
if(ob.platform != 'desktop') $('html').addClass(ob.platform);
///  Browser END

/// --
$(function(){
    // go to FullScreen Mode
    $('.z-full-screen').on('click',function(){
        if(!$(this).hasClass('active')){
            toggleFullScreen();
            $(this).addClass('active')
                .find('.glyphicon').removeClass('glyphicon-fullscreen').addClass('glyphicon-resize-small');
        } else {
            toggleFullScreen();
            $(this).removeClass('active')
                .find('.glyphicon').removeClass('glyphicon-resize-small').addClass('glyphicon-fullscreen');
        }
    })

    /// copy main-menu block
    $('#main-menu').clone().appendTo('#top-header').addClass('menu-big').attr('id', 'main-menu-big');

    $('#main-menu-big > ul > li > a').each(function(){
        var t = $(this).text();
        $(this).attr('data-hover', t);
    })

    /// Main Menu Inits
    $('#main-menu').mmenu({
        slidingSubmenus: true,
        columns: false,
        extensions: {
            'all': [ 'theme-black', 'effect-menu-slide', 'pagedim-black' ], // widescreen - сразу видно , 'fx-menu-slide' - красиво едет, "fx-menu-zoom" - c увеличением, "fullscreen"
            //'(min-width: 700px)': ['widescreen']
        },
        navbar: {
            title: 'МЕНЮ',
            add: true
        },
        offCanvas: {
            position: 'left',
            //pageSelector: "#my-wrapper" // - селектор контейнера страницы
        },
        "setSelected": {
            "hover": false,
            "parent": false
        },
        iconPanels: true,
        counters: false
    });
    var api = $('#main-menu').data('mmenu');
    api.bind('open:start', function(){
        $('.hamburger').addClass('is-open');
        $('#main-menu').addClass('z-transform');
        $('body').addClass('mm-open');
    });
    api.bind('open:finish', function(){
        $('.hamburger').addClass('is-active');
    });
    api.bind('close:start', function(){
        $('.hamburger').removeClass('is-open');
        $('#main-menu').removeClass('z-transform');
    });
    api.bind('close:finish', function(){
        $('.hamburger').removeClass('is-active');
        $('body').removeClass('mm-open');
    });
    /// Main Menu END

    // Menu scrolling to Sections
    $('#main-menu a, #main-menu-big a').on('click',function(){
        if( !$(this).attr('data-href') ) return;
        var dh = $(this).attr('data-href'),
            ct = false;
        if( $(this).hasClass('is-cat') ) {
            ct = true;
        }
        if( $(this).parents('#main-menu').length ) {
            api.close(); // close MMenu
            setTimeout(function(){
                menuScrollTo(dh,ct);
            },400)
        } else {
            menuScrollTo(dh,ct);
        }

    })

    function menuScrollTo(d, f) {
        if( !f ) {
            if( d == 'top' ) {
                $('html,body').animate({scrollTop: 0}, 400);
            }
            $('section.box').each(function(){
                if( $(this).attr('id') == d ) {
                    var sTop = $(this).offset().top;
                   // $(window).scrollTop(sTop - 100);
                    $('html,body').animate({scrollTop: sTop}, 400);
                }
            })
        } else {
            var sTop = $('#works').offset().top;
            $('html,body').animate({scrollTop: sTop}, 400);

            $('#works .tabs .tab').each(function(){
                if( !$(this).hasClass('active') && $(this).attr('data-filter') == d ) {
                    $(this).trigger('click');
                }
            })
        }
    }
    /// -----

    var timeout = 500;
    setTimeout(function(){
        $('body').fadeIn(400);
        $('html').css('background','transparent');
    }, timeout);


    // header bgd
    var head_bgs = $('#top-header').css('background-size'),
        head_opa = $('#top-header .z-mask').css('opacity');
    if( 0 && head_bgs.split(' ')[0] == 'auto' && parseInt($('#top-header').css('height')) > 495 ) {
        var head_start = parseInt(head_bgs.split(' ')[1]);
        $('#top-header').css('background-position', 'center top')
        setTimeout(function(){
            var interval_1 = setInterval(function(){
                head_start += 0.01;
                $('#top-header').css('background-size', 'auto ' + head_start + '%');
                if( head_start > 190 ){
                    clearInterval(interval_1);
                }
            },100)
        },1000);
    }
    if(true){
        head_str = +head_opa;
        setTimeout(function(){
            var interval_2 = setInterval(function(){
                head_str += 0.001;
                $('#top-header .z-mask').css('opacity', head_str);
                if( head_str > 0.45 ){
                    clearInterval(interval_2);
                }
            },400)
        },1000);
    }
    //
    setTimeout(function(){
        $('.exo').addClass('active');
    },1500);
    setTimeout(function(){
        $('.exo').addClass('z-collapse');
    },6000);

    $('.exo > span').hover(function(){
        $(this).addClass('hover').prev().addClass('to-hover');
        $(this).next().addClass('to-hover');
    }, function(){
        $(this).removeClass('hover').prev().removeClass('to-hover');
        $(this).next().removeClass('to-hover');
    })

    setTimeout(function(){
        $('#img-romb').addClass('active');
    },9500);
    ///

    /// Animate Boxes
    setTimeout(function(){
        findVisibleBoxes();
    }, timeout + 100);

    $(window).scroll(function(){

        findVisibleBoxes();

        if( $(this).scrollTop() > 600 ) $('#top-div').addClass('active');
        else $('#top-div').removeClass('active');

    });

    // TOP-div
    $('#top-div').click(function(){
        $(window).scrollTop(100);
        $('html,body').animate({scrollTop:0},400);
    });

    /// more buttons
    $('.s-item .more').click(function(){
        var p = $(this).parent();
        $(this).fadeOut(100, function(){ $(this).remove(); })
        p.siblings('p:hidden').slideDown(150).css({'opacity': 0.88, 'font-size': '96%', 'line-height': 1.3});
    });

    /// Tabs & Porto Imgs
    $('.tabs li').click(function(){
        if( $(this).hasClass('active') ) return;
        var W = $('#works .section-content'),
            w = W.find('.s-item:not(".passive"):first').css('width'),
            d = $(this).attr('data-filter');
        $(this).addClass('active').siblings('.active').removeClass('active');
        if( d == 'cat-all' ){
            W.find('.s-item').removeClass('passive');
        } else {
            W.find('.s-item').each(function(){
                if( $(this).hasClass(d) ){
                    $(this).removeClass('passive');
                } else {
                    $(this).addClass('passive');
                }
            });
        }
    })

});
