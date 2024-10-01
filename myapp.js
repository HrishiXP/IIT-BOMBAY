let chemicals = [
    { "id": 1, "name": "Ammonium Persulfate", "vendor": "LG Chem", "density": 3525.92, "viscosity": 60.631, "packaging": "Bag", "packSize": 100, "unit": "kg", "quantity": 6495.18 },
    { "id": 2, "name": "Caustic Potash", "vendor": "Formosa", "density": 3172.15, "viscosity": 48.22, "packaging": "Bag", "packSize": 100, "unit": "kg", "quantity": 8751.90 },
    { "id": 3, "name": "Dimethylaminopropylamino", "vendor": "LG Chem", "density": 8435.37, "viscosity": 12.62, "packaging": "Barrel", "packSize": 75, "unit": "L", "quantity": 5964.61 },
    { "id": 4, "name": "Mono Ammonium Phosphate", "vendor": "Sinopec", "density": 1597.65, "viscosity": 76.51, "packaging": "Bag", "packSize": 105, "unit": "kg", "quantity": 8183.73 },
    { "id": 5, "name": "Ferric Nitrate", "vendor": "DowDuPont", "density": 364.04, "viscosity": 14.90, "packaging": "Bag", "packSize": 105, "unit": "kg", "quantity": 4154.33 },
    { "id": 6, "name": "n-Pentane", "vendor": "Sinopec", "density": 4535.26, "viscosity": 66.76, "packaging": "N/A", "packSize": "N/A", "unit": "t", "quantity": 6272.34 },
    { "id": 7, "name": "Glycol Ether PM", "vendor": "LG Chem", "density": 6495.18, "viscosity": 72.12, "packaging": "Bag", "packSize": 250, "unit": "kg", "quantity": 8749.54 },
    { "id": 8, "name": "Boric Acid", "vendor": "BASF", "density": 2473.89, "viscosity": 23.45, "packaging": "Bag", "packSize": 50, "unit": "kg", "quantity": 5390.75 },
    { "id": 9, "name": "Hydrogen Peroxide", "vendor": "DowDuPont", "density": 1402.72, "viscosity": 89.33, "packaging": "Drum", "packSize": 200, "unit": "L", "quantity": 3245.66 },
    { "id": 10, "name": "Sodium Hypochlorite", "vendor": "Sinopec", "density": 1570.34, "viscosity": 40.75, "packaging": "Bag", "packSize": 50, "unit": "kg", "quantity": 5827.45 },
    { "id": 11, "name": "Potassium Nitrate", "vendor": "LG Chem", "density": 3324.56, "viscosity": 32.12, "packaging": "Bag", "packSize": 150, "unit": "kg", "quantity": 4523.91 },
    { "id": 12, "name": "Ethylene Glycol", "vendor": "Formosa", "density": 1113.25, "viscosity": 36.91, "packaging": "Barrel", "packSize": 300, "unit": "L", "quantity": 6389.11 },
    { "id": 13, "name": "Calcium Carbonate", "vendor": "BASF", "density": 2856.78, "viscosity": 29.73, "packaging": "Bag", "packSize": 120, "unit": "kg", "quantity": 7945.32 },
    { "id": 14, "name": "Benzyl Alcohol", "vendor": "DowDuPont", "density": 2678.23, "viscosity": 45.87, "packaging": "Bottle", "packSize": 1, "unit": "L", "quantity": 934.28 },
    { "id": 15, "name": "Isopropanol", "vendor": "Formosa", "density": 1452.45, "viscosity": 22.11, "packaging": "Drum", "packSize": 50, "unit": "L", "quantity": 4872.56 }
  ];
  

let currentSortColumn = null;
let currentSortOrder = 'asc';

function renderTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    chemicals.forEach((chemical) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td contenteditable="true" data-field="name">${chemical.name}</td>
            <td contenteditable="true" data-field="vendor">${chemical.vendor}</td>
            <td contenteditable="true" data-field="density">${chemical.density}</td>
            <td contenteditable="true" data-field="viscosity">${chemical.viscosity}</td>
            <td contenteditable="true" data-field="packaging">${chemical.packaging}</td>
            <td contenteditable="true" data-field="packSize">${chemical.packSize}</td>
            <td contenteditable="true" data-field="unit">${chemical.unit}</td>
            <td contenteditable="true" data-field="quantity">${chemical.quantity}</td>
        `;
        tableBody.appendChild(row);
    });
}


function sortTable(colIndex) {
    const key = Object.keys(chemicals[0])[colIndex]; 

    if (currentSortColumn === colIndex) {
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc'; 
    } else {
        currentSortOrder = 'asc'; 
        currentSortColumn = colIndex; 
    }

    chemicals.sort((a, b) => {
        if (typeof a[key] === 'string') {
            return currentSortOrder === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
        } else {
            return currentSortOrder === 'asc' ? a[key] - b[key] : b[key] - a[key];
        }
    });

    renderTable();
}

document.getElementById('addRowBtn').onclick = function() {
    const newChemical = { id: chemicals.length + 1, name: "", vendor: "", density: "", viscosity: "", packaging: "", packSize: "", unit: "", quantity: "" };
    chemicals.push(newChemical);
    renderTable();
};

document.getElementById('deleteRowBtn').onclick = function() {
    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedBoxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        const index = Array.from(row.parentNode.children).indexOf(row);
        chemicals.splice(index, 1);
    });
    renderTable();
};

document.getElementById('moveUpBtn').onclick = function() {
    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedBoxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        const index = Array.from(row.parentNode.children).indexOf(row);
        if (index > 0) {
            const temp = chemicals[index];
            chemicals[index] = chemicals[index - 1];
            chemicals[index - 1] = temp;
        }
    });
    renderTable();
};

document.getElementById('moveDownBtn').onclick = function() {
    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedBoxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        const index = Array.from(row.parentNode.children).indexOf(row);
        if (index < chemicals.length - 1) {
            const temp = chemicals[index];
            chemicals[index] = chemicals[index + 1];
            chemicals[index + 1] = temp;
        }
    });
    renderTable();
};

document.getElementById('refreshBtn').onclick = function() {
    renderTable();
};

document.getElementById('saveBtn').onclick = function() {
    const rows = document.querySelectorAll('#table-body tr');
    rows.forEach((row) => {
        const fields = row.querySelectorAll('td[contenteditable="true"]');
        fields.forEach((field) => {
            const fieldName = field.getAttribute('data-field');
            const index = Array.from(row.parentNode.children).indexOf(row);
            chemicals[index][fieldName] = field.innerText;
        });
    });
    alert("Data saved! (This is a mock function.)");
};

renderTable();
