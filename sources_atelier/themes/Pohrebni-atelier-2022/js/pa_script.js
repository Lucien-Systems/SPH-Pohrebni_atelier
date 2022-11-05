var searchContainer = document.querySelector('#search-results');
var searchTerm = document.querySelector('#search-input');
var debounce;

var observer = new MutationObserver(function(mutations) {

    Array.prototype.forEach.call(mutations, function(el, i){
        if (el.type === 'childList') {
            el.removedNodes.forEach(
                function(node) {
                    if (node.classList && node.classList.contains('search-loading')) {
                        clearTimeout(debounce);
                        debounce = setTimeout( 
                          function () {
                            if (searchTerm.value) {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                    'searchTerm': searchTerm.value,
                                    'event' : 'searchComplete'
                                });
                                console.log('The search term was', searchTerm.value);
                            }
                          }, 2000
                        );
                    }
                }
            );
        }
    });
 
});
observer.observe(searchContainer, {childList: true, subtree: true});

// Force max-width on split column image when it is in fixed scroll mode because we restrict width of content to 1440px
// and it was built to be 100vw minus padding
$(document).ready(function() {
  if ($('.split-scroll').length) {
        // console.log('split scroll found');
        var splitImage, splitText;
        $('.split-scroll').each(function() {
            splitImage = $(this).find('.split-image');
            splitText = $(this).find('.split-text');
            $(splitImage).attr('style', 'max-width: '+$(splitText).width()+'px !important');
            // console.log(splitImage);
        });
    }
});

