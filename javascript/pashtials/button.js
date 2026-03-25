/** 
Inicijalizuje interaktivnu dugmad na sajtu.
Koristi jQuery za inicijalizaciju
*/
export function initButtons() {
    // Dodaj dugme u body
    const $btn = $('<button class="to-top-btn"><i class="fa fa-arrow-up"></i></button>');
    $('body').append($btn);

    // Prikazuj dugme kad se skroluje više od 400px
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 400) {
            $btn.fadeIn();
        } else {
            $btn.fadeOut();
        }
    });

    // Klik na dugme vraća na vrh
    $btn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
}