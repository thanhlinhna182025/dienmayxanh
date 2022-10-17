const DashBoardScreen = {
  after_render: () => {
    const ctx1 = document.getElementById("myChart1").getContext("2d");
    const myChart1 = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              font: 24,
            },
          },
        },
      },
    });
    const ctx2 = document.getElementById("myChart2").getContext("2d");
    const myChart2 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    const ctx3 = document.getElementById("myChart3").getContext("2d");
    const myChart3 = new Chart(ctx3, {
      type: "polarArea",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: {
              datasets: [
                { fill: "origin" }, // 0: fill to 'origin'
                { fill: "+2" }, // 1: fill to dataset 3
                { fill: 1 }, // 2: fill to dataset 1
                { fill: false }, // 3: no fill
                { fill: "-2" }, // 4: fill to dataset 2
                { fill: { value: 25 } }, // 5: fill to axis value 25
              ],
            },
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    const ctx4 = document.getElementById("myChart4").getContext("2d");
    const myChart4 = new Chart(ctx4, {
      type: "polarArea",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: {
              datasets: [
                { fill: "origin" }, // 0: fill to 'origin'
                { fill: "+2" }, // 1: fill to dataset 3
                { fill: 1 }, // 2: fill to dataset 1
                { fill: false }, // 3: no fill
                { fill: "-2" }, // 4: fill to dataset 2
                { fill: { value: 25 } }, // 5: fill to axis value 25
              ],
            },
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },
  render: () => {
    return `
    <div class="wrapper">
      <div class="statistical__container">
        <div class="statistical-item">
          <p class="title">Turnover</p>
          <div class="item-bottom">
            <i class="fa-solid fa-coins"></i>
            <div class="content">
              <span>123456779</span>
              <span>Total sales</span>
            </div>
          </div>
        </div>
        <div class="statistical-item">
          <p class="title">Turnover</p>
          <div class="item-bottom">
            <i class="fa-solid fa-coins"></i>
            <div class="content">
              <span>123456779</span>
              <span>Total sales</span>
            </div>
          </div>
        </div>
        <div class="statistical-item">
          <p class="title">Turnover</p>
          <div class="item-bottom">
            <i class="fa-solid fa-coins"></i>
            <div class="content">
              <span>123456779</span>
              <span>Total sales</span>
            </div>
          </div>
        </div>
        <div class="statistical-item">
          <p class="title">Turnover</p>
          <div class="item-bottom">
            <i class="fa-solid fa-coins"></i>
            <div class="content">
              <span>123456779</span>
              <span>Total sales</span>
            </div>
          </div>
        </div>
      </div>
      <div class ="chart__container">
        <canvas id="myChart1" class="chart"></canvas>
        <canvas id="myChart2" class="chart"></canvas>
        <canvas id="myChart3" class="chart"></canvas>
        <canvas id="myChart4" class="chart"></canvas>
      </div>

    </div>`;
  },
};
export default DashBoardScreen;
