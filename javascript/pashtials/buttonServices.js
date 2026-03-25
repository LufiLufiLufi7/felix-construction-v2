//Dinamicki ispisane cigle



import { services } from "./services.js";


export function initServiceButtons() {
    const container = document.getElementById('buttons-container');
    if (!container) return;

    const btnClasses = ['btn-outline', 'btn-yellow'];
    
    // Definisi koliko dugmadi ide u svaki red i da li ima offset
    const rows = [
        { count: 3, offset: false },
        { count: 2, offset: true },
        { count: 3, offset: false },
        { count: 2, offset: true },
        { count: 2, offset: false }
    ];

    let html = '';
    let serviceIndex = 0;

    rows.forEach(row => {
        for (let i = 0; i < row.count; i++) {
            if (serviceIndex >= services.length) break;
            
            const service = services[serviceIndex];
            const btnClass = btnClasses[serviceIndex % 2];
            const offsetClass = (i === 0 && row.offset) ? 'offset-lg-2' : '';

            html += `
            <div class="col-12 col-md-6 col-lg-4 ${offsetClass}">
                <button onclick="location.href='#${service.id}'"
                    class="btn-custom ${btnClass} w-100">${service.title}</button>
            </div>
            `;
            serviceIndex++;
        }
    });

    container.innerHTML = html;
}