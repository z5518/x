let img = new Image();
let canvas = document.getElementById('crop-canvas');
let ctx = canvas.getContext('2d');
let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let startX;
let startY;
let circleRadius;
let circleX;
let circleY;
let mainContainer = document.getElementById('main-container');
let minScale; // 新增变量，用于存储最小缩放比例

function openCropModal(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
            canvas.width = 400;
            canvas.height = 400;
            // 计算自适应缩放比例
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            scale = Math.max(scaleX, scaleY); // 使用 Math.max 使图片充满裁剪框
            minScale = scale; // 记录最小缩放比例
            offsetX = (canvas.width - img.width * scale) / 2;
            offsetY = (canvas.height - img.height * scale) / 2;
            circleRadius = Math.min(canvas.width, canvas.height) / 2;
            circleX = canvas.width / 2;
            circleY = canvas.height / 2;
            drawImage();
            document.getElementById('crop-modal').style.display = 'flex';
            mainContainer.classList.add('blur');
        };
    };
    reader.readAsDataURL(file);

    canvas.addEventListener('mousedown', startDrag);
    canvas.addEventListener('mousemove', drag);
    canvas.addEventListener('mouseup', endDrag);
    canvas.addEventListener('mouseout', endDrag);
}

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, img.width * scale, img.height * scale);
    // 移除绘制圆形选区边框的代码
    // ctx.beginPath();
    // ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    // ctx.strokeStyle = '#FFFFFF';
    // ctx.lineWidth = 2;
    // ctx.stroke();
}

function zoomIn() {
    scale *= 1.1;
    drawImage();
}

function zoomOut() {
    if (scale > minScale) { // 确保缩放比例不小于最小缩放比例
        scale /= 1.1;
        drawImage();
    }
}

function startDrag(e) {
    isDragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
}

function drag(e) {
    if (isDragging) {
        const dx = e.offsetX - startX;
        const dy = e.offsetY - startY;
        offsetX += dx;
        offsetY += dy;

        // 边界限制
        const minX = canvas.width - img.width * scale;
        const maxX = 0;
        const minY = canvas.height - img.height * scale;
        const maxY = 0;

        offsetX = Math.max(offsetX, minX);
        offsetX = Math.min(offsetX, maxX);
        offsetY = Math.max(offsetY, minY);
        offsetY = Math.min(offsetY, maxY);

        startX = e.offsetX;
        startY = e.offsetY;
        drawImage();
    }
}

function endDrag() {
    isDragging = false;
}

// 修改 cropAndSetAvatar 函数，接收一个参数来指定头像元素的 ID
function cropAndSetAvatar(avatarId) {
    const avatar = document.getElementById(avatarId);
    const circularCanvas = document.createElement('canvas');
    const circularCtx = circularCanvas.getContext('2d');
    circularCanvas.width = 2 * circleRadius;
    circularCanvas.height = 2 * circleRadius;

    circularCtx.beginPath();
    circularCtx.arc(circleRadius, circleRadius, circleRadius, 0, 2 * Math.PI);
    circularCtx.closePath();
    circularCtx.clip();

    const sourceX = circleX - circleRadius - offsetX;
    const sourceY = circleY - circleRadius - offsetY;
    circularCtx.drawImage(img, sourceX / scale, sourceY / scale, 2 * circleRadius / scale, 2 * circleRadius / scale, 0, 0, 2 * circleRadius, 2 * circleRadius);

    avatar.src = circularCanvas.toDataURL();
    closeCropModal();
}

function closeCropModal() {
    document.getElementById('crop-modal').style.display = 'none';
    canvas.removeEventListener('mousedown', startDrag);
    canvas.removeEventListener('mousemove', drag);
    canvas.removeEventListener('mouseup', endDrag);
    canvas.removeEventListener('mouseout', endDrag);
    mainContainer.classList.remove('blur');
}

function generateCertificate() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const joinDate = document.getElementById('joinDate').value;
    const avatar = document.getElementById('avatar');
    const nameDisplay = document.getElementById('nameDisplay');
    const phoneDisplay = document.getElementById('phoneDisplay');
    const joinDateDisplay = document.getElementById('joinDateDisplay');

    nameDisplay.textContent = `姓名: ${name}`;
    phoneDisplay.textContent = `手机号: ${phone}`;
    joinDateDisplay.textContent = `入职日期: ${joinDate}`;
}

function generateEmployeeBadge() {
    const name = document.getElementById('employee-name').value;
    const phone = document.getElementById('employee-phone').value;
    const joinDate = document.getElementById('employee-joinDate').value;
    const avatar = document.getElementById('employee-avatar');
    const nameDisplay = document.getElementById('employee-nameDisplay');
    const phoneDisplay = document.getElementById('employee-phoneDisplay');
    const joinDateDisplay = document.getElementById('employee-joinDateDisplay');

    nameDisplay.textContent = `姓名: ${name}`;
    phoneDisplay.textContent = `手机号: ${phone}`;
    joinDateDisplay.textContent = `入职日期: ${joinDate}`;
}