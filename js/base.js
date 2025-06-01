// 当前页面高亮菜单项
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// 直接跳转到主页（用于密码页）
function checkPassword() {
    window.location.href = 'index.html';
}

// 禁止右击
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// 禁止选中文本
document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

// 禁止复制
document.addEventListener('copy', function (e) {
    e.preventDefault();
});

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

document.addEventListener('keydown', preventKeyEvents, true);
document.addEventListener('keypress', preventKeyEvents, true);
document.addEventListener('keyup', preventKeyEvents, true);

// 切换页面隐藏时尝试防截图（预留）
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        tryToPreventScreenshot(); // 此函数未定义，可按需实现
    }
});

// 自动填充密码框（用于 password 页面）
document.addEventListener('DOMContentLoaded', () => {
    const savedPassword = sessionStorage.getItem('saved_password');
    if (savedPassword) {
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.value = savedPassword;
        }
    }
});

// 判断是否为首次访问 index.html，跳转 welcome.html
const currentPage = window.location.pathname.split('/').pop();
const firstVisit = sessionStorage.getItem('first_visit_index');
if (currentPage === 'index.html' && firstVisit !== 'false') {
    sessionStorage.setItem('first_visit_index', 'false');
    window.location.href = 'welcome.html';
}

// 打开 WhatsApp 联系按钮
function openWhatsApp() {
    const params = new URLSearchParams(window.location.search);
    let contactNumber = params.get('contact');

    if (!contactNumber) {
        contactNumber = sessionStorage.getItem('whatsapp_contact');
    }

    let whatsappUrl;
    if (contactNumber && /^[0-9]+$/.test(contactNumber)) {
        whatsappUrl = `https://wa.me/${contactNumber}`;
    } else {
        whatsappUrl = 'https://wa.me/'; // 默认号码
    }

    window.open(whatsappUrl, '_blank');
}

// 注册按钮跳转
function goToRegistration() {
    const params = new URLSearchParams(window.location.search);
    let code = params.get('code');

    if (!code) {
        code = sessionStorage.getItem('invite_code');
    }

    if (!code) {
        code = '';
    }

    const registrationUrl = `https://www.nexterazm.org/account/signUp?code=${code}`;
    window.open(registrationUrl, '_blank');
}
