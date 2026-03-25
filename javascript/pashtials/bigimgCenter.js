//Kada klikneš na sliku, ona se poveća i prikaže na sredini ekrana preko ostatka stranice.

export function initImageLightbox() {
    
    $('.floating-img').on('click', function() {
        const imgSrc = $(this).attr('src');
        
        // Kreiraj lightbox sa CSS klasama
        const $lb = $('<div>').addClass('image-lightbox-overlay').hide();
        const $img = $('<img>').attr('src', imgSrc).addClass('image-lightbox-img');
        
        $lb.append($img);
        $('body').append($lb);
        
        // Animacija
        $lb.fadeIn(300);
        $('#projectCarousel').carousel('pause');
        
        // Zatvori
        $lb.on('click', function() {
            $(this).fadeOut(300, function() {
                $(this).remove();
            });
            $('#projectCarousel').carousel('cycle');
        });
        
        // ESC taster
        $(document).on('keyup.lightbox', function(e) {
            if (e.key === 'Escape') {
                $lb.click();
                $(this).off('keyup.lightbox');
            }
        });
    });
}