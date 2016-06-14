$(document).ready(function(){
    Navbar();
    DeployArticle();
    $(window).load(function(){
        toggle_navbar_form();
        adapt_form_width();
        if(window.location.pathname == '/'){
            AbonnementBtn(true);
        }else{  
            AbonnementBtn(false);
        }
        deployAds();
        $(window).scroll(function(){
            deployAds();
        });
    });
    $('.caption-screen').first().addClass('first');
    if($('#slider').length){
        adapt_slider_width();
        slider_items_midPosition_array = create_slider_array();
        center_slider_animated();
        placement_slider_control();
    }
    deployAds();
    $(window).scroll(function(){
        deployAds();
    });
});

$(window).resize(function(){
    Navbar();
    adapt_form_width();
    if($(window).width()<970){
        $('#banner_layer').height(($('#contentNav').outerWidth()/970)*150+'px');
    }else{
        $('#banner_layer').height(150);
    }
    if($('#slider').length){
        adapt_slider_width();
        slider_items_midPosition_array = create_slider_array();
        center_slider_animated();
        placement_slider_control();
    }
    AbonnementBtn(false);
});

function Navbar(){
    if($(window).width() < 992){
        $('.highlight-box:eq(2)').addClass('hide');
    }else{
        $('.highlight-box:eq(2)').removeClass('hide');
    }

    $("*").each(function(){
        if($(this).outerWidth()>$(window).width()){
            // alert($(this).attr('class'));
        }
    });
}

function AbonnementBtn(animation){
    abo = $('#abonnement');
    aboReferent = $('.navbar-header');
    aboHeight = $('#contentNav').outerHeight()-2;
    aboWidth = $('.navbar-brand img').width();
    aboPositionReferent = aboReferent.offset();
    aboX = aboPositionReferent.left +2;
    aboY = aboPositionReferent.top;
    if(animation==true){
        if(abo.hasClass("mail_token")){
            abo.css({left: aboX}).css({top: aboY+aboHeight-40});
            setTimeout(function(){
                abo.css({top: aboY+aboHeight})
            },1500);
        }else{
            abo.width(aboWidth).css({left: aboX}).css({top: aboY+aboHeight-40});
            setTimeout(function(){
                abo.css({top: aboY+aboHeight})
            },1500);
        }
    }else{
        if(abo.hasClass("mail_token")){
            abo.css({left: aboX}).css({top: aboY+aboHeight});
        }else{
            abo.width(aboWidth).css({left: aboX}).css({top: aboY+aboHeight});
        }
    }
}

function MainArticles(){
    currentLeft = 0;
    $('.container-mainArticle').each(function(){
        $(this).css('left',currentLeft+'%');
	if($(this).hasClass('deploy')){
	    currentLeft += 50;
	}else{
            currentLeft += 50;
	}
        console.log($(this).outerWidth());
    });
}
function DeployArticle(){
    $('.container-mainArticle').mouseover(function(){
        if(!$(this).hasClass('deploy')){
            $('.container-mainArticle').not($(this)).removeClass('deploy');
            $(this).addClass('deploy');
            $('#mainArticles').toggleClass('left');
        }
    });
}


// new navbar form
function adapt_form_width(){
    target = $('.navbar-form');
    referent = $('#contentNav .container');
    subTarget = $('.navbar-form .form-group .form-control');
    if($(window).width() > 768){
        target.height(referent.height());
        subTarget.width($('.navbar-nav:first').outerWidth()).height(referent.outerHeight()).css('margin-left',$('.navbar-header').width()-15);
    }else{
        target.width(referent.outerWidth()).height();
        // subTarget.width(referent.width() - $('#search-btn').outerWidth() +2).height(50);
    }
}

function toggle_navbar_form(){
    $('#search-btn, #close-btn-2').click(function(){
        if($('#search_form').hasClass('hide')){
            $('#search_form').removeClass('hide');
            $('#search_form input').focus();
            $('#search-btn a i').removeClass('fa-search').addClass('fa-close');
        }else{
            $('#search_form').addClass('hide');
            $('#search-btn a i').removeClass('fa-close').addClass('fa-search');
        }
    });
}
// ./new navbar form


// Ad management
function deployAds(){
    $('.layer-banner').each(function(){
        if($(this).offset().top < $(window).scrollTop() + $(window).height()/1.3 && !$(this).hasClass('deploy')){
            $(this).addClass('deploy');
        }
    });
}
// ./Ad management




// Custom Slider
    // Slider-control
$(document).ready(function(){
    $('.slider-control').click(function(){
        currentMiddle = $('#slider-layer').scrollLeft() + $('#slider-mask').width()/2;
        console.log('currentMiddle = '+ currentMiddle);
        // on compare la position du centre du carousel avec la position des .slider-item
        if($(this).is('#slider-control-left')){
            for (var i = 0; i < slider_items_midPosition_array.length; i++){
                // +30 = marge d'erreur de déplacement de l'image visée
                if(currentMiddle < slider_items_midPosition_array[i][1]+30){
                    nextIndex = i-2;
                    break;
                }
            };
            // Start & End exceptions
            if(currentMiddle < slider_items_midPosition_array[1][1]){
                nextIndex = 0;
            }else if(currentMiddle > slider_items_midPosition_array[slider_items_midPosition_array.length-1][1]){
                nextIndex = i-2;
            }
            // ./Start & End exceptions
        }else if($(this).is('#slider-control-right')){
            for (var i = 0; i < slider_items_midPosition_array.length; i++) {
                // -30 = marge d'erreur de déplacement de l'image visée
                if(currentMiddle <= slider_items_midPosition_array[i][1]-30){
                    nextIndex = i;
                    break;
                }
            };
        }
        // on applique la position du nextItem en scrollLeft
        nextLeftPosition = slider_items_midPosition_array[nextIndex][1] 
                            - $('#slider-mask').width()/2 
                            + $('.slider-item:first').width()/2;
        $('#slider-layer').animate({
                scrollLeft: nextLeftPosition 
            }, 300, function(){
        });
    });

    $('#slider-mask').children().mouseover(function(){
        $('.slider-control').addClass('slider-control-on');
    });
    $('#slider-mask').children().mouseout(function(){
        $('.slider-control').removeClass('slider-control-on');
    });
});
// Custom Slider




// SLIDER

    // Fonction pour récupérer la position from LEFT des .slider-item
    // sous forme de array pour gérer les animations du slider custom
    function create_slider_array(){
        $('#slider-layer').scrollLeft(0);
        i = 0;
        leftPosition = 0;
        positionArray = [];
        $.each($('.slider-item'), function(){
            truePosition = $(this).children('img').position().left 
                                        + $(this).outerWidth()/2;
            thisArray = [i,leftPosition,truePosition];
            positionArray.push(thisArray);
            leftPosition = leftPosition + $(this).width() + 20;
            i += 1;
        });
        return positionArray;
    }

    // Adapte la largeur du wrapper du slider
    function adapt_slider_width(){
        sliderWidth = 0;
        $.each($('.slider-item'), function(){
            sliderWidth = sliderWidth + $(this).outerWidth() + 20;
        });
        sliderWidth += 5;
        $('#slider').css('width', sliderWidth+5+'px');
    }

    // centrer le slider sur l'élément du milieu
    function center_slider_animated(){
        itemNum = Math.ceil($('.slider-item').length/2)-1;
        midItem = $('.slider-item:eq('+itemNum+')');
        midItemLeftPosition = midItem.position().left 
                            - ($('#slider-mask').width()/2 - midItem.outerWidth()/2);
        $('#slider-layer').animate({
            scrollLeft: midItemLeftPosition
        });
    }


    // Placement des boutons de slider-control 
    function placement_slider_control(){
        $.each($('.slider-control>.fa'), function(){
            middleHeight = ($('#slider').outerHeight() - $(this).outerHeight())/2;
            $(this).css('top', middleHeight+'px');
        });
    }

// SLIDER


// Ad management
function deployAds(){
    $('.layer-banner').each(function(){
        if($(this).offset().top < $(window).scrollTop() + $(window).height()/1.3 && !$(this).hasClass('deploy')){
            $(this).addClass('deploy');
        }
    });
}
// ./Ad management