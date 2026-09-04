// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Navbar shadow
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link on scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksMenu.classList.toggle('active');
});

// Tutup menu saat link diklik (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksMenu.classList.remove('active');
    });
});

// ===== ANIMASI COUNTER =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            return;
        }
        el.textContent = current.toLocaleString();
        requestAnimationFrame(updateCounter);
    };

    updateCounter();
};

// Intersection Observer untuk memicu animasi counter
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            animateCounter(target);
            observer.unobserve(target);
        }
    });
}, observerOptions);

statNumbers.forEach(num => {
    observer.observe(num);
});

// ===== SMOOTH SCROLL UNTUK TOMBOL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== REVEAL ANIMASI SEDERHANA =====
const revealElements = document.querySelectorAll('.project-card, .cert-card, .skill-category, .edu-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===== PROJECT MEDIA MODAL FUNCTIONS =====
function openMediaModal(images, videoPath) {
    const modal = document.getElementById('projectMediaModal');
    const imgEl = document.getElementById('modalProjectImg');
    const videoSource = document.getElementById('modalVideoSource');
    const switchNav = document.getElementById('mediaSwitchNav');
    const videoContainer = document.getElementById('modalVideoContainer');
    const imgContainer = document.getElementById('modalImageContainer');
    
    // Set image
    imgEl.src = images[0];

    // Reset video
    const videoEl = document.getElementById('modalProjectVideo');
    videoEl.pause();
    videoEl.currentTime = 0;

    if (videoPath && videoPath !== '') {
        videoSource.src = videoPath;
        videoEl.load();
        switchNav.style.display = 'flex';
        // Default to image view
        imgContainer.style.display = 'block';
        videoContainer.style.display = 'none';
        document.getElementById('btnShowImg').classList.add('active');
        document.getElementById('btnShowVideo').classList.remove('active');
    } else {
        videoSource.src = '';
        switchNav.style.display = 'none';
        imgContainer.style.display = 'block';
        videoContainer.style.display = 'none';
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function switchMediaView(type) {
    const imgContainer = document.getElementById('modalImageContainer');
    const videoContainer = document.getElementById('modalVideoContainer');
    const btnImg = document.getElementById('btnShowImg');
    const btnVideo = document.getElementById('btnShowVideo');
    const videoEl = document.getElementById('modalProjectVideo');

    if (type === 'image') {
        imgContainer.style.display = 'block';
        videoContainer.style.display = 'none';
        videoEl.pause();
        btnImg.classList.add('active');
        btnVideo.classList.remove('active');
    } else {
        imgContainer.style.display = 'none';
        videoContainer.style.display = 'block';
        btnVideo.classList.add('active');
        btnImg.classList.remove('active');
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectMediaModal');
    const videoEl = document.getElementById('modalProjectVideo');
    videoEl.pause();
    videoEl.currentTime = 0;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== CERTIFICATE MODAL FUNCTIONS =====
function openCertModal(pdfPath, titleText) {
    const modal = document.getElementById('certPopupModal');
    const frame = document.getElementById('certPdfFrame');
    const titleEl = document.getElementById('certModalTitle');
    const downloadBtn = document.getElementById('certDownloadBtn');

    frame.src = pdfPath;
    titleEl.innerText = titleText;
    downloadBtn.href = pdfPath;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('certPopupModal');
    const frame = document.getElementById('certPdfFrame');
    frame.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== CLOSE MODAL ON CLICK OUTSIDE =====
window.onclick = function(event) {
    const pModal = document.getElementById('projectMediaModal');
    const cModal = document.getElementById('certPopupModal');
    if (event.target == pModal) {
        closeProjectModal();
    }
    if (event.target == cModal) {
        closeCertModal();
    }
}

// ===== CLOSE MODAL WITH ESC KEY =====
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const pModal = document.getElementById('projectMediaModal');
        const cModal = document.getElementById('certPopupModal');
        if (pModal.style.display === 'flex') {
            closeProjectModal();
        }
        if (cModal.style.display === 'flex') {
            closeCertModal();
        }
    }
});