'use strict';

var ACTIVE_PAGE = 'home';
var NAV_ACTIVE = true;
var windowHeight = window.innerHeight;

function setActives() {
  var items = document.querySelectorAll('[data-match=' + ACTIVE_PAGE + ']');
  var activeClass = 'js--active-page';

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = document.querySelectorAll('[data-match]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      item.classList.remove(activeClass);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _item = _step2.value;

      _item.classList.add(activeClass);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function setRevealJs() {
  var items = document.querySelectorAll('.js--to-hide');
  var hiddenTopExtraSpace = 25;
  var hideTop = 'js--hidden-top';
  var hideBot = 'js--hidden-bot';
  var hideMark = 'js--hidden-mark';
  var colContents = document.querySelectorAll('.col-content');

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var revealItem = _step3.value;

      if (revealItem.getBoundingClientRect().top < windowHeight || revealItem.getBoundingClientRect().top + revealItem.offsetHeight > 0) {
        revealItem.classList.remove(hideBot, hideTop, hideMark);
      }

      if (revealItem.getBoundingClientRect().top >= windowHeight) {
        revealItem.classList.add(hideBot, hideMark);
      } else if (revealItem.getBoundingClientRect().top + revealItem.offsetHeight - hiddenTopExtraSpace <= 0) {
        revealItem.classList.add(hideTop, hideMark);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = colContents[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var col = _step4.value;

      if (col.getBoundingClientRect().top < windowHeight || col.getBoundingClientRect().top + col.offsetHeight > 0) {
        col.classList.remove(hideMark);
      }

      if (col.getBoundingClientRect().top >= windowHeight) {
        col.classList.add(hideMark);
      } else if (col.getBoundingClientRect().top + col.offsetHeight - hiddenTopExtraSpace <= 0) {
        col.classList.add(hideMark);
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var itemsMatchTitle = document.querySelectorAll('[data-matchtitle]:not(.' + hideMark + ')')[0] || null;

  if (itemsMatchTitle && itemsMatchTitle.getBoundingClientRect().top <= windowHeight) {
    var matchTitle = itemsMatchTitle.dataset.matchtitle;

    if (matchTitle && ACTIVE_PAGE !== matchTitle) {
      ACTIVE_PAGE = matchTitle;
      setActives();
    }
  }

  var activeQuoteText = document.querySelectorAll('.js--quote-text[data-match=' + ACTIVE_PAGE + ']')[0] || null;
  var activeColContent = document.querySelectorAll('.col-content[data-matchtitle=' + ACTIVE_PAGE + ']')[0] || null;
  var quoteTextHideClass = 'js--quote-text__hide';
  var hideQuoteSpaceBefore = 150;

  if (activeQuoteText && activeColContent && activeColContent.getBoundingClientRect().top < activeQuoteText.getBoundingClientRect().top + activeQuoteText.offsetHeight + hideQuoteSpaceBefore) {
    activeQuoteText.classList.add(quoteTextHideClass);
  } else if (activeQuoteText && activeColContent) {
    activeQuoteText.classList.remove(quoteTextHideClass);
  }

  var bigTextMidSizeClass = 'main-big-text__med-size';
  var activeTitle = document.querySelector('.main-big-text[data-match=' + ACTIVE_PAGE + ']');
  var activeContentText = document.querySelector('[data-matchtitle=' + ACTIVE_PAGE + ']');
  var fontResizeSpaceBefore = 250;

  if (activeContentText && activeTitle && activeContentText.getBoundingClientRect().top < activeTitle.getBoundingClientRect().top + fontResizeSpaceBefore) {
    activeTitle.classList.add(bigTextMidSizeClass);
  } else if (activeContentText && activeTitle) {
    activeTitle.classList.remove(bigTextMidSizeClass);
  }

  var flowItems = document.querySelectorAll('[data-flow-match=' + ACTIVE_PAGE + '] .js--flow-item') || null;
  var flowItemHideClass = 'js--flow-item__hide';
  var activeTitleMed = document.querySelector('.main-big-text__med-size[data-match=' + ACTIVE_PAGE + ']');
  var flowItemTitleSpace = 50;

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = flowItems[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var item = _step5.value;

      if (item && activeTitle && item.getBoundingClientRect().top - flowItemTitleSpace > activeTitle.getBoundingClientRect().top + activeTitle.offsetHeight) {
        item.classList.remove(flowItemHideClass);
      } else if (item && activeTitle && item.getBoundingClientRect().top <= windowHeight) {
        item.classList.add(flowItemHideClass);
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  $(".flow-item--img").each(function () {
    var windowScrollTop = $(window).scrollTop(),
        elementOffsetTop = $(this).offset().top,
        element_h = $(this).height(),
        window_w = $(window).width(),
        window_h = $(window).height(),
        velocity = $(this).attr("data-velocity");
    if (windowScrollTop + window_h > elementOffsetTop && windowScrollTop < elementOffsetTop + element_h) {
      TweenLite.to($(this), 1.2, {
        yPercent: (windowScrollTop + window_h - elementOffsetTop) / window_h * velocity,
        ease: Power1.easeOut,
        overwrite: 0
      });
    }
    if (windowScrollTop == 0) {
      TweenLite.to($(this), 1.2, {
        yPercent: 0,
        ease: Power1.easeOut,
        overwrite: 0
      });
    }
  });
}

// hasClass Multiple support
$.fn.hasAnyClass = function () {
  for (var i = 0; i < arguments.length; i++) {
    if (this.hasClass(arguments[i])) {
      return true;
    }
  }
  return false;
};

$(document).ready(function () {

  setTimeout(function () {
    $('.js--splash').fadeOut();
    $('body').removeClass('body-splash');
  }, 1000);

  if (!$('html').hasAnyClass('mobile', 'tablet')) {
    setRevealJs();

    // set each-section margin-top
    $('.height-100').css('margin-top', window.innerHeight - 195);
  }

  if ($('html').hasClass('mobile') || $('html').hasClass('tablet')) {
    var mainBigTexts = document.querySelectorAll('.main-big-text');
    var closer = '';
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = mainBigTexts[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var item = _step6.value;

        if (item.getBoundingClientRect().top <= windowHeight) {
          var matchTitle = item.dataset.match;
          closer = matchTitle;
        }
        ACTIVE_PAGE = closer;
        setActives();
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }

  setActives();

  if (!$('html').hasAnyClass('trident', 'edge', 'mobile', 'tablet')) {
    $("body").niceScroll({
      cursorcolor: "#292929",
      cursorwidth: "7px",
      cursorborderradius: "0",
      cursorborder: "none",
      cursoropacitymin: 1
    });
  }

  // ------- on scroll

  $(window).scroll(function (event) {
    if (!$('html').hasAnyClass('mobile', 'tablet')) {
      setRevealJs();
    }

    if ($('html').hasClass('mobile') || $('html').hasClass('tablet')) {
      var _mainBigTexts = document.querySelectorAll('.main-big-text');
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = _mainBigTexts[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _item2 = _step7.value;

          if (_item2.getBoundingClientRect().top < windowHeight && _item2.getBoundingClientRect().top > 0) {
            var _matchTitle = _item2.dataset.match;
            ACTIVE_PAGE = _matchTitle;
            setActives();
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }

    var castLogo = document.querySelector('.js--cast-logo');
    var row = document.querySelectorAll('.row[data-matchrow=' + ACTIVE_PAGE + ']')[0];
    // const rows = document.querySelectorAll('.row')

    // for (let row of rows) {
    // }
    if (row.getBoundingClientRect().top > castLogo.getBoundingClientRect().bottom) {
      castLogo.classList.remove('cast-logo__small');
    } else if (row.getBoundingClientRect().top < castLogo.getBoundingClientRect().bottom) {
      if (row.getBoundingClientRect().bottom - 60 < castLogo.getBoundingClientRect().top) {
        castLogo.classList.remove('cast-logo__small');
      } else {
        castLogo.classList.add('cast-logo__small');
      }
    } else {
      castLogo.classList.add('cast-logo__small');
    }
  });

  // ------- CLICKS  

  $(document).on('click', '.js-vertical-nav--logo', function () {
    var headerNav = $('.header-nav');
    if (headerNav.hasClass('header-nav--show')) {
      headerNav.removeClass('header-nav--show');
      if ($('html').hasAnyClass('mobile', 'tablet')) $.scrollLock(false);
    } else {
      headerNav.addClass('header-nav--show');
      if ($('html').hasAnyClass('mobile', 'tablet')) $.scrollLock(true);
    }
  });

  $(document).on('click', '.js-vertical-nav--item, .js-primary-nav--item', function () {
    if (!NAV_ACTIVE) return;

    if ($('html').hasAnyClass('mobile', 'tablet')) {
      var headerNav = $('.header-nav');
      $.scrollLock(false);
      headerNav.removeClass('header-nav--show');
    }

    var thisMatch = $(this).attr('data-match');
    NAV_ACTIVE = false;

    $('html, body').animate({ scrollTop: $('#page_' + thisMatch).offset().top }, 500, function () {
      NAV_ACTIVE = true;
    });
  });

  $(document).on('mouseenter', '[data-ref]', function () {
    $('[data-ref]').removeClass('data-ref__active');
    $('[data-ref=' + $(this).attr('data-ref') + ']').addClass('data-ref__active');
  });
});

$(window).on('resize', function () {
  if (!$('html').hasAnyClass('mobile', 'tablet')) {
    // set each-section margin-top
    $('.height-100').css('margin-top', window.innerHeight - 195);
  }
});