document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("investmentChart");
  if (!ctx) return;

  // Apple-style color palette
  const colorPrimary = "#2d6a4f";
  const colorFill = "rgba(45, 106, 79, 0.05)"; // More subtle fill
  const gridColor = "rgba(0, 0, 0, 0.03)"; // Lighter grid
  const textMuted = "rgba(0, 0, 0, 0.4)";

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
            8500, 9200, 10100, 11200, 10500, 11500, 12500, 13000, 12800, 13500,
            14200, 15000,
          ],
          borderWidth: 1.5, // Slightly thinner line
          borderColor: colorPrimary,
          backgroundColor: colorFill,
          pointBackgroundColor: colorPrimary,
          pointBorderColor: "#fff",
          pointRadius: 3, // Smaller points
          pointHoverRadius: 5,
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Critical for fixed height
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#000",
          bodyColor: textMuted,
          borderColor: gridColor,
          borderWidth: 1,
          padding: 10, // Slightly smaller
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
          grid: { color: gridColor, drawBorder: false },
          ticks: {
            color: textMuted,
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
            padding: 10, // Prevent label crowding
          },
        },
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { color: textMuted, padding: 8 }, // Better spacing
        },
      },
    },
  });
});
