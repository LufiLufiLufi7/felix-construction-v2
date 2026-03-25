/*KADA KLIKNE NA VIDEO OKRENE SE VIDEO ZA 180STEPENI I PRIKAZE TEKST  */
/*
export function initVideoFlip() {
    let isFlipped = false;
    
    $('.flip-trigger').click(function() {
        const flipContainer = $('.video-flip-container');
        const $btn = $(this);
        
        if (!isFlipped) {
            // Flip na zadnju stranu
            flipContainer.addClass('flipped');
            $btn.text('Back to Video');
            isFlipped = true;
        } else {
            // Flip na prednju stranu
            flipContainer.removeClass('flipped');
            $btn.text('More');
            isFlipped = false;
        }
    });
}
    */

export function initVideoFlip() {
    
    // Koristimo event delegation na document nivou
    // Tako radi i nakon što JS rebuilda mobilni layout
    $(document).on('click', '.flip-trigger', function () {
        const $btn = $(this);
        const $flipContainer = $btn.closest('.video-slide-wrapper').find('.video-flip-container');
        
        if ($flipContainer.hasClass('flipped')) {
            $flipContainer.removeClass('flipped');
            $btn.text('More');
        } else {
            $flipContainer.addClass('flipped');
            $btn.text('Back to Video');
        }
    });
}








