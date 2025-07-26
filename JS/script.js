const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide() {
    slides.forEach(slide => slide.style.display = 'none');
    currentSlide = (currentSlide + 1) % slides.length;
    setTimeout(showSlide, 5000); // Change slide every 5 seconds
}
showSlide();

function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('popup');
    if (overlay.style.display === 'flex') {
        popup.classList.remove('show');
        setTimeout(() => overlay.style.display = 'none', 300);
    } else {
        overlay.style.display = 'flex';
        setTimeout(() => popup.classList.add('show'), 50);
    }
}

function openTab(event, tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
}


// Get all elements with the class "animate-on-scroll"
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle the scroll event
function handleScroll() {
    animatedElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    });
}

// Add a scroll event listener to the window
window.addEventListener('scroll', handleScroll);

// Initial check on page load
handleScroll();



function openNav() {
    document.getElementById("mySidepanel").style.display = "block";
    document.getElementById("mySidepanel").style.width = "220px";
}

function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("mySidepanel").style.display = "none";
}

function closeNavOnClick() {
    closeNav();
}

function closeNavOnClick() {
    closeNav();
    document.getElementById("mysidepanel").style.width = "0";

}

function openNav1() {
    var navbar = document.getElementById("Sidepanel");
    var openbtn = document.querySelector('.openbtn1');
    var closebtn = document.querySelector('.closebtn1');

    navbar.style.width = "250px";
    openbtn.style.display = "none";
    closebtn.style.display = "block";
}

function closeNav1() {
    var navbar = document.getElementById("Sidepanel");
    var openbtn = document.querySelector('.openbtn1');
    var closebtn = document.querySelector('.closebtn1');

    navbar.style.width = "0";
    openbtn.style.display = "block";
    closebtn.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    // Get scroll buttons
    const scrollLeftBtns = document.querySelectorAll('.scroll-left');
    const scrollRightBtns = document.querySelectorAll('.scroll-right');

    // Add click event listeners to scroll buttons
    scrollLeftBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            scrollGallery(btn.parentElement.nextElementSibling, 'left');
        });
    });

    scrollRightBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            scrollGallery(btn.parentElement.nextElementSibling, 'right');
        });
    });

    // Function to scroll the gallery
    function scrollGallery(container, direction) {
        const scrollAmount = 300; // Adjust as needed
        if (direction === 'left') {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else if (direction === 'right') {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const arrowButton = document.getElementById('arrowButton');
    const closeButton = document.getElementById('closeButton');
    const branchInfo = document.getElementById('branchInfo');
    const videoBackground = document.getElementById('video-background');
    const branchButtons = document.querySelectorAll('.branch-button');
    let isOpen = false;

    function toggleBranchInfo() {
        if (isOpen) {
            branchInfo.style.right = '-300px';
            arrowButton.style.display = 'block';
        } else {
            branchInfo.style.right = '0';
            arrowButton.style.display = 'none';
        }
        isOpen = !isOpen;
    }

    arrowButton.addEventListener('click', toggleBranchInfo);
    closeButton.addEventListener('click', toggleBranchInfo);

    branchButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoSrc = this.getAttribute('data-video');
            changeVideo(videoSrc);
        });
    });

    function changeVideo(src) {
        videoBackground.innerHTML = `
                    <source src="${src}" type="video/mp4">
                    Your browser does not support the video tag.
                `;
        videoBackground.load();
        videoBackground.play();
    }
});