//var coin_dict = $("#coin_dict").val();
var check_reviews = 1;
$(window).on("load", function () {
  if ($(".create_exchange").length) {

    var from_kurs = $("#select__current-give>.select__img").attr('data-coin');
    var to_kurs = $("#select__current-get>.select__img").attr('data-coin');
    get_kurs(to_kurs, from_kurs);

    // get_usdt("BTC");
    // var coin_dict_ = JSON.parse(coin_dict);
    // var from_min = coin_dict_["Bitcoin"].min;
    // var to_min = coin_dict_["Ethereum"].min
    //   if(from_min != null){
    //     $("#from").val(from_min);
    //     var to_input = 13 * from_min;
    //     console.log(to_kurs.length)
    //     var to_name = $("#select__current-get").text();
    //     to_name = to_name.trim();
    //     coin_dict_ = JSON.parse(coin_dict);
    //     to_input = to_input * coin_dict_[to_name].procent;
    //     $("#to").val(to_input.toFixed(5));
    //   }
  }
});
// from_input = to_kurs/from_kurs*from_input
$("#from").keyup(function () {
  var from_input = parseFloat($("#from").val().toString().replace(',', '.'));

  // const fromPrice = get_kurs($("#select__current-give>.select__img").attr('data-coin'));
  // console.log(fromPrice);
  var to_input = kursFrom/kursTo*from_input;
  var to_name = $("#select__current-get").text();
  to_name = to_name.trim();
  $("#to").val(to_input.toFixed(5));
});
// to_input = from_kurs/to_kurs*to_input
$("#to").keyup(function () {
  var to_input = parseFloat($("#to").val().toString().replace(',', '.'));
  // console.log(from_input_);
  var from_input = kursTo/kursFrom*to_input;
  var from_name = $("#select__current-get").text();
  from_name = from_name.trim();
  $("#from").val(from_input.toFixed(5));
});
$(document).ready(function () {
  $(".preloader").fadeOut(1000);
  $("body").css({
    overflow: "auto",
  });
  wow = new WOW({
    animateClass: "animate__animated",
  });
  wow.init();
  $(".header__burger").click(function () {
    $(this).toggleClass("header__burger_active");
    if ($(".header__menu").hasClass("header__menu_active")) {
      $(".header__menu").fadeOut();
    } else {
      $(".header__menu").fadeIn();
    }
    $(".header__menu").toggleClass("header__menu_active");
  });
  $(".panel__btn").click(function (e) {
    e.preventDefault();
    $(".panel__btn").removeClass("panel__btn_active");
    $(this).addClass("panel__btn_active");
    $("#select__body-give .select__item").fadeOut(0);
    $("#select__body-give .select__item" + $(this).attr("data-type")).fadeIn(0);
    $("#select__current-give").html(
      $(
        "#select__body-give .select__item" +
        $(this).attr("data-type") +
        ":first"
      ).html()
    );
    if ($(this).attr("data-type") == "_bank") {
      $("#select__body-get .select__item_bank").fadeOut(0);
    } else {
      $("#select__body-get .select__item_bank").fadeIn(0);
    }
  });
  $(".select").click(function () {
    $(this).find(".select__header").toggleClass("select__header_active");
    $(this).find(".select__body").toggleClass("select__body_active");
  });
  $(".select__item").click(function () {
    direction_error = 0;
    if ($(this).parent('.select__body').attr('id') == 'select__body-give') {
      if ($(this).find(".select__img").attr("data-coin") == $("#select__current-get").find(".select__img").attr("data-coin")) {
        direction_error = 1;
      }
      var from_input = parseFloat($("#from").val().toString().replace(',', '.'));
      var to_input = kursFrom/kursTo*from_input;
      var to_name = $("#select__current-get").text();
      to_name = to_name.trim();
      $("#to").val(to_input.toFixed(5));
    } else {
      if ($(this).find(".select__img").attr("data-coin") == $("#select__current-give").find(".select__img").attr("data-coin")) {
        direction_error = 1;
      }
      var to_input = parseFloat($("#to").val().toString().replace(',', '.'));
      // console.log(from_input_);
      var from_input = kursTo/kursFrom*to_input;
      var from_name = $("#select__current-get").text();
      from_name = from_name.trim();
      $("#from").val(from_input.toFixed(5));
    }
    if (direction_error == 1) {
      if (get_lang() == 'en') {
        direction_error_txt = "Exchange in this direction is not available";
      } else {
        direction_error_txt = "РћР±РјРµРЅ РІ СЌС‚РѕРј РЅР°РїСЂР°РІР»РµРЅРёРё РЅРµРґРѕСЃС‚СѓРїРµРЅ";
      }
      toastr.error(direction_error_txt);
    } else {
      $(this)
        .parent()
        .parent()
        .parent()
        .find(".input__text")
        .text($(this).find(".select__img").attr("data-coin"));
      $(this).parent().parent().find(".select__current").html($(this).html());
      if (get_lang() == 'en') {
        $(".panel__title").text(
          "Sell " + $("#select__current-give").text() + " for " + $("#select__current-get").text()
        );
        $("#input__get").attr(
          "placeholder",
          "Your address " + $.trim($("#select__current-get").text())
        );
      } else {
        $(".panel__title").text(
          "РџСЂРѕРґР°С‚СЊ " + $("#select__current-give").text() + " Р·Р° " + $("#select__current-get").text()
        );
        $("#input__get").attr(
          "placeholder",
          "Р’Р°С€ Р°РґСЂРµСЃ " + $.trim($("#select__current-get").text())
        );
      }
      get_kurs(
        $("#select__current-get").find(".select__img").attr("data-coin"),
        $("#select__current-give").find(".select__img").attr("data-coin")
      );
    }
  });
  $(".panel__links").click(function (e) {
    e.preventDefault();
    $(".panel__links").removeClass("panel__link_active");
    $(this).addClass("panel__link_active");
    $(".page").fadeOut(0);
    $(".page-" + $(this).data("page")).fadeIn(0);
  });
  $("#btn_change_pass").click(function (event) {
    event.preventDefault();
    let pass = $(".panel__form").find("input[name='pass']").val();
    let req_pass = $(".panel__form").find("input[name='req_pass']").val();
    if (pass == "" || req_pass == "") {
      if (get_lang() == 'en') {
        toastr.error("Fill in all fields!");
      } else {
        toastr.error("Р—Р°РїРѕР»РЅРёС‚Рµ РІСЃРµ РїРѕР»СЏ!");
      }
    } else {
      $.ajax({
        url: "/vender/change_pass",
        type: "POST",
        dataType: "json",
        data: {
          pass: pass,
          req_pass: req_pass,
          lang: get_lang()
        },
        success(data) {
          if (data.status == 200) {
            $("#old_pass").val(pass);
            if (get_lang() == 'en') {
              toastr.success("Password changed successfully!");
            } else {
              toastr.success("РџР°СЂРѕР»СЊ СѓСЃРїРµС€РЅРѕ РёР·РјРµРЅРµРЅ!");
            }
          } else {
            toastr.error(data.message);
          }
        },
      });
    }
  });
  $(".input__btn").click(function (e) {
    e.preventDefault();
    if (get_lang() == 'en') {
      if ($.trim($(this).text()) == "Show") {
        $(this).text("Hide");
        $(this).parent().find("input").attr("type", "text");
      } else {
        $(this).text("Show");
        $(this).parent().find("input").attr("type", "password");
      }
    } else {
      if ($.trim($(this).text()) == "РџРѕРєР°Р·Р°С‚СЊ") {
        $(this).text("РЎРєСЂС‹С‚СЊ");
        $(this).parent().find("input").attr("type", "text");
      } else {
        $(this).text("РџРѕРєР°Р·Р°С‚СЊ");
        $(this).parent().find("input").attr("type", "password");
      }
    }
  });
  /*
  $(document).on('input', '#referral__code', function () {
    $(this).css({border: "1px solid #e8e8e8"});
  });
  */
  $(".input__copy").click(function (e) {
    e.preventDefault();
    $(this).css({
      background: "#6ACD7A",
    });
    let $tmp = $("<input>");
    $("body").append($tmp);
    $tmp.val($(this).parent().find("input").val()).select();
    document.execCommand("copy");
    $tmp.remove();
  });
  $(".application__btn-payed").click(function (e) {
    e.preventDefault();
    $(".application__wrapper-info").slideToggle(1000);
    $(".step").removeClass("step_active");
    $(".application__payment-title").addClass(
      "application__payment-title_light"
    );
    $(".application__payment-text").addClass("application__payment-text_light");
    $(".application__payment:nth-child(2) .step").addClass("step_active");
    $(
      ".application__payment:nth-child(2) .application__payment-title"
    ).removeClass("application__payment-title_light");
    $(
      ".application__payment:nth-child(2) .application__payment-text"
    ).removeClass("application__payment-text_light");
    $.ajax({
      url: '/vender/paid.php',
      type: 'POST',
      dataType: 'json',
      data: {
        'id': id_exchage,
      },
    });
  });
});
$(".create_exchange").click(function (e) {
  e.preventDefault();
  
  var min_from = min_usd/kursFrom;
  var max_from = max_usd/kursFrom;
  var min_to = min_usd/kursTo;
  var max_to = max_usd/kursTo;
  var from = $("#from").val();
  var to = $("#to").val();
  var from_name = $("#select__current-give").find(".select__img").attr("alt");
  var to_name = $("#select__current-get").find(".select__img").attr("alt");
  var referral = $("#referral__code").val();
  var email = $("#email").val();
  var address = $("#input__get").val();
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  console.log(from);
  if (from == "" && to == "") {
    if (get_lang() == 'en') {
      toastr.error("Enter the amount to exchange");
    } else {
      toastr.error("Р’РІРµРґРёС‚Рµ СЃСѓРјРјСѓ РґР»СЏ РѕР±РјРµРЅР°");
    }
  } else if (address.length < 20 || address.length > 120 || !/\d/.test(address) || !/[a-zA-Z]/.test(address)) {
    if (get_lang() == 'en') {
      toastr.error("Enter the address to receive funds");
    } else {
      toastr.error("Р’РІРµРґРёС‚Рµ Р°РґСЂРµСЃ РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ СЃСЂРµРґСЃС‚РІ");
    }
  } else if (!email.match(validRegex)) {
    if (get_lang() == 'en') {
      toastr.error("Enter correct E-mail");
    } else {
      toastr.error("Р’РІРµРґРёС‚Рµ РїСЂР°РІРёР»СЊРЅС‹Р№ E-mail");
    }
  } else {
    if (parseFloat(from.toString().replace(',', '.')) < min_from) {
      if (get_lang() == 'en') {
        toastr.error("Minimum amount for " + from_name + " - " + min_from.toFixed(5));
      } else {
        toastr.error("РњРёРЅРёРјР°Р»СЊРЅР°СЏ СЃСѓРјРјР° РґР»СЏ " + from_name + " - " + min_from.toFixed(5));
      }
    } else if (parseFloat(from.toString().replace(',', '.')) > max_from) {
      if (get_lang() == 'en') {
        toastr.error("Maximum amount for " + from_name + " - " + max_from.toFixed(5));
      } else {
        toastr.error("РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ СЃСѓРјРјР° РґР»СЏ " + from_name + " - " + max_from.toFixed(5));
      }
    } else if (parseFloat(to.toString().replace(',', '.')) < min_to) {
      if (get_lang() == 'en') {
        toastr.error("Minimum amount for " + to_name + " - " + min_to.toFixed(5));
      } else {
        toastr.error("РњРёРЅРёРјР°Р»СЊРЅР°СЏ СЃСѓРјРјР° РґР»СЏ " + to_name + " - " + min_to.toFixed(5));
      }
    } else if (parseFloat(to.toString().replace(',', '.')) > max_to) {
      if (get_lang() == 'en') {
        toastr.error("Maximum amount for " + to_name + " - " + max_to.toFixed(5));
      } else {
        toastr.error("РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ СЃСѓРјРјР° РґР»СЏ " + to_name + " - " + max_to.toFixed(5));
      }
    } else {
      document.location.href = '../create.php?name_from='+'&sign_from='+$("#select__current-give").find(".select__img").attr("alt")+'&sign_to='+$("#select__current-get").find(".select__img").attr("alt")+'&address='+address+'&sum_from='+from+'&sum_to='+to+'&email='+email+'&promo='+referral+'&lang='+get_lang()
    }
  }
});

function get_kurs(coinTo, coinFrom) {
  let priceTo = 0;
  let priceFrom = 0;
  $.getJSON("../prices.json", function (data) {
    $.each(data.coins, (index, value) => {
      if (coinTo === value.name) {
        priceTo += Number(value.price);
      }

      if (coinFrom === value.name) {

        priceFrom += Number(value.price);        
      }
    })
    // console.log(price);

    kursTo = JSON.parse(priceTo);
    kursFrom = JSON.parse(priceFrom);
  }
  );
}


function round(number) {
  var lengh = number.toString().split(".")[1];
}

function get_lang() {
  return lang;
}
