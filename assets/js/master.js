$(document).ready(function () {

  var oWindowWidth  = $(window).width(),
      oWindowHeight = $(window).height(),
      oNbCard       = 1,
      nbrCard       = 0,
      zIndex        = 24,
      NombreDeCases = 22,
      NombreMaximum = 22,
      TirageEffectue = new Array();

  $('#tarot-section').css({
    'margin-top': '100px',
    'padding-top': '100px'
  })
  if ( oWindowWidth <= 640 ) {
    $('.detail.row').remove().clone().insertAfter('.row.row-card');

  }

  function nombreAleatoire(){
    return Math.floor(Math.random() * NombreMaximum) + 1;
  }

  function dejaPresent(Nombre){
    var Element, Valeur;
    for(var i = 1; i <= NombreDeCases; i++){
      Element = document.getElementById('card' + i);
      // Si il existe
      if(Element){
        Valeur = $(this).attr('data-rank');
        if( Valeur == Nombre)
        {
          return true;
        }
      }
    }
    return false;
  }

  function tirageAleatoire(Numero)
  {
    if(!TirageEffectue[Numero])
    {
      var Element = document.getElementById('card' + Numero);
      if(Element)
      {
        var Aleatoire,
            dejaPresent  =  0;
        Aleatoire = nombreAleatoire();
        for (var i = 1; i <= NombreDeCases; i++) {
          var oData   =  $('#card' + i).attr('data-rank');
          if ( oData == Aleatoire ) {
            dejaPresent++;
          }
        }

        while (dejaPresent > 0) {
          var Aleatoire,
              dejaPresent  =  0;
          Aleatoire = nombreAleatoire();
          for (var i = 1; i <= NombreDeCases; i++) {
            var oData   =  $('#card' + i).attr('data-rank');
            if ( oData == Aleatoire ) {
              dejaPresent++;
            }
          }
        }

        $('#card' + Numero).attr('data-rank', Aleatoire);

        Element.innerHTML = '<a href=""> <img src="'+path_img+'" alt="card" class="back-card"> ' + '<img src="'+path_img+'" alt="card" class="hidden-card"> </a>'

      }
      TirageEffectue[Numero] = true;
    }
  }

  for (var i = 1; i <= 22; i++) {
    tirageAleatoire(i);
  }



  (function ($) {
    $.fn.vAlign = function() {
      var j   =   0;
      $(this).each(function(){
        var oHeight   =   $(this).height();
        if (oHeight >= j) {
          j = oHeight;
        }
      })
      $(this).css('height', j);
    };
  })(jQuery);

  if (oWindowWidth >= 768) {
    setTimeout(function(){
      $(function () {
        $('.about-section .h3').vAlign();
        $('.about-section .h3 + p').vAlign();
      });
    }, 2000);
  }



  $('.card a').hover(function(){
    $(this).children('img').addClass('hover');
  },function(){
    $(this).children('img').removeClass('hover');
  });



  $('.card li a').click(function() {

    //$('.mask').show();

    var oHtml   =   $(this).children('.hidden-card').attr('src');
    $('input[name="card-' + oNbCard + '"]').val(oHtml);

    if ( oWindowWidth > 500) {
      var   p           = $( this ).parent('li'),
          cardWidth   = ($(this).children('img').width()) / 2,
          maskWidth   = $(this).children('img').width(),
          maskheight  = $(this).children('img').height(),
          toMove      = cardWidth * nbrCard,
          ulWidth     = p.parent('ul').width(),
          oLimit      = toMove + cardWidth;
    }else{
      var   p           = $( this ).parent('li'),
          cardWidth   = ($(this).children('img').width()) / 3,
          maskWidth   = $(this).children('img').width(),
          maskheight  = $(this).children('img').height(),
          toMove      = cardWidth * nbrCard,
          ulWidth     = p.parent('ul').width(),
          oLimit      = toMove + cardWidth;
    }

    $('<div class="hide-mask"></div>').insertBefore('.card li a');
    $('.hide-mask').css('width', maskWidth).css('height', maskheight);


    $(this).parent('li').css('z-index', 23);

    if ( oNbCard < 10 ) {
      $(this).children('.back-card').addClass('rotate');
      $(this).children('.back-card').delay(250).fadeOut();
      setTimeout(function(){ $('.card .back-card.rotate').removeClass('rotate'); },1000);
      setTimeout(function(){ $('.card .back-card.rotate + .hidden-card').addClass('rotate-in'); },200);

      $('.card li').addClass('block');

      if (oWindowWidth > 500) {
        if ( oLimit <= ulWidth ) {
          setTimeout(function(){ $('.card .back-card.rotate + .hidden-card').parent('a').parent('li').animate({top: "+=-240px"}, 100, "linear", function() { }); },250);
        }else{
          setTimeout(function(){ $('.card .back-card.rotate + .hidden-card').parent('a').parent('li').animate({top: "+=240px"}, 100, "linear", function() { }); },250);
        }

      }else{
        setTimeout(function(){ $('.card .back-card.rotate + .hidden-card').parent('a').parent('li').animate({top: "+=-150px"}, 100, "linear", function() { }); },250);
      }

      setTimeout(function(){ $('.card .back-card.rotate + .hidden-card').parent('a').parent('li').animate({left: toMove}, 100, "linear", function() { }); },500);
      setTimeout(function(){ $('.hidden-card:not(".rotate-in")').parent('a').prev('div').remove(); },1250);

      setTimeout(function(){  $('.card li').removeClass('block'); },2500);

      $(this).parent('li').css('z-index', zIndex);



      nbrCard++;
      oNbCard++;
      zIndex++;

    } else{
      // acá ya tiene 10
      setTimeout(function() {
        var redireccionaA = 'https://www.tarotinteractivo.com/tarot/resultado-amor/'
        window.location = redireccionaA
      },3000)

      //alert('Ya ha seleccionado sus 10 cartas');

    }

    return false;

  })


  $('.cut-btn').click(function(){

    $('.hidden-card:not(".rotate-in")').parent('a').parent('li').addClass('cut-li');
    setTimeout(function(){ $('.card li').removeClass('cut-li'); },1000);
    return false;

  })

  $('.shake-btn').click(function(){

    $('.card').addClass('shake');
    setTimeout(function(){ $('.card').removeClass('shake'); },600);
    setTimeout(function(){ $('.card').addClass('shake'); },1200);
    return false;

  })


  $('.card a .rotate-in').click(function(){
    return false;
  })

  if ( oWindowWidth<768 ) {
    $('.interpretation-step .row > div:last-child').remove().clone().appendTo('.interpretation-step .row > div:nth-child(2)');
  }

  var oInit = 1 ;

  $('.card-chosen a').click(function(){

    var   maskWidth   = $(this).children('img').width(),
        maskheight  = $(this).children('img').height(),
        maskleft    = -(maskWidth / 2);

    if ( oInit == 3 ) {

      $('<div class="hide-mask"></div>').insertBefore('.card-chosen a');
      $('.hide-mask').css('width', maskWidth).css('height', maskheight).css('margin-left', maskleft);

    }

    oInit++;



    return false;

  })


})



$( window ).resize(function() {

  var oWindowWidth  = $(window).width(),
      oWindowHeight = $(window).height();

  (function ($) {
    $.fn.vAlign = function() {
      var j   =   0;
      $(this).each(function(){
        var oHeight   =   $(this).height();
        if (oHeight >= j) {
          j = oHeight;
        }
      })
      $(this).css('height', j);
    };
  })(jQuery);

  if (oWindowWidth >= 768) {
    setTimeout(function(){
      $(function () {
        $('.about-section .h3').vAlign();
        $('.about-section .h3 + p').vAlign();
      });
    }, 2000);
  }

});