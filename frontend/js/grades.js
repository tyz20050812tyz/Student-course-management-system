// 初始化成绩页面
function initGradesPage() {
    const gradesSearch = document.getElementById('grades-search');
    const gradesContent = document.getElementById('grades-content');

    // 模拟成绩数据
    const mockGrades = [
        { id: 1, course: '计算机科学导论', grade: 'A', semester: '2023 秋季' },
        { id: 2, course: '数据结构', grade: 'B+', semester: '2023 秋季' },
    ];

    // 显示成绩列表
    function displayGrades(grades) {
        gradesContent.innerHTML = grades.map(grade => `
            <div class="grade-card">
                <h3>${grade.course}</h3>
                <p>成绩: ${grade.grade}</p>
                <p>学期: ${grade.semester}</p>
            </div>
        `).join('');
    }

    // 搜索功能
    gradesSearch.addEventListener('input', () => {
        const query = gradesSearch.value.toLowerCase();
        const filteredGrades = mockGrades.filter(grade => 
            grade.course.toLowerCase().includes(query)
        );
        displayGrades(filteredGrades);
    });

    // 初始显示
    displayGrades(mockGrades);
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    const gradesPage = document.getElementById('grades');
    if (gradesPage) {
        initGradesPage();
    }
});