// 导航栏菜单切换
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// 点击空白处关闭导航栏
document.addEventListener('click', function (event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (navMenu.classList.contains('active') &&!isClickInsideMenu &&!isClickOnToggle) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// 示例交互：当页面加载完成后，给导航栏添加一个激活状态
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#nav-menu a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// 修改后的函数，直接跳转到主页
function checkPassword() {
    window.location.href = 'index.html';
}






// 禁止鼠标拖拽图片
const images = document.getElementsByTagName('img');
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('dragstart', function (e) {
        e.preventDefault();
    });
}

// 禁止使用所有 F 键以及 Ctrl、Alt、Shift 单独或组合按键
function preventKeyEvents(e) {
    const keyCode = e.keyCode || e.which;
    const isFKey = keyCode >= 112 && keyCode <= 123;
    const isCtrl = e.ctrlKey;
    const isAlt = e.altKey;
    const isShift = e.shiftKey;

    if (isFKey || isCtrl || isAlt || isShift) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

document.addEventListener('keydown', preventKeyEvents);
document.addEventListener('keypress', preventKeyEvents);
document.addEventListener('keyup', preventKeyEvents);

// 捕获阶段监听，提高优先级
document.addEventListener('keydown', preventKeyEvents, true);
document.addEventListener('keypress', preventKeyEvents, true);
document.addEventListener('keyup', preventKeyEvents, true);    





document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        tryToPreventScreenshot();
    }
});


// 保留的DOMContentLoaded事件
document.addEventListener('DOMContentLoaded', () => {
    const savedPassword = sessionStorage.getItem('saved_password');
    if (savedPassword) {
        document.getElementById('password').value = savedPassword;
    }
});

// 判断是否为首次访问 index.html
const currentPage = window.location.pathname.split('/').pop();
const firstVisit = sessionStorage.getItem('first_visit_index');
if (currentPage === 'index.html' && firstVisit!== 'false') {
    sessionStorage.setItem('first_visit_index', 'false');
    window.location.href = 'welcome.html';
}

// 处理客服按钮点击事件
function openWhatsApp() {
    const whatsappUrl = 'https://wa.me/85293847672';
    window.open(whatsappUrl, '_blank');
}