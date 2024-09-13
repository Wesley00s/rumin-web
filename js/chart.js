let charts = {};

// URLs para os endpoints da API
const userId = "produtor@gmail.com";
const propId = 'Propriedade 1';
const baseUrl = `http://0.0.0.0:8080/user/${userId}/property/${propId}/animals`;

// Função para buscar dados de uma API
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function renderCustomLegend(legendContainerId, labels, backgroundColors) {
  const legendContainer = document.getElementById(legendContainerId);
  legendContainer.innerHTML = ''; // Limpa qualquer conteúdo existente

  labels.forEach((label, index) => {
    const colorBox = document.createElement('span');
    colorBox.style.backgroundColor = backgroundColors[index];
    colorBox.style.width = '20px';
    colorBox.style.height = '20px';
    colorBox.style.display = 'inline-block';
    colorBox.style.marginRight = '2px';

    const labelText = document.createElement('span');
    labelText.innerText = label;

    const legendItem = document.createElement('div');
    legendItem.style.display = 'inline-flex';
    legendItem.style.alignItems = 'center';
    legendItem.style.marginRight = '5px';

    legendItem.appendChild(colorBox);
    legendItem.appendChild(labelText);
    legendContainer.appendChild(legendItem);
  });
}

function renderChart(canvasId, labels, data, title, chartType = 'bar') {
  const ctx = document.getElementById(canvasId).getContext('2d');

  // Se um gráfico já existir para esse canvas, destrua-o antes de criar um novo
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }

  const backgroundColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 205, 210, 0.6)',
    'rgba(174, 214, 241, 0.6)',
    'rgba(50, 200, 190, 0.6)',
    'rgba(250, 160, 241, 0.6)',
    'rgba(174, 45, 241, 0.6)',
  ];

  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 205, 210, 1)',
    'rgba(174, 214, 241, 1)',
    'rgba(50, 200, 190, 1)',
    'rgba(250, 160, 241, 1)',
    'rgba(174, 45, 241, 1)',
  ];

  // Crie o gráfico
  charts[canvasId] = new Chart(ctx, {
    type: chartType,  // Tipo de gráfico
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderColor: borderColors.slice(0, labels.length),
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false // Oculta a legenda padrão do Chart.js
        }
      }
    }
  });

  // Adiciona a legenda personalizada
  renderCustomLegend(`${canvasId}Legend`, labels, backgroundColors.slice(0, labels.length));
}


// Função para alterar o tipo de gráfico dinamicamente
function changeChartType(canvasId, newType) {
  const chart = charts[canvasId];
  if (chart) {
    const labels = chart.data.labels;
    const data = chart.data.datasets[0].data;
    const title = chart.data.datasets[0].label;
    renderChart(canvasId, labels, data, title, newType); // Recria o gráfico com o novo tipo
  }
}

// Funções para carregar e renderizar os gráficos
async function loadCategoryData() {
  const data = await fetchData(`${baseUrl}/categories`);
  const labels = Object.keys(data);
  const values = Object.values(data);
  renderChart('categoryChart', labels, values, 'Quantidade por Categoria');
}

async function loadBreedData() {
  const data = await fetchData(`${baseUrl}/breeds`);
  const labels = Object.keys(data);
  const values = Object.values(data);
  renderChart('breedChart', labels, values, 'Quantidade por Raça');
}

async function loadGenderData() {
  const data = await fetchData(`${baseUrl}/genders`);
  const labels = Object.keys(data);
  const values = Object.values(data);
  renderChart('genderChart', labels, values, 'Quantidade por Sexo');
}

// Função para obter e exibir o total de animais
async function loadTotalAnimals() {
  const data = await fetchData(`${baseUrl}/total`);
  const totalAnimalsElement = document.getElementById('totalAnimals');
  totalAnimalsElement.textContent = `Total de Animais: ${data.totalAnimals}`;
}

// Adiciona event listeners para alterar o tipo de gráfico
document.querySelectorAll('.btnBar').forEach((e) => {
  e.addEventListener('click', () => {
    const chartContainer = e.closest('.chart-container');
    const canvas = chartContainer.querySelector('canvas');
    const canvasId = canvas.id;
    changeChartType(canvasId, 'bar');
  });
});

document.querySelectorAll('.btnPie').forEach((e) => {
  e.addEventListener('click', () => {
    const chartContainer = e.closest('.chart-container');
    const canvas = chartContainer.querySelector('canvas');
    const canvasId = canvas.id;
    changeChartType(canvasId, 'pie');
  });
});

document.querySelectorAll('.btnLine').forEach((e) => {
  e.addEventListener('click', () => {
    const chartContainer = e.closest('.chart-container');
    const canvas = chartContainer.querySelector('canvas');
    const canvasId = canvas.id;
    changeChartType(canvasId, 'line');
  });
});

// Carregar todos os gráficos quando a página carregar
window.onload = () => {
  loadTotalAnimals();
  loadCategoryData();
  loadBreedData();
  loadGenderData();
};
