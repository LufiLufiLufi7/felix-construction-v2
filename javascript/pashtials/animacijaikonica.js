export function initSocialAnimation() {
    const socialLinks = $('.social-link');
    
    // Postavi početno stanje
    socialLinks.each(function() {
        $(this).css({
            'opacity': '0',
            'transform': 'translateX(-30px)',
            'transition': 'all 0.5s ease'
        });
    });
    
    // Animiraj svaki link sa odgodom
    socialLinks.each(function(index) {
        const $link = $(this);
        setTimeout(() => {
            $link.css({
                'opacity': '1',
                'transform': 'translateX(0)'
            });
        }, index * 150);
    });
    
    // Hover animacija - vrti ikonicu
    socialLinks.hover(
        function() {
            // Mouse enter - vrti ikonicu 360 stepeni
            $(this).find('i').css({
                'transform': 'rotate(360deg)',
                'transition': 'transform 0.6s ease'
            });
            $(this).css({
                'color': getHoverColor($(this))
            });
        },
        function() {
            // Mouse leave - vrati na početak
            $(this).find('i').css({
                'transform': 'rotate(0deg)'
            });
            $(this).css({
                'color': 'inherit'
            });
        }
    );
}


    