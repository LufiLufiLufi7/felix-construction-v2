/*OVDE SAM IMPORTOVALA SVE FUNKCIJE I FAJLOVE */
import { initServiceButtons } from "./pashtials/buttonServices.js";

import { initServices } from "./pashtials/services.js";

import { initNavigation } from "./pashtials/navigation.js";
import { initAnimations } from "./pashtials/animations.js";
import { initButtons } from "./pashtials/button.js";
import { initFAQSection } from "./pashtials/faqsection.js";
import { initButtonAnimation } from "./pashtials/animation.js";
import { initVideoAnimation } from "./pashtials/videoAnimation.js";
import { initImageLightbox } from "./pashtials/bigimgCenter.js";
import { initSocialAnimation } from "./pashtials/animacijaikonica.js";
import { initContactForm } from "./pashtials/forma.js";
import { initVideoFlip } from "./pashtials/flipvideo.js";
import { initButtonsResponsive } from "./pashtials/buttonskrol.js";
import { initCounter } from "./pashtials/counter.js";




/*dohvatam */
$(document).ready(function() {
    console.log("Radi");
});
$(document).ready(function() {
    initVideoAnimation();
});
$(document).ready(function() {
    initSocialAnimation();
});


/*IME FUNKCIJE: */
initServiceButtons()
initServices();
initNavigation();
initAnimations();
initButtons();
initFAQSection();
initButtonAnimation();
initImageLightbox();
initSocialAnimation();
initContactForm();
initVideoAnimation();
initVideoFlip();
initButtonsResponsive();
initCounter()
