// Load the data from the API
axios.get('https://collection-api.aucklandmuseum.com/api/v3/opacobjects?facetedResults=true')
  .then(function (response) {
    // Extract the data we need from the response
    const opacObjects = response.data.opacObjects;
    const totalObjects = response.data.totalObjects;
    const facets = response.data.facetsCollection.facets;

    // Display the total number of objects
    const resultsContainer = document.getElementById('results');
    const totalObjectsElement = document.createElement('p');
    totalObjectsElement.textContent = `Total objects: ${totalObjects}`;
    resultsContainer.appendChild(totalObjectsElement);

    // Create a table to display the facets
    const tableElement = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    // Add the header row to the table
    const headerRow = document.createElement('tr');
    const facetHeader = document.createElement('th');
    const valueHeader = document.createElement('th');
    facetHeader.textContent = 'Facet';
    valueHeader.textContent = 'Value';
    headerRow.appendChild(facetHeader);
    headerRow.appendChild(valueHeader);
    tableHeader.appendChild(headerRow);
    tableElement.appendChild(tableHeader);

    // Add the facet rows to the table
    facets.forEach(function (facet) {
      const facetRow = document.createElement('tr');
      const facetName = document.createElement('td');
      const facetValue = document.createElement('td');
      facetName.textContent = facet.facet;
      facetValue.textContent = facet.facetLabelValues[0].label;
      facetRow.appendChild(facetName);
      facetRow.appendChild(facetValue);
      tableBody.appendChild(facetRow);
    });

    tableElement.appendChild(tableBody);
    resultsContainer.appendChild(tableElement);

    // Create a pie chart to show the number of objects by collection area
    const chartContainer = document.getElementById('chart');
    const chartData = facets.find(function (facet) {
      return facet.facetId === 'collection_area';
    }).facetLabelValues.map(function (labelValue) {
      return { x: labelValue.label, y: labelValue.value };
    });
    const chartOptions = { chart: { type: 'pie' }, series: [{ data: chartData }] };
    const chart = new ApexCharts(chartContainer, chartOptions);
    chart.render();
  })
  .catch(function (error) {
    console.error(error);
  });
