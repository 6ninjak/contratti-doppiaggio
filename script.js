// script.js

let tables = document.querySelectorAll("table");
tables.forEach((table) => {
  table.addEventListener(
    "load",
    loadCSVOnTable(table.getAttribute("data-src"), table)
  );
});

function mostraSezione(idSezione) {
  // Nascondi tutte le sezioni
  const tutteLeSezioni = document.querySelectorAll("main section");
  tutteLeSezioni.forEach((sezione) => {
    sezione.classList.add("hidden");
  });

  // Mostra solo la sezione selezionata
  const sezioneSelezionata = document.getElementById(idSezione);
  sezioneSelezionata.classList.remove("hidden");
}

// load and save data CSV

function loadCSVOnTable(filename, table) {
  fetch("./data/" + filename)
    .then((response) => response.text())
    .then((csvText) => {
      // Split the CSV data into rows
      const rowData = csvText.split("\n");
      // <table > <thead>
      var theadEl = table.getElementsByTagName("thead")[0];
      theadEl.innerHTML = "";
      // Insert a row at the end of table
      var newRow = theadEl.insertRow();
      // Split by comma (,) to get column Array
      let headerRowColData = rowData[0].split(",").map((x) => x.trim());
      // Loop on the row column Array
      for (var col = 0; col < headerRowColData.length; col++) {
        // Insert a cell at the end of the row
        var headerCell = document.createElement("th");
        headerCell.innerHTML = headerRowColData[col];
        newRow.appendChild(headerCell);
      }

      // <table > <tbody>
      var tbodyEl = table.getElementsByTagName("tbody")[0];
      tbodyEl.innerHTML = "";

      // Loop on the row Array
      for (var row = 1; row < rowData.length; row++) {
        // Insert a row at the end of table
        var newRow = tbodyEl.insertRow();
        // Split by comma (,) to get column Array
        let rowColData = rowData[row].split(",").map((x) => x.trim());
        // Loop on the row column Array
        for (var col = 0; col < rowColData.length; col++) {
          // Insert a cell at the end of the row
          var newCell = newRow.insertCell();
          newCell.innerHTML = rowColData[col].trim();
          newCell.setAttribute("data-title", headerRowColData[col]);
        }
      }
    });

  //     return new Promise((resolve) => {
  //         const path = './data/' + filename;
  //         const rawData = fs.readFileSync(path, 'utf-8');
  //         const parsedData = parseCSV(rawData);
  //         resolve(parsedData);
  //     });
}

function saveCSV(data, filename) {
  const csv = d3.csvFormat(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
