// 用户认证相关功能

// DOM元素获取
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const registerLink = document.getElementById('register-link');
const loginModal = document.getElementById('login-modal');

// 登录表单提交事件
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // 简单表单验证
        if (!username || !password) {
            showError('用户名和密码不能为空');
            return;
        }

        try {
            // 发送登录请求到后端API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // 登录成功，保存用户信息
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);

                // 更新UI显示
                updateAuthUI();
                closeModal(loginModal);
                showSuccess('登录成功！');
            } else {
                showError(data.message || '登录失败，请检查用户名和密码');
            }
        } catch (error) {
            console.error('登录错误:', error);
            showError('服务器连接错误，请稍后再试');
        }
    });
}

// 注册表单提交事件
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();

        // 简单表单验证
        if (!username || !email || !password) {
            showError('用户名、邮箱和密码不能为空');
            return;
        }

        try {
            // 发送注册请求到后端API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // 注册成功，提示用户并关闭模态框
                closeModal(loginModal);
                showSuccess('注册成功，请登录！');
            } else {
                showError(data.message || '注册失败，请重试');
            }
        } catch (error) {
            console.error('注册错误:', error);
            showError('服务器连接错误，请稍后再试');
        }
    });
}

// 注册链接点击事件
if (registerLink) {
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        // 在实际应用中，这里可以切换到注册表单
        alert('注册功能即将上线，敬请期待！');
    });
}

// 显示错误消息
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// 显示成功消息
function showSuccess(message) {
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success';
    successAlert.textContent = message;
    successAlert.style.position = 'fixed';
    successAlert.style.top = '20px';
    successAlert.style.right = '20px';
    successAlert.style.padding = '15px 20px';
    successAlert.style.borderRadius = 'var(--border-radius)';
    successAlert.style.backgroundColor = 'var(--success-color)';
    successAlert.style.color = 'white';
    successAlert.style.zIndex = '1000';
    successAlert.style.boxShadow = 'var(--box-shadow)';
    successAlert.style.transition = 'all 0.3s ease';

    document.body.appendChild(successAlert);

    // 3秒后自动移除
    setTimeout(() => {
        successAlert.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successAlert);
        }, 300);
    }, 3000);
}

// 更新认证相关UI
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.querySelector('.auth-buttons');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    if (currentUser && authButtons) {
        // 用户已登录，隐藏登录/注册按钮，显示用户名和退出按钮
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';

        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <span class="username">${currentUser.fullName || currentUser.username}</span>
            <button id="logout-btn" class="btn btn-outline">退出</button>
        `;

        authButtons.appendChild(userMenu);

        // 添加退出按钮事件
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            window.location.reload();
        });
    }
}

// 页面加载时检查用户登录状态
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
});