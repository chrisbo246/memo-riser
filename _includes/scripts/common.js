{% raw %}
(function ($, window, document) {
  'use strict';

  /**
  * Smooth scroll with anchors
  */

  var scrollTopDuration = 1000;
  $('a').filter('[href*="#"]').not('[href="#"]').not('[data-toggle="modal"]').not('[data-toggle="collapse"]').not('[data-toggle="tab"]').click(function (e) {
    //e.preventDefault();
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var $target = $(this.hash) || $('[name=' + this.hash.slice(1) +']');
      //var $target = $(this.hash).length ? $(this.hash) : $('[name=' + this.hash.slice(1) +']');
      //$target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {

        var $parents = $target.parents('.card');
        if ($parents.length) {
          var top = $parents.first().offset().top;
        } else {
          var top = $target.offset().top;
        }

        var paddingTop = parseFloat($('body').css('padding-top')) || 0;

        // Scroll up to target
        $('html, body').stop().animate({
          scrollTop: top - paddingTop
        }, scrollTopDuration, 'swing', function () {

          // Blink target (or section)
          var $sectionItems = $('label').filter('[data-section="' + $target.attr('id') + '"]');
          if ($sectionItems.length) {
            var $highlighted = $sectionItems;
          } else if ($target.is('h1, h2, h3, h4, a, p')) {
            var $highlighted = $target;
          }

          if ($highlighted) {
            var duration = 300;
            var repeat = 2;
            var interval = setInterval(function () {
              $highlighted.fadeToggle(duration);
            }, duration);
            setTimeout(function () {
              clearInterval(interval);
              $highlighted.fadeIn(duration);
            }, duration * repeat - duration);
          }

        });

        return false;

      }
    }
  });



  /**
  * Show/hide the scroll-to-top button according to scrollbar position
  */

  var scrollTopOffset;
  var scrollTopButtonFadeDuration = 300;
  var $links = $('a').filter('[href="#top"]');
  if ($links.length) {
    //var $links = $links.parents('.navbar').first() || $links;
    $links.fadeOut();         
    $(window).on('scroll', function() {
      var scrollHeight = $(document).height();
      if (scrollHeight > 0) {
        var scrollTop = $(this).scrollTop();
        var viewportHeight = $(window).height();
        var opacity = 1 - (scrollHeight - viewportHeight - scrollTop) / (scrollHeight - viewportHeight);
        if (scrollTop > (scrollTopOffset || viewportHeight)) {
          $links.stop().fadeTo(scrollTopButtonFadeDuration, opacity);
        } else {
          $links.stop().fadeOut(scrollTopButtonFadeDuration);
        }
      }
    });
  }



  /**
  * Store / restore with local storage
  */

  if (window.localStorage) {

    var namespace = encodeURIComponent(window.location.pathname);

    /**
    * Store / restore checked definitions
    */
    var $inputs = $(':checkbox, :radio'); //.filter('[id]');
    if ($inputs.length) {
      var $input, $label, name, id, checked, key, value;
      $inputs.each(function () {
        $input = $(this);
        $label = $input.parent('label');
        name = $input.attr('name');
        id = $input.attr('id');
        checked = $input.prop('checked');
        if (name) {
          key = name;
          value = JSON.parse(localStorage.getItem(namespace + ':' + key));
          if (value === $input.attr('value') && checked !== true) {
            $input.prop('checked', true).trigger('click');
            //console.log('restored', key, value);
          }
        } else if (id) {
          key = id;
          value = JSON.parse(localStorage.getItem(namespace + ':' + key));
          if (value !== null && checked !== value) {
            $input.prop('checked', value).trigger('click');
            //console.log('restored', key, value);
          }
        }
        if ($label.length && checked) {
          //$label.addClass('active');
        }
      });
      $inputs.on('change', function () {
        $input = $(this);
        key = $input.attr('name') || $input.attr('id');
        if (key) {
          value = JSON.stringify($input.attr('value') || $input.prop('checked'));
          localStorage.setItem(namespace + ':' + key, value);
          //console.log('stored', key, value);
        }
      });
    }


  }

})(window.jQuery, window, document);
{% endraw %}
