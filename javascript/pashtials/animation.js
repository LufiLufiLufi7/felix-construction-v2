
/*KADA OCITA STRANU/GALERIJU RECI PADAJU*/
/*Ovo je samo pomocu js-a */

export function initButtonAnimation() {
    const buttonContainers = document.querySelectorAll('#buttons-container > div');
    
    buttonContainers.forEach(container => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-80px)';
        container.style.transition = 'all 0.6s ease';
    });
    
    buttonContainers.forEach((container, index) => {
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, index * 120);
    });
}


