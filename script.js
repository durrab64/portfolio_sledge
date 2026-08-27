/* =============================================
   Muhammad Durrab Portfolio – script.js
============================================= */

// ─── Particle Canvas ────────────────────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 18), 70);
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.5 + 0.15,
            color: Math.random() > 0.5 ? '124,58,237' : '37,99,235',
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x, dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    animFrame = requestAnimationFrame(drawParticles);
}

function initParticles() {
    resizeCanvas();
    createParticles();
    cancelAnimationFrame(animFrame);
    drawParticles();
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

initParticles();


// ─── Navbar ─────────────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveLink();
    updateBackToTop();
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// Close on outside click
document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    }
});


// ─── Active Nav Link ─────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}


// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});


// ─── Skill Bars ──────────────────────────────────────────────────────────────
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            const width = bar.dataset.width;
            setTimeout(() => { bar.style.width = width + '%'; }, 200);
        });
    }
}, { threshold: 0.3 });

if (skillsSection) skillObserver.observe(skillsSection);


// ─── Portfolio Data ──────────────────────────────────────────────────────────
// To add a new item, add an object to this array and place the asset file in
// the corresponding folder.
//
// Thumbnail / Branding / Motion items:
//   { category: 'thumbnail'|'branding'|'motion', title, catLabel, image, description }
//
// Instagram items:
//   { category: 'instagram', title, image, description (optional), instagramUrl (optional) }
//
// YouTube Shorts items:
//   { category: 'shorts', title, video, poster, description (optional), youtubeUrl (optional) }

const portfolioData = [

    // ── Thumbnails ────────────────────────────────────────────────────────────
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Arslan Ash – Pro Gamer',
        image: 'thumbnails/arslan ash.pngcpy.png',
        description: 'High-impact gaming thumbnail for top Tekken pro player.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Claudio – Cinematic Edit',
        image: 'thumbnails/claudio thumbnail.png cpy.png',
        description: 'Cinematic character-focused thumbnail with strong typography.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Dominant',
        image: 'thumbnails/dominant cpy.jpg',
        description: 'Power-forward thumbnail communicating dominance and authority.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Feng – Character Art',
        image: 'thumbnails/feng gay.png',
        description: 'Character-driven thumbnail with expressive visual language.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Alisa – Bad Matchup',
        image: 'thumbnails/alisa_bad_matchup.jpg',
        description: 'Strategic thumbnail highlighting competitive gaming dynamics.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Atif – Destroyed Me',
        image: 'thumbnails/atif but destroyed me.png',
        description: 'Intense gaming moment captured in thumbnail design.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Low vs Butt – Reaction',
        image: 'thumbnails/lowvsbutt_reaction.jpg',
        description: 'Reaction thumbnail for viral gaming content.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Shani King',
        image: 'thumbnails/shaniking_cpy.jpg',
        description: 'Royal-themed thumbnail with bold visual impact.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Shani King – Vol. 2',
        image: 'thumbnails/shani_king_2_cpy.jpg',
        description: 'Sequel design maintaining strong brand identity.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Yosh – Gaming',
        image: 'thumbnails/yosh.jpgcy.jpg',
        description: 'Dynamic gaming thumbnail with engaging visuals.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Bebar Bhai',
        image: 'thumbnails/bebar bhai yt thumbnail 1.jpg',
        description: 'Custom YouTube thumbnail with bold visual design.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Ishn Williams vs Jac 8',
        image: 'thumbnails/ishn williams vs jac8.jpg',
        description: 'High-stakes match thumbnail capturing competitive intensity.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Law Buffed',
        image: 'thumbnails/lawbuffed.jpg',
        description: 'Punchy thumbnail focused on gameplay meta shift.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Tick Tick Tikok',
        image: 'thumbnails/tickticktikok.jpg',
        description: 'Energetic thumbnail with vibrant visual storytelling.',
    },
    {
        category: 'thumbnail',
        catLabel: 'Thumbnail Design',
        title: 'Williams vs Abid Rajpoot',
        image: 'thumbnails/williams vs abid rajpoot.jpg',
        description: 'Rivalry match thumbnail with striking character contrast.',
    },
    // ── Motion Graphics ───────────────────────────────────────────────────────
    {
        category: 'motion',
        catLabel: 'Motion Edit',
        title: 'Never Give Up',
        image: 'thumbnails/never give up cpy.jpg',
        description: 'Motivational video edit with dynamic visual pacing.',
    },
    {
        category: 'motion',
        catLabel: 'Motion Edit',
        title: 'Never Give Up – Ep. 2',
        image: 'thumbnails/never give up2  cpy.jpg',
        description: 'Continuation of a powerful inspirational video series.',
    },
    {
        category: 'motion',
        catLabel: 'Motion Edit',
        title: 'The Return',
        image: 'thumbnails/returncpy.jpg',
        description: 'Dramatic comeback video with high-energy motion design.',
    },
    {
        category: 'motion',
        catLabel: 'Motion Edit',
        title: 'Speed Edit',
        image: 'thumbnails/speed cpy.jpg',
        description: 'Fast-paced video edit showcasing technical motion skills.',
    },

    // ── Branding ──────────────────────────────────────────────────────────────
    {
        category: 'branding',
        catLabel: 'Branding',
        title: 'Brand Identity – Vol. 1',
        image: 'thumbnails/Artboard 1.png',
        description: 'Complete visual identity system for a modern brand.',
    },
    {
        category: 'branding',
        catLabel: 'Branding',
        title: 'Brand Identity – Vol. 2',
        image: 'thumbnails/Artboard 2.png',
        description: 'Cohesive brand system with typography and color design.',
    },
    {
        category: 'branding',
        catLabel: 'Branding',
        title: 'Social Media Kit',
        image: 'thumbnails/Artboard 3.png',
        description: 'Branded social media graphics for a consistent presence.',
    },
    {
        category: 'branding',
        catLabel: 'Branding',
        title: 'Visual Content Suite',
        image: 'thumbnails/Artboard 4.png',
        description: 'Multi-platform creative suite for digital-first brands.',
    },

    // ── Instagram Posts ───────────────────────────────────────────────────────
    {
        category: 'instagram',
        title: 'Social Post',
        image: 'portfolio/instagram/22.jpg',
        description: 'Gaming social media creative.',
    },
    {
        category: 'instagram',
        title: 'Chuch Edit',
        image: 'portfolio/instagram/chuchcuchuc.jpg',
        description: 'Eye-catching Instagram post design.',
    },
    {
        category: 'instagram',
        title: 'Haris – Post',
        image: 'portfolio/instagram/harissss.jpg',
        description: 'Clean and bold social media graphic.',
    },
    {
        category: 'instagram',
        title: 'Insta Post 2',
        image: 'portfolio/instagram/insta post 2.jpg',
        description: 'Scroll-stopping Instagram creative.',
    },

    // ── YouTube Shorts ────────────────────────────────────────────────────────
    {
        category: 'shorts',
        title: 'Resident Evil Shorts Edit',
        video: 'portfolio/shorts/Residen evil shorts edit.mp4',
        description: 'Cinematic short-form edit inspired by Resident Evil.',
    },
    {
        category: 'shorts',
        title: 'Wesker Edit',
        video: 'portfolio/shorts/Wesker edit.mp4',
        description: 'High-energy character edit featuring Wesker.',
    },
    {
        category: 'shorts',
        title: "Rabbi's Edit – Vol. 1",
        video: "portfolio/shorts/rabbi's edit 1.mp4",
        description: 'Short-form gaming edit, Vol. 1.',
    },
    {
        category: 'shorts',
        title: "Rabbi's Edit – Vol. 2",
        video: "portfolio/shorts/rabbi's edit 2.mp4",
        description: 'Short-form gaming edit, Vol. 2.',
    },
    {
        category: 'shorts',
        title: "Rabbi's Edit – Vol. 3",
        video: "portfolio/shorts/rabbi's edit 3.mp4",
        description: 'Short-form gaming edit, Vol. 3.',
    },
];



// ─── Card Renderers ───────────────────────────────────────────────────────────

function createImageCard(item) {
    const card = document.createElement('div');
    card.className = 'portfolio-card reveal-up';
    card.dataset.category = item.category;
    card.innerHTML = `
        <div class="portfolio-img-wrap">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="portfolio-overlay">
                <div class="portfolio-overlay-content">
                    <span class="portfolio-cat">${item.catLabel}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description || ''}</p>
                </div>
            </div>
        </div>`;
    return card;
}

function createInstagramCard(item) {
    const card = document.createElement('div');
    card.className = 'portfolio-card portfolio-card--instagram reveal-up';
    card.dataset.category = 'instagram';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View Instagram post: ${item.title}`);
    card.innerHTML = `
        <div class="portfolio-img-wrap portfolio-img-wrap--square">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="portfolio-overlay">
                <div class="portfolio-overlay-content">
                    <span class="portfolio-cat">
                        <i class="fab fa-instagram"></i> Instagram
                    </span>
                    <h3>${item.title}</h3>
                    ${item.description ? `<p>${item.description}</p>` : ''}
                </div>
            </div>
            <div class="card-badge card-badge--instagram">
                <i class="fab fa-instagram"></i>
            </div>
        </div>`;

    const openModal = () => openInstagramModal(item);
    card.addEventListener('click', openModal);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });
    return card;
}

function createShortsCard(item) {
    const card = document.createElement('div');
    card.className = 'portfolio-card portfolio-card--shorts reveal-up';
    card.dataset.category = 'shorts';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View YouTube Short: ${item.title}`);

    card.innerHTML = `
        <div class="portfolio-img-wrap portfolio-img-wrap--vertical">
            <video
                class="shorts-preview-video"
                src="${item.video}"
                ${item.poster ? `poster="${item.poster}"` : ''}
                muted
                playsinline
                preload="none"
                loop
                tabindex="-1"
            ></video>
            <div class="portfolio-overlay">
                <div class="portfolio-overlay-content">
                    <span class="portfolio-cat">
                        <i class="fab fa-youtube"></i> YouTube Shorts
                    </span>
                    <h3>${item.title}</h3>
                    ${item.description ? `<p>${item.description}</p>` : ''}
                </div>
            </div>
            <div class="card-badge card-badge--shorts">
                <i class="fas fa-play"></i>
            </div>
            <div class="shorts-play-hint" aria-hidden="true">
                <i class="fas fa-play"></i>
            </div>
        </div>`;

    // ── Desktop hover-to-play ─────────────────────────────────────────────────
    const video = card.querySelector('.shorts-preview-video');
    let hoverTimeout;

    card.addEventListener('mouseenter', () => {
        hoverTimeout = setTimeout(() => {
            video.play().catch(() => {});
        }, 100);
    });
    card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        video.pause();
        video.currentTime = 0;
    });

    // ── Click / tap → open modal ──────────────────────────────────────────────
    const openModal = () => openShortsModal(item);
    card.addEventListener('click', openModal);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });

    return card;
}

function createEmptyState(filter) {
    const labels = {
        instagram: 'Instagram Posts',
        shorts: 'YouTube Shorts',
        thumbnail: 'Thumbnails',
        branding: 'Branding',
        motion: 'Motion',
        all: 'Portfolio items',
    };
    const label = labels[filter] || 'items';
    const div = document.createElement('div');
    div.className = 'portfolio-empty-state';
    div.innerHTML = `
        <div class="portfolio-empty-icon">
            ${filter === 'instagram'
                ? '<i class="fab fa-instagram"></i>'
                : filter === 'shorts'
                    ? '<i class="fab fa-youtube"></i>'
                    : '<i class="fas fa-images"></i>'}
        </div>
        <h3>Coming Soon</h3>
        <p>${label} will appear here once added.<br>Drop your files in the <code>portfolio/${filter}/</code> folder and update <code>portfolioData</code> in <code>script.js</code>.</p>`;
    return div;
}


// ─── Portfolio Render & Filter ────────────────────────────────────────────────
const portfolioGrid = document.getElementById('portfolioGrid');
let currentFilter = 'all';
let videoObserver = null;

// IntersectionObserver for lazy-loading Shorts video src
function setupVideoObserver() {
    if (videoObserver) videoObserver.disconnect();
    videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Only ensure preload is set to metadata once near viewport
                if (video.preload === 'none') video.preload = 'metadata';
            } else {
                if (!video.paused) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, { rootMargin: '200px 0px' });

    document.querySelectorAll('.shorts-preview-video').forEach(v => {
        videoObserver.observe(v);
    });
}

function renderPortfolioCards(filter) {
    // Clear grid
    portfolioGrid.innerHTML = '';

    const filtered = filter === 'all'
        ? portfolioData
        : portfolioData.filter(item => item.category === filter);

    if (filtered.length === 0) {
        portfolioGrid.appendChild(createEmptyState(filter));
        return;
    }

    filtered.forEach((item, i) => {
        let card;
        if (item.category === 'instagram') {
            card = createInstagramCard(item);
        } else if (item.category === 'shorts') {
            card = createShortsCard(item);
        } else {
            card = createImageCard(item);
        }

        // Stagger animation delay
        card.style.transitionDelay = `${i * 40}ms`;
        portfolioGrid.appendChild(card);
    });

    // Trigger scroll-reveal for newly added cards
    portfolioGrid.querySelectorAll('.reveal-up').forEach(el => {
        revealObserver.observe(el);
    });

    // Set up lazy video observer
    setupVideoObserver();
}

// Initial render
renderPortfolioCards('all');


// ─── Portfolio Filter ────────────────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;

        // Fade out grid, re-render, fade back in
        portfolioGrid.style.opacity = '0';
        portfolioGrid.style.transform = 'translateY(12px)';
        portfolioGrid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        setTimeout(() => {
            renderPortfolioCards(currentFilter);
            portfolioGrid.style.opacity = '1';
            portfolioGrid.style.transform = 'translateY(0)';
        }, 250);
    });
});


// ─── Instagram Modal ─────────────────────────────────────────────────────────
const instagramModal = document.getElementById('instagramModal');
const instagramModalImg = document.getElementById('instagramModalImg');
const instagramModalTitle = document.getElementById('instagramModalTitle');
const instagramModalDesc = document.getElementById('instagramModalDesc');
const instagramModalLink = document.getElementById('instagramModalLink');
const instagramModalClose = document.getElementById('instagramModalClose');

function openInstagramModal(item) {
    instagramModalImg.src = item.image;
    instagramModalImg.alt = item.title;
    instagramModalTitle.textContent = item.title;

    if (item.description) {
        instagramModalDesc.textContent = item.description;
        instagramModalDesc.style.display = 'block';
    } else {
        instagramModalDesc.style.display = 'none';
    }

    if (item.instagramUrl) {
        instagramModalLink.href = item.instagramUrl;
        instagramModalLink.style.display = 'inline-flex';
    } else {
        instagramModalLink.style.display = 'none';
    }

    instagramModal.classList.add('active');
    document.body.classList.add('modal-open');
    instagramModal.focus();
}

function closeInstagramModal() {
    instagramModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    instagramModalImg.src = '';
}

instagramModalClose.addEventListener('click', closeInstagramModal);
instagramModal.addEventListener('click', e => {
    if (e.target === instagramModal) closeInstagramModal();
});


// ─── Shorts Modal ─────────────────────────────────────────────────────────────
const shortsModal = document.getElementById('shortsModal');
const shortsModalVideo = document.getElementById('shortsModalVideo');
const shortsModalTitle = document.getElementById('shortsModalTitle');
const shortsModalDesc = document.getElementById('shortsModalDesc');
const shortsModalLink = document.getElementById('shortsModalLink');
const shortsModalClose = document.getElementById('shortsModalClose');
const shortsPlayPauseBtn = document.getElementById('shortsPlayPauseBtn');

function openShortsModal(item) {
    shortsModalVideo.src = item.video;
    shortsModalVideo.poster = item.poster || '';
    shortsModalVideo.load();
    shortsModalVideo.play().catch(() => {});

    shortsModalTitle.textContent = item.title;

    if (item.description) {
        shortsModalDesc.textContent = item.description;
        shortsModalDesc.style.display = 'block';
    } else {
        shortsModalDesc.style.display = 'none';
    }

    if (item.youtubeUrl) {
        shortsModalLink.href = item.youtubeUrl;
        shortsModalLink.style.display = 'inline-flex';
    } else {
        shortsModalLink.style.display = 'none';
    }

    updatePlayPauseIcon();
    shortsModal.classList.add('active');
    document.body.classList.add('modal-open');
    shortsModal.focus();
}

function closeShortsModal() {
    shortsModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    shortsModalVideo.pause();
    shortsModalVideo.src = '';
}

function updatePlayPauseIcon() {
    const icon = shortsPlayPauseBtn.querySelector('i');
    if (icon) {
        icon.className = shortsModalVideo.paused ? 'fas fa-play' : 'fas fa-pause';
    }
}

shortsModalClose.addEventListener('click', closeShortsModal);
shortsModal.addEventListener('click', e => {
    if (e.target === shortsModal) closeShortsModal();
});
shortsPlayPauseBtn.addEventListener('click', () => {
    if (shortsModalVideo.paused) {
        shortsModalVideo.play().catch(() => {});
    } else {
        shortsModalVideo.pause();
    }
    updatePlayPauseIcon();
});
shortsModalVideo.addEventListener('play', updatePlayPauseIcon);
shortsModalVideo.addEventListener('pause', updatePlayPauseIcon);


// ─── Global Escape key to close modals ───────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (instagramModal.classList.contains('active')) closeInstagramModal();
        if (shortsModal.classList.contains('active')) closeShortsModal();
    }
});


// ─── Contact Form ────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

// Initialize EmailJS with your public key
(function() {
    emailjs.init("Ee01GHui5AzXAk013");
})();

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            service_type: service,
            message: message,
            to_email: 'mhdurrabrehan@gmail.com'
        };

        // Send email using EmailJS
        emailjs.send('service_ywaqy2t', 'template_6v65k8s', templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
                formSuccess.classList.add('visible');
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
                    formSuccess.classList.remove('visible');
                }, 5000);
            }, (error) => {
                console.log('FAILED...', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Failed to Send</span>';
                alert('Sorry, there was an error sending your message. Please try again or contact me directly at mhdurrabrehan@gmail.com');

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
                }, 3000);
            });
    });
}


// ─── Back To Top ─────────────────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

function updateBackToTop() {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}


// ─── Smooth Scroll for all anchor links ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});


// ─── Cursor glow effect on hero ──────────────────────────────────────────────
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow1 = hero.querySelector('.hero-glow-1');
        if (glow1) {
            glow1.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`;
        }
    });
}
