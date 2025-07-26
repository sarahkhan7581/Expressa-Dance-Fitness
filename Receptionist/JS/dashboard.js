document.addEventListener('DOMContentLoaded', () => {
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId);

        // Function to show the navbar in full
        const showNavbarFull = () => {
            nav.classList.add('show');
            bodypd.classList.add('body-pd');
            headerpd.classList.add('body-pd');
        };

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            // Show the navbar in full initially
            showNavbarFull();

            toggle.addEventListener('click', () => {
                // Toggle the navbar visibility
                nav.classList.toggle('show');
                bodypd.classList.toggle('body-pd');
                headerpd.classList.toggle('body-pd');
            });
        }
    };

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

});

