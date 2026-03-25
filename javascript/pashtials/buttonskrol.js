/*RESPONSIVE FUNKCIJA ZA BUTTON KADA JE NA TELEFONU  */

export function initButtonsResponsive() {
    
    const $container = $('.sadrzaj-text');
    const $buttonsRow = $('#buttons-container');
    
    function addScrollContainer() {
        if ($(window).width() < 768) {
            // Wrap buttone u scroll container
            if (!$buttonsRow.parent().hasClass('scroll-wrapper')) {
                $buttonsRow.wrap('<div class="scroll-wrapper"></div>');
                
                // Dodaj CSS dinamički
                $('.scroll-wrapper').css({
                    'max-height': '600px',
                    'overflow-y': 'auto',
                    'padding-right': '10px'
                });
            }
        } else {
            // Ukloni scroll wrapper na desktop-u
            if ($buttonsRow.parent().hasClass('scroll-wrapper')) {
                $buttonsRow.unwrap();
            }
        }
    }
    
    addScrollContainer();
    
    $(window).on('resize', addScrollContainer);
}