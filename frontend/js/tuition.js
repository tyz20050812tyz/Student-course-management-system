// 初始化学费页面
function initTuitionPage() {
    const tuitionSearch = document.getElementById('tuition-search');
    const tuitionContent = document.getElementById('tuition-content');

    // 模拟学费数据
    const mockTuition = [
        { id: 1, semester: '2023 秋季', amount: '5000 元', status: '已支付' },
        { id: 2, semester: '2024 春季', amount: '5500 元', status: '未支付' },
    ];

    // 显示学费列表
    function displayTuition(tuition) {
        tuitionContent.innerHTML = tuition.map(item => `
            <div class="tuition-card">
                <h3>学期: ${item.semester}</h3>
                <p>金额: ${item.amount}</p>
                <p>状态: ${item.status}</p>
            </div>
        `).join('');
    }

    // 搜索功能
    tuitionSearch.addEventListener('input', () => {
        const query = tuitionSearch.value.toLowerCase();
        const filteredTuition = mockTuition.filter(item => 
            item.semester.toLowerCase().includes(query) || item.status.toLowerCase().includes(query)
        );
        displayTuition(filteredTuition);
    });

    // 初始显示
    displayTuition(mockTuition);
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    const tuitionPage = document.getElementById('tuition');
    if (tuitionPage) {
        initTuitionPage();
    }
});