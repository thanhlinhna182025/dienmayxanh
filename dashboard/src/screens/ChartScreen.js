const ChartScreen = {
  after_render: () => {
    new Chart(document.getElementById("bar-chart"), {
      type: "bar",
      data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
            ],
            data: [2478, 5267, 734, 784, 433],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Predicted world population (millions) in 2050",
        },
      },
    });
  },
  render: () => {
    return `
    <div class="container">
      <div class="chart__container">
        <canvas id="bar-chart" width="400px" height="250px"></canvas>
      </div>
    </div>
    `;
  },
};
export default ChartScreen;
