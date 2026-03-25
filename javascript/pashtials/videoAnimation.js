export function initVideoAnimation() {

    const MOBILE_BREAKPOINT = 575;
    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    // ---- Čuva originalni sadržaj svake sekcije ----
    $('.video-section').each(function () {
        const $wrapper = $(this).find('.video-slide-wrapper');
        if (!$wrapper.data('original-html')) {
            $wrapper.data('original-html', $wrapper.html());
        }
    });

    // ---- MOBILNI: kreira 2 scroll trake ----
    function buildMobileTracks(section) {
        const $wrapper = $(section).find('.video-slide-wrapper');

        // Vrati na originalni HTML
        const originalHtml = $wrapper.data('original-html');
        if (originalHtml) {
            $wrapper.html(originalHtml);
        }

        const $title = $wrapper.find('.video-title');
        const $video = $wrapper.find('.central-video');
        const $button = $wrapper.find('.video-button');
        const $imgs = $wrapper.find('.floating-img');

        if ($imgs.length === 0) return;

        const imgs = $imgs.toArray();
        const group1 = imgs.slice(0, 3);
        const group2 = imgs.slice(3, 6);

        const $track1 = $('<div>').addClass('mobile-scroll-track');
        const $track2 = $('<div>').addClass('mobile-scroll-track');

        group1.forEach(img => {
            const $clone = $(img).clone().attr('class', '').removeAttr('style');
            $track1.append($clone);
        });

        group2.forEach(img => {
            const $clone = $(img).clone().attr('class', '').removeAttr('style');
            $track2.append($clone);
        });

        $imgs.hide();

        $wrapper.empty();
        $wrapper.append($title);
        $wrapper.append($track1);
        $wrapper.append($video);
        $wrapper.append($button);
        $wrapper.append($track2);

        // Lightbox
        $track1.find('img').add($track2.find('img')).on('click', function () {
            const imgSrc = $(this).attr('src');
            const $lb = $('<div>').addClass('image-lightbox-overlay').hide();
            const $img = $('<img>').attr('src', imgSrc).addClass('image-lightbox-img');
            $lb.append($img);
            $('body').append($lb);
            $lb.fadeIn(300);
            $lb.on('click', function () { $(this).fadeOut(300, function () { $(this).remove(); }); });
            $(document).on('keyup.lightbox', function (e) {
                if (e.key === 'Escape') { $lb.click(); $(document).off('keyup.lightbox'); }
            });
        });
    }

    // ---- DESKTOP: vraća originalni HTML ----
    function restoreDesktop(section) {
        const $wrapper = $(section).find('.video-slide-wrapper');
        const originalHtml = $wrapper.data('original-html');
        if (originalHtml) {
            $wrapper.html(originalHtml);
            $wrapper.find('.floating-img').on('click', function () {
                const imgSrc = $(this).attr('src');
                const $lb = $('<div>').addClass('image-lightbox-overlay').hide();
                const $img = $('<img>').attr('src', imgSrc).addClass('image-lightbox-img');
                $lb.append($img);
                $('body').append($lb);
                $lb.fadeIn(300);
                $lb.on('click', function () { $(this).fadeOut(300, function () { $(this).remove(); }); });
            });
        }
    }

    // ---- Animacija MOBILNI ----
    function animateMobileTracks(section) {
        $(section).find('.mobile-scroll-track img').each(function (index) {
            const $img = $(this);
            setTimeout(function () {
                $img.css({ 'opacity': '1', 'transform': 'translateY(0)' });
            }, index * 100);
        });
    }

    // ---- Animacija DESKTOP ----
    function animateImagesRandom(section) {
        const $images = $(section).find('.animated-img');
        if ($images.length === 0) return;
        const shuffled = $images.toArray().sort(() => Math.random() - 0.5);
        $(shuffled).each(function (index) {
            const $img = $(this);
            setTimeout(function () { $img.addClass('drop-in'); }, index * 150);
        });
    }

    // ---- Observer ----
    let observer = null;

    function startObserver() {
        if (observer) observer.disconnect();
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (isMobile()) { animateMobileTracks(entry.target); }
                    else { animateImagesRandom(entry.target); }
                } else {
                    if (!isMobile()) { $(entry.target).find('.animated-img').removeClass('drop-in'); }
                }
            });
        }, { threshold: 0.2 });
        $('.video-section').each(function () { observer.observe(this); });
    }

    // ---- Setup layout ----
    function setupLayout() {
        if (isMobile()) {
            $('.video-section').each(function () { buildMobileTracks(this); });
        } else {
            $('.video-section').each(function () { restoreDesktop(this); });
        }
        startObserver();
    }

    // ---- Pokreni ----
    setupLayout();

    // ---- Resize - samo kada se prelazi breakpoint ----
    let resizeTimer;
    let lastMobile = isMobile();

    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const nowMobile = isMobile();
            if (nowMobile !== lastMobile) {
                lastMobile = nowMobile;
                setupLayout();
            }
        }, 300);
    });
}