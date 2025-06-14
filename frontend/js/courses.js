// 课程相关功能

// DOM元素获取
const courseList = document.getElementById('course-list');
const courseDetailModal = document.getElementById('course-detail-modal');
const closeDetailBtn = document.getElementById('close-detail-btn');
const enrollCourseBtn = document.getElementById('enroll-course-btn');
const courseDetailContent = document.getElementById('course-detail-content');

// 当前选中的课程
let selectedCourse = null;

// 页面加载时初始化课程列表事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 为课程卡片添加点击事件
    if (courseList) {
        courseList.addEventListener('click', function(e) {
            const courseCard = e.target.closest('.course-card');
            if (courseCard) {
                const courseCode = courseCard.querySelector('.course-code').textContent;
                showCourseDetail(courseCode);
            }
        });
    }

    // 关闭课程详情模态框
    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', function() {
            closeModal(courseDetailModal);
        });
    }

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === courseDetailModal) {
            closeModal(courseDetailModal);
        }
    });

    // 选课按钮点击事件
    if (enrollCourseBtn) {
        enrollCourseBtn.addEventListener('click', function() {
            enrollCourse(selectedCourse);
        });
    }
});

// 显示课程详情
function showCourseDetail(courseCode) {
    // 在实际应用中，这里会通过API从后端获取课程详情
    // 模拟课程详情数据
    const courses = [
        {
            code: 'CS101',
            title: '计算机科学导论',
            description: '介绍计算机科学基础知识和编程概念，包括算法、数据结构、计算机组成原理等内容。通过本课程，学生将掌握编程基础和计算机科学思维方式。',
            credits: 3,
            teacher: '王教授',
            email: 'wang@example.com',
            schedule: '周一 10:00-12:00, 周三 14:00-16:00',
            location: '计算机楼302',
            maxStudents: 60,
            currentStudents: 45,
            prerequisites: '无',
            syllabus: [
                '第1周: 计算机科学概述',
                '第2周: 算法基础',
                '第3周: 数据结构入门',
                '第4-8周: 编程实践',
                '第9-12周: 计算机组成原理',
                '第13-16周: 综合项目'
            ]
        },
        {
            code: 'MA202',
            title: '高等数学II',
            description: '深入学习微积分和线性代数知识，包括多变量函数、重积分、常微分方程、矩阵理论等内容。',
            credits: 4,
            teacher: '李教授',
            email: 'li@example.com',
            schedule: '周二 8:00-10:00, 周四 8:00-10:00',
            location: '教学楼205',
            maxStudents: 80,
            currentStudents: 72,
            prerequisites: '高等数学I',
            syllabus: [
                '第1-2周: 多变量函数',
                '第3-5周: 重积分',
                '第6-8周: 曲线积分与曲面积分',
                '第9-12周: 常微分方程',
                '第13-16周: 线性代数基础'
            ]
        },
        {
            code: 'PH101',
            title: '大学物理',
            description: '物理学基本原理和实验方法，包括力学、热学、电磁学等内容。',
            credits: 4,
            teacher: '张教授',
            email: 'zhang@example.com',
            schedule: '周一 14:00-16:00, 周五 10:00-12:00',
            location: '物理楼101',
            maxStudents: 50,
            currentStudents: 48,
            prerequisites: '高中物理',
            syllabus: [
                '第1-4周: 力学基础',
                '第5-8周: 波动光学',
                '第9-12周: 热学',
                '第13-16周: 电磁学基础'
            ]
        },
        {
            code: 'EN103',
            title: '英语写作',
            description: '提升学术英语写作能力，包括论文结构、引用格式、学术表达等内容。',
            credits: 2,
            teacher: '刘教授',
            email: 'liu@example.com',
            schedule: '周三 16:00-18:00, 周四 16:00-18:00',
            location: '外语楼203',
            maxStudents: 30,
            currentStudents: 25,
            prerequisites: '英语四级',
            syllabus: [
                '第1-2周: 学术写作基础',
                '第3-4周: 论文结构',
                '第5-8周: 引用与参考文献',
                '第9-12周: 不同类型学术文本写作',
                '第13-16周: 论文修改与润色'
            ]
        }
    ];

    // 查找选中的课程
    selectedCourse = courses.find(course => course.code === courseCode);
    if (!selectedCourse) return;

    // 填充课程详情内容
    if (courseDetailContent) {
        courseDetailContent.innerHTML = `
            <div class="course-header">
                <h3>${selectedCourse.code} - ${selectedCourse.title}</h3>
                <span class="badge">${selectedCourse.credits}学分</span>
            </div>
            <div class="course-info">
                <p><strong>课程描述:</strong> ${selectedCourse.description}</p>
                <p><strong>授课教师:</strong> ${selectedCourse.teacher} (${selectedCourse.email})</p>
                <p><strong>上课时间:</strong> ${selectedCourse.schedule}</p>
                <p><strong>上课地点:</strong> ${selectedCourse.location}</p>
                <p><strong>选课情况:</strong> ${selectedCourse.currentStudents}/${selectedCourse.maxStudents} 人</p>
                <p><strong>先修课程:</strong> ${selectedCourse.prerequisites}</p>
            </div>
            <div class="course-syllabus">
                <h4>课程大纲</h4>
                <ul>
                    ${selectedCourse.syllabus.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // 显示课程详情模态框
    if (courseDetailModal) {
        courseDetailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 选课功能
function enrollCourse(course) {
    if (!course) return;

    // 检查用户是否已登录
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // 用户未登录，显示登录模态框
        openModal(document.getElementById('login-modal'));
        showError('请先登录后再选课');
        return;
    }

    try {
        // 在实际应用中，这里会发送选课请求到后端API
        console.log(`选课请求: 用户选择了课程 ${course.code} - ${course.title}`);

        // 模拟选课成功
        showSuccess(`成功选择课程: ${course.title}`);
        closeModal(courseDetailModal);

        // 更新课程列表中的选课人数
        updateEnrollmentCount(course.code);
    } catch (error) {
        console.error('选课错误:', error);
        showError('选课失败，请稍后再试');
    }
}

// 更新课程列表中的选课人数
function updateEnrollmentCount(courseCode) {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        if (card.querySelector('.course-code').textContent === courseCode) {
            const enrollmentInfo = card.querySelector('.enrollment-info');
            if (enrollmentInfo) {
                // 解析当前人数并加1
                const currentCount = parseInt(enrollmentInfo.textContent.match(/(\d+)/)[1]);
                const maxCount = parseInt(enrollmentInfo.textContent.match(/\/(\d+)/)[1]);
                enrollmentInfo.textContent = `已选: ${currentCount + 1}/${maxCount}`;
            }
        }
    });
}

// 关闭模态框
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 显示错误消息
function showError(message) {
    const errorElement = document.getElementById('error-message') || document.createElement('div');
    errorElement.textContent = message;
    errorElement.style.color = 'var(--accent-color)';
    errorElement.style.margin = '10px 0';
    errorElement.style.padding = '10px';
    errorElement.style.borderRadius = 'var(--border-radius)';
    errorElement.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';

    if (!document.getElementById('error-message')) {
        errorElement.id = 'error-message';
        document.body.appendChild(errorElement);
        errorElement.style.position = 'fixed';
        errorElement.style.top = '20px';
        errorElement.style.right = '20px';
        errorElement.style.zIndex = '1000';
    }

    // 3秒后自动隐藏
    setTimeout(() => {
        errorElement.style.opacity = '0';
        setTimeout(() => {
            errorElement.style.display = 'none';
            errorElement.style.opacity = '1';
        }, 300);
    }, 3000);
}

// 显示成功消息
function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.textContent = message;
    successElement.style.color = 'white';
    successElement.style.margin = '10px 0';
    successElement.style.padding = '10px 20px';
    successElement.style.borderRadius = 'var(--border-radius)';
    successElement.style.backgroundColor = 'var(--success-color)';
    successElement.style.position = 'fixed';
    successElement.style.top = '20px';
    successElement.style.right = '20px';
    successElement.style.zIndex = '1000';
    successElement.style.boxShadow = 'var(--box-shadow)';
    successElement.style.transition = 'all 0.3s ease';

    document.body.appendChild(successElement);

    // 3秒后自动移除
    setTimeout(() => {
        successElement.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successElement);
        }, 300);
    }, 3000);
}