// ODBROJAVANJE BROJEVA 

export function initCounter() {
    
    function animateCounter($el, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            $el.text(Math.floor(start));
        }, 16);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ovde pronalazi sve fs-60 elemente i animira ih
                $(entry.target).find('.fs-60').each(function() {
                    const target = parseInt($(this).text());
                    animateCounter($(this), target, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    
    const statsSection = document.querySelector('.statistika-overlay');
    if (statsSection) observer.observe(statsSection);
}