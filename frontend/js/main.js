// 页面导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const browseCoursesBtn = document.getElementById('browse-courses-btn');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-btn');

    // 页面导航函数
    function navigateTo(pageId) {
        // 隐藏所有页面
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // 移除所有导航链接的active类
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // 显示目标页面
        document.getElementById(pageId).classList.add('active');

        // 激活对应的导航链接
        const activeLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            navigateTo(pageId);
        });
    });

    // 浏览课程按钮点击事件
    if (browseCoursesBtn) {
        browseCoursesBtn.addEventListener('click', function() {
            navigateTo('courses');
        });
    }

    // 模态框控制
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    }

    // 登录按钮点击事件
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openModal(loginModal);
        });
    }

    // 关闭按钮点击事件
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal(loginModal);
        });
    }

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModal(loginModal);
        }
    });

    // 初始化 - 显示首页
    navigateTo('home');

    // 模拟加载课程数据
    loadCourses();
});

// 模拟加载课程数据
function loadCourses() {
    // 在实际应用中，这里会通过API从后端获取数据
    const courses = [
        {
            code: 'CS101',
            title: '计算机科学导论',
            description: '介绍计算机科学基础知识和编程概念',
            credits: 3,
            teacher: '王教授'
        },
        {
            code: 'MA202',
            title: '高等数学II',
            description: '深入学习微积分和线性代数知识',
            credits: 4,
            teacher: '李教授'
        },
        {
            code: 'PH101',
            title: '大学物理',
            description: '物理学基本原理和实验方法',
            credits: 4,
            teacher: '张教授'
        },
        {
            code: 'EN103',
            title: '英语写作',
            description: '提升学术英语写作能力',
            credits: 2,
            teacher: '刘教授'
        }
    ];

    const courseList = document.getElementById('course-list');
    if (!courseList) return;

    // 清空现有内容（保留第一个示例卡片作为模板）
    const templateCard = courseList.querySelector('.course-card');
    courseList.innerHTML = '';

    // 添加课程卡片
    courses.forEach(course => {
        const card = templateCard.cloneNode(true);
        card.querySelector('.course-code').textContent = course.code;
        card.querySelector('.course-title').textContent = course.title;
        card.querySelector('.course-description').textContent = course.description;
        card.querySelector('.credits').textContent = `${course.credits}学分`;
        card.querySelector('.teacher').textContent = course.teacher;
        courseList.appendChild(card);
    });
}