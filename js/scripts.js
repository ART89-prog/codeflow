$(() => {


  //setTimeout(() => setHeight($(swiper.$el).find('.review')))
  if ($(window).width() < 480) {
    $(".cases_items .cases_item").addClass("active");
    $(".cases_items .cases_item:first-child").removeClass("active");
  }

  // Моб. меню
  $('header .mob_menu_btn').click((e) => {
    e.preventDefault()

    $('header .mob_menu_btn').addClass('active')
    $('body').addClass('menu_open')
    $('header .menu').addClass('show')
    $('.overlay').fadeIn(300)
  })

  $('header .close_btn, .overlay').click((e) => {
    $('header .mob_menu_btn').removeClass('active')
    $('body').removeClass('menu_open')
    $('header .menu').removeClass('show')
    $('.overlay').fadeOut(300)
  })


  var show = true;
  var countbox = ".numbers_items";
  $(window).on("scroll load resize", function () {
      if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height = $(window).height(); // Высота окна браузера
      var d_height = $(document).height(); // Высота всего документа
      var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
      if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
          $('.numbers_item-col').css('opacity', '0');
          $('.numbers_item-col').spincrement({
              thousandSeparator: "",
              duration: 1200
          });
           
          show = false;
      }
  });





  const carouselText = [
    { text: "тайм-менеджменту", color: "#29282E" }
  ]

  $(document).ready(async function () {
    carousel(carouselText, "#feature-text")
  });

  async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
      await waitForMs(delay);
      $(eleRef).append(letters[i]);
      i++
    }
    return;
  }

  async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
      await waitForMs(100);
      letters.pop();
      $(eleRef).html(letters.join(""));
    }
  }

  async function carousel(carouselList, eleRef) {
    var i = 0;
    while (true) {
      updateFontColor(eleRef, carouselList[i].color)
      await typeSentence(carouselList[i].text, eleRef);
      await waitForMs(1500);
      await deleteSentence(eleRef);
      await waitForMs(500);
      i++
      if (i >= carouselList.length) { i = 0; }
    }
  }

  function updateFontColor(eleRef, color) {
    $(eleRef).css('color', color);
  }

  function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }



  $('body').on('click', '.modal_link', function (e) {
    e.preventDefault()

    Fancybox.close(true)
    Fancybox.show([{
      src: $(this).data('content'),
      type: 'inline',
    }]);
  })



  $(document).on('change', '.error', function () {

    $(this).removeClass('error');
    if ($(this).attr('class') != 'checked') { $(this).next().hide(); }
  })

  $(document).on('click', '.submit_btn', function (event) {
    event.preventDefault();
    var dataForAjax = "action=form&";
    var addressForAjax = myajax.url;
    var valid = true;
    var form = $(this).closest('form');
    $(this).closest('form').find('input:not([type=submit]),textarea').each(function (i, elem) {
      if (this.value.length < 3 && $(this).hasClass('required')) {
        valid = false;
        $(this).addClass('error');
        $(this).next().show();
      }
      if ($(this).attr('name') == 'email' && $(this).hasClass('required')) {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!pattern.test($(this).val())) {
          valid = false;
          $(this).addClass('error');
          $(this).next().show();
        }
      }
      if ($(this).hasClass("checked") && !$(this).prop("checked")) {
        $(this).addClass('error');
        valid = false;
      }

      if (i > 0) {
        dataForAjax += '&';
      }
      dataForAjax += this.name + '=' + this.value;
    })

    if (!valid) {
      return false;
    }

    $.ajax({
      type: 'POST',
      data: dataForAjax,
      url: addressForAjax,
      success: function (response) {

        Fancybox.close()

        Fancybox.show([{
          src: "#thanks",
          type: 'inline'
        }])

        $('form').trigger("reset");
      }
    });
  });


})


