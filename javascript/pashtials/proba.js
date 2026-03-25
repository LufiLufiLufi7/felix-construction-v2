


export function initVideoAnimation() {
    
    function animateImagesRandom(section) {
        const $images = $(section).find('.animated-img');
        
        console.log('Animiram slike, broj:', $images.length);
        
        if ($images.length === 0) {
            console.warn('Nema slika za animaciju!');
            return;
        }
        
        // Nasumični redosled
        const shuffled = $images.toArray().sort(() => Math.random() - 0.5);
        
        $(shuffled).each(function(index) {
            const $img = $(this);
            
            setTimeout(function() {
                console.log('Animiram sliku', index);
                $img.addClass('drop-in');
            }, index * 150);
        });
    }
    
    // Intersection Observer - animira kada je sekcija vidljiva
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animiraj slike u ovoj sekciji
                animateImagesRandom(entry.target);
            } else {
                // Reset animacija kada sekcija nije vidljiva
                $(entry.target).find('.animated-img').removeClass('drop-in');
            }
        });
    }, {
        threshold: 0.3 // 30% sekcije mora biti vidljivo
    });
    
    // Osmatraj sve video sekcije
    $('.video-section').each(function() {
        observer.observe(this);
    });
}

