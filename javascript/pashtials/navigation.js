//DINAMICKI NAVIGACIONI MENI 
 
export function initNavigation() {

    let NAV_LINKS = [
        {
            url: "index.html",
            text: "Home",
        },

        {
            url: "services.html",
            text: "Construction Services",
        },

        {
            url: "autor.html",
            text: "About Autor",
        },

        {
            url:"MilenaZujovic170.24.docx",
            text: "Documentation",
            target: "_blank"
        },

        {
            url:"https://drive.google.com/drive/folders/1g9xVolwRE4dcH94Mz7fyO4P6WJgMAWC9",
            text:"Download"
        },

        { 
            url: "projects.html", 
            text: "Projects" 
        }
    ];
/*
    function navigationMaker(object) {
        let line = `<li class="nav-item beliOkvir "><a href="${object.url}" class="nav-link active text-black ">${object.text}</a></li>`;

        return line;
    }
        */

    function navigationMaker(object) {
        const target = object.target ? `target="${object.target}"` : '';
        let line = `<li class="nav-item beliOkvir"><a href="${object.url}" class="nav-link active text-black" ${target}>${object.text}</a></li>`;
        return line;
    }

    let code = "";

    NAV_LINKS.forEach(function(link) {
        code += navigationMaker(link);
    })

    let navContainer = document.querySelector(".main-navigation");
    if (navContainer) {
        navContainer.innerHTML = code;
    }


}