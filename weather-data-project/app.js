let chart;

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        const data = parseCSV(text);

        console.log("Data:", data); // 调试用

        displayAnalysis(data);
        drawChart(data);
    };

    reader.readAsText(file);
});

// 解析CSV
function parseCSV(text) {
    const rows = text.trim().split('\n').slice(1);

    return rows.map(row => {
        const [date, temp] = row.split(',');
        return {
            date: date,
            temp: parseFloat(temp)
        };
    });
}

// 平均值
function calculateAverage(data) {
    const sum = data.reduce((acc, cur) => acc + cur.temp, 0);
    return (sum / data.length).toFixed(2);
}

// 趋势
function calculateTrend(data) {
    const first = data[0].temp;
    const last = data[data.length - 1].temp;

    if (last > first) return "Increasing";
    if (last < first) return "Decreasing";
    return "Stable";
}

// 预测（最近3天平均）
function predictTemperature(data) {
    const recent = data.slice(-3);
    const avg = recent.reduce((acc, cur) => acc + cur.temp, 0) / recent.length;
    return avg.toFixed(2);
}

// 显示分析结果
function displayAnalysis(data) {
    document.getElementById('avg').innerText =
        "Average Temp: " + calculateAverage(data);

    document.getElementById('trend').innerText =
        "Trend: " + calculateTrend(data);

    document.getElementById('prediction').innerText =
        "Predicted Temp: " + predictTemperature(data);
}

// 画图
function drawChart(data) {
    const labels = data.map(d => d.date);
    const temps = data.map(d => d.temp);

    const ctx = document.getElementById('chart');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: temps,
                fill: false,
                tension: 0.1
            }]
        }
    });
}