/*GALERIJA ANIMACIJA */


export function initAnimations() {

    let player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('ytVideo');
    }


    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('.slikesastrane img');


        images.forEach(img => {



            img.addEventListener('click', () => {
                const isActive = img.classList.toggle('active'); /*dodaje/uklanja */
                if (isActive) {
                    player.pauseVideo();
                }
                else {
                    player.playVideo();
                }
            })

            
        });


        /*ANIMACIJE SLIKA */
        const section = document.querySelector('.sekcijagalerije1');
        const leftImages = document.querySelector('.slikesastrane.left');
        const rightImages = document.querySelector('.slikesastrane.right');


        if (!section || !leftImages || !rightImages) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    leftImages.classList.add('animate-in');
                    rightImages.classList.add('animate-in');
                    const videoWrapper = document.querySelector('.videogalerija'); // <- dodano
                    videoWrapper.classList.add('animate-in');
                    observer.unobserve(section); //samo jednom
                }
            });
        }, { threshold: 0.3 });

        observer.observe(section);



    });


    console.log('nestooooo')

}

