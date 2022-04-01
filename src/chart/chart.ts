import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement
);

const app = document.querySelector('#app')


export const drawBar = (ox, oy) => {
  // const canv = document.querySelector(id);
  const canv = document.createElement('canvas')
  app.append(canv)
  const chart = new Chart(canv, {
    type: "bar",
    data: {
      labels: ox,
      datasets: [
        {
          data: oy,
        },
      ],
    },
  });

};

export const drawBarLine = (
  { ox: barOX, oy: barOY },
  { ox: lineOX, oy: lineOY }
) => {
  // const canv = document.querySelector(id);
  const canv = document.createElement('canvas')
  app.append(canv)

  const chart = new Chart(canv, {
    type: 'bar',
    data: {
      datasets: [
        {
          label: "Bar Dataset",
          data: barOY,
        },
        {
          type: "line",
          label: "Line Dataset",
          data: lineOY,
        },
      ],
      labels: barOX,
    },
  });
};
