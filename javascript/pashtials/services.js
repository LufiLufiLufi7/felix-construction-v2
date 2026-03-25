// NAPRAVILA SAM DINAMICKE SEKCIJE JER SE PONAVLJAJU SVE


export const services = [
    {
        id: 'adaptations',
        title: 'Adaptations',
        video: 'IqAcRAYZT14',
        about: 'We provide complete building adaptations tailored to residential and commercial spaces. Our team transforms existing structures to meet new functional, aesthetic, and technical requirements while maintaining structural integrity.',
        images: [
            'images/adaptation1.png',
            'images/adaptacije2.png',
            'images/adaptacije3.png',
            'images/adaptacije4.png',
            'images/adaptacije5.png',
            'images/adaptacije6.png'
        ]
    },
    {
        id: 'renovations',
        title: 'Renovations',
        video: 'aefO0N_DFWw',
        about: 'Felix Construction specializes in full and partial renovations, including apartments, houses, and commercial properties. We modernize interiors and exteriors, improving comfort, value, and visual appeal through high-quality workmanship.',
        images: [
            'images/starakuca1.png',
            'images/novakuca3.png',
            'images/starakuca4.png',
            'images/novakuca2.png',
            'images/starakuca3.png',
            'images/novakuca1.png'
        ]
    },
    {
        id: 'roughConstruction',
        title: 'Rough Construction',
        video: 'AKu_DpPDATM',
        about: 'Our rough construction services include structural works such as walls, slabs, and concrete elements. We ensure precise execution, durability, and a solid foundation for all further construction phases.',
        images: [
            'images/gradj1.png',
            'images/gradj2.png',
            'images/gradj3.png',
            'images/gradj4.png',
            'images/gradj5.png',
            'images/gradj6.png'
        ]
    },
    {
        id: 'doors',
        title: 'Doors',
        video: 'faLJJfb9Xb8',
        about: 'We install interior and exterior doors with precision and attention to detail. Our solutions combine functionality, security, and modern design, suitable for residential and commercial buildings.',
        images: [
            'images/door1.avif',
            'images/door2.png',
            'images/door3.png',
            'images/door4.png',
            'images/door5.png',
            'images/door6.png'
        ]
    },
    {
        id: 'windows',
        title: 'Windows',
        video: 'WCRNWU06m3I',
        about: 'Professional window installation that improves energy efficiency, sound insulation, and aesthetics. We work with modern materials and ensure accurate fitting for long-lasting performance.',
        images: [
            'images/stariprozor1.png',
            'images/noviprozor2.png',
            'images/stariprozor3.png',
            'images/noviprozor1.png',
            'images/stariprozor2.png',
            'images/noviprozor3.png'
        ]
    },
    {
        id: 'flooring',
        title: 'Flooring',
        video: 'NWVm-3992XY',
        about: 'We offer high-quality flooring installation, including laminate, parquet, vinyl, and ceramic floors. Our flooring solutions enhance durability, comfort, and the overall appearance of your space.',
        images: [
            'images/staripod1.png',
            'images/staripod2.png',
            'images/staripod3.png',
            'images/novipod1.png',
            'images/novipod2.png',
            'images/novipod3.png'
        ]
    },
    {
        id: 'tilework',
        title: 'Tile Work',
        video: 'SiJRIYyx6zA',
        about: 'Expert tile installation for bathrooms, kitchens, and other areas. We ensure precise alignment, clean finishes, and durable surfaces using high-quality materials.',
        images: [
            'images/starakuhinja.png',
            'images/novakuhinja1.png',
            'images/novakuhinja2.png',
            'images/novakuhinja3.png',
            'images/novakuhinja4.png',
            'images/novakuhinja5.png'
        ]
    },
    {
        id: 'knauf',
        title: 'Drywall & Knauf',
        video: 'g_8Im5vsL5I',
        about: 'We specialize in drywall and Knauf systems, including partitions, suspended ceilings, and decorative elements. These solutions provide flexibility, fast installation, and modern interior design.',
        images: [
            'images/suviradovi1.avif',
            'images/suviradovi2.avif',
            'images/suviradovi3.avif',
            'images/suciradovi3.jpg',
            'images/suviradovi5.avif',
            'images/suviradovi6.avif'
        ]
    },
    {
        id: 'electricalInstallation',
        title: 'Electrical Installation',
        video: 'HmNiKM2qI2M?start=48',
        about: 'Our electrical installation services cover complete wiring, panel upgrades, and smart home systems. We ensure safe, code-compliant installations for residential and commercial properties.',
        images: [
            'images/electrical1.avif',
            'images/electrical2.avif',
            'images/electrical3.avif',
            'images/electrical4.avif',
            'images/electrical5.avif',
            'images/electrical6.avif'
        ]
    },
    {
        id: 'plumbingworks',
        title: 'Plumbing Works',
        video: 'zP41dDtb-2I',
        about: 'Complete plumbing solutions including installation, repair, and renovation of water supply and drainage systems. We work with modern materials to ensure reliability and longevity.',
        images: [
            'images/starokupatilo1.png',
            'images/novokupatilo2.png',
            'images/starokupatilo3.png',
            'images/novokupatilo1.png',
            'images/starokupatilo2.png',
            'images/novokupatilo3.png'
        ]
    },
    {
        id: 'insulation',
        title: 'Insulation',
        video: '92uoeBvcfMA',
        about: 'High-performance insulation solutions for walls, roofs, and floors. Our insulation services improve energy efficiency, reduce noise, and create more comfortable living and working environments.',
        images: [
            'images/insulation1.avif',
            'images/insulation2.avif',
            'images/insulation3.avif',
            'images/insulation4.avif',
            'images/insulation5.webp',
            'images/insulation6.jpg'
        ]
    },
    {
        id: 'maintenance',
        title: 'Building Maintenance',
        video: 'AEBnPVrAUdM',
        about: 'Comprehensive building maintenance services to keep your property in top condition. From routine inspections to emergency repairs, our team ensures your building remains safe, functional, and well-maintained.',
        images: [
            'images/odrzavanje1.jpeg',
            'images/odrzavanje2.jpg',
            'images/odrzavanje3.jpg',
            'images/odrzavanje4.jpg',
            'images/odrzavanje5.jpg',
            'images/odrzavanje6.avif'
        ]
    }
];

export function initServices() {
    const container = document.getElementById('services-container');
    if (!container) return;

    let html = '';

    services.forEach((service, index) => {
        // Generiše slike
        const imagesHtml = service.images.map((src, i) => `
            <img src="${src}" class="floating-img animated-img img-${i + 1}" alt="Slika ${i + 1}">
        `).join('');

        // Generiše sekciju
        html += `
        <section id="${service.id}" class="video-section">
            <div class="container-fluid m-0">
                <div class="video-slide-container">
                    <div class="video-slide-wrapper">

                        <h2 class="video-title crna-slova">${service.title}</h2>

                        <div class="central-video">
                            <div class="video-flip-container">
                                <div class="video-front">
                                    <iframe src="https://www.youtube.com/embed/${service.video}?controls=1&autoplay=0&mute=1"
                                        title="YouTube video" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen>
                                    </iframe>
                                </div>
                                <div class="video-back">
                                    <div class="video-back-content">
                                        <h3 class="zuta-slova mb-3">About ${service.title}</h3>
                                        <p class="text-dark mb-0">${service.about}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button class="btn-custom btn-yellow video-button flip-trigger">More</button>

                        ${imagesHtml}
                    </div>
                </div>
            </div>
        </section>
        `;

        // Separator linija između sekcija (ne posle poslednje)
        if (index < services.length - 1) {
            html += `
        <section class="container">
            <div class="col-12 py-4">
                <p class="crna-linija2"></p>
            </div>
        </section>
            `;
        }
    });

    container.innerHTML = html;
}










