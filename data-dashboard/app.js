let labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let dataValues = [2, 3, 4, 3, 5, 6, 4];

// 创建柱状图 + 平均线
let chart = new Chart(document.getElementById("studyChart"), {
    type: "bar",
    data: {
        labels: labels,
        datasets: [
            {
                label: "Study Hours",
                data: dataValues,
                backgroundColor: "#2c74cc"
            },
            {
                label: "Average Line",
                data: new Array(labels.length).fill(
                    dataValues.reduce((a, b) => a + b, 0) / dataValues.length
                ),
                type: "line",
                borderColor: "#231919",
                borderWidth: 3,
                fill: false
            }
        ]
    }
});

//饼图
new Chart(document.getElementById("taskChart"), {
    type: "pie",
    data: {
        labels: ["Study", "Life", "Project"],
        datasets: [{
            data: [50, 20, 30],
            backgroundColor: ["#404855", "#7c99ba", "#323c58"]
        
        }]
    }
});

// 添加数据
function addData() {
    let day = document.getElementById("day").value;
    let hours = document.getElementById("hours").value;

    if (day.trim() === "" || hours.trim() === "") {
        alert("Please enter valid data");
        return;
    }

    labels.push(day);
    dataValues.push(Number(hours));

    chart.destroy(); // 重新绘制

    chart = new Chart(document.getElementById("studyChart"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Study Hours",
                    data: dataValues,
                    backgroundColor: "#3f5e6e"
                },
                {
                    label: "Average Line",
                    data: new Array(labels.length).fill(
                        dataValues.reduce((a, b) => a + b, 0) / dataValues.length
                    ),
                    type: "line",
                    borderColor: "#0b0b0b",
                    borderWidth: 2,
                    fill: false
                }
            ]
        }
    });

    //更新平均值
    let avg = (dataValues.reduce((a, b) => a + b, 0) / dataValues.length).toFixed(2);
    document.getElementById("avgText").innerText =
        "Average Study Time: " + avg;

    document.getElementById("day").value = "";
    document.getElementById("hours").value = "";
}