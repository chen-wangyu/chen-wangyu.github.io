document.addEventListener('DOMContentLoaded', function () {
    // 只在小屏幕时创建移动导航按钮
    if (window.innerWidth <= 768) {
        const mobileNavToggle = document.createElement('div');
        mobileNavToggle.className = 'mobile-nav-toggle';
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('header').appendChild(mobileNavToggle);

        const nav = document.querySelector('nav');

        // 点击按钮切换导航菜单
        mobileNavToggle.addEventListener('click', function (e) {
            e.stopPropagation(); // 阻止事件冒泡
            const isActive = nav.classList.contains('active');

            nav.classList.toggle('active');
            this.innerHTML = isActive
                ? '<i class="fas fa-bars"></i>'
                : '<i class="fas fa-times"></i>';
        });

        // 点击导航链接时关闭菜单
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    const body = document.body;

    mobileNavToggle.addEventListener('click', function () {
        const isActive = nav.classList.contains('active');

        // 切换导航菜单状态
        nav.classList.toggle('active');

        // 切换图标
        this.innerHTML = isActive
            ? '<i class="fas fa-bars"></i>'
            : '<i class="fas fa-times"></i>';

        // 防止背景滚动
        body.style.overflow = isActive ? '' : 'hidden';
    });

    // 点击导航链接时关闭菜单
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = '';
            }
        });
    });

    // 平滑滚动处理
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close mobile menu if open
    const nav = document.querySelector('nav');
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
        });
    }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
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

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Here you would typically send the form data to a server
        // For this static site, we'll just show a success message
        const formElements = contactForm.elements;
        let isValid = true;

        // Simple validation
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].required && !formElements[i].value) {
                isValid = false;
                formElements[i].classList.add('error');
            } else if (formElements[i].type === 'email' && formElements[i].value) {
                // Simple email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(formElements[i].value)) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            } else {
                formElements[i].classList.remove('error');
            }
        }

        if (isValid) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';

            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
}

// 自动滚动到 About 部分
setTimeout(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}, 4000);

// 点击滚动指示器滚动到 About 部分
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

