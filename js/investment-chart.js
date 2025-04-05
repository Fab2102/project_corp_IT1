document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("investmentChart");
  if (!ctx) return;

  // Custom plugin to clip the dataset drawing area from left to right
  const leftToRightAnimationPlugin = {
    id: "leftToRightAnimation",
    beforeDatasetsDraw(chart) {
      // If the initial animation is complete, do nothing
      if (chart.$initialAnimationComplete) {
        return;
      }
      const { ctx, chartArea } = chart;
      const progress = chart.$leftToRightAnimationProgress || 0;
      ctx.save();
      ctx.beginPath();
      const clipWidth = chartArea.width * progress;
      ctx.rect(chartArea.left, chartArea.top, clipWidth, chartArea.height);
      ctx.clip();
    },
    afterDatasetsDraw(chart) {
      chart.ctx.restore();
    },
  };

  // Register the custom plugin with Chart.js
  Chart.register(leftToRightAnimationPlugin);

  // Function to create the chart
  const createChart = () => {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Portfolio Value",
            data: [
              8500, 9200, 10100, 11200, 10500, 11500, 12500, 13000, 12800,
              13500, 14200, 15000,
            ],
            borderWidth: 1.5,
            borderColor: "#2d6a4f",
            backgroundColor: "rgba(45, 106, 79, 0.05)",
            pointBackgroundColor: "#2d6a4f",
            pointBorderColor: "#fff",
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          easing: "easeInOutQuad",
          duration: 1400,
          onProgress: function (animation) {
            const chart = animation.chart;
            chart.$leftToRightAnimationProgress =
              animation.currentStep / animation.numSteps;
          },
          onComplete: function (animation) {
            const chart = animation.chart;
            chart.$leftToRightAnimationProgress = 1;
            chart.$initialAnimationComplete = true; // Set flag so plugin stops clipping on redraws
          },
        },
        animations: {
          hover: {
            duration: 0, // Disable animation on hover
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#000",
            bodyColor: "rgba(0, 0, 0, 0.4)",
            borderColor: "rgba(0, 0, 0, 0.03)",
            borderWidth: 1,
            padding: 10,
            usePointStyle: true,
            callbacks: {
              label: function (context) {
                return " $" + context.parsed.y.toLocaleString();
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: { color: "rgba(0, 0, 0, 0.03)", drawBorder: false },
            ticks: {
              color: "rgba(0, 0, 0, 0.4)",
              callback: function (value) {
                return "$" + value.toLocaleString();
              },
              padding: 10,
            },
          },
          x: {
            grid: { display: false, drawBorder: false },
            ticks: { color: "rgba(0, 0, 0, 0.4)", padding: 8 },
          },
        },
      },
    });
  };

  // Create an IntersectionObserver to detect when the chart is in view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          createChart();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(ctx);
});
