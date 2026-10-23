// script.js: kinukuwenta ang total, best seller, average, at gumagawa ng chart

function peso(n) { return "PHP " + Math.round(n).toLocaleString("en-US"); }

// 1. Total sales kada product at kada buwan
var byProduct = {};
var byMonth = {};
var grand = 0;
for (var i = 0; i < sales.length; i++) {
  var s = sales[i];
  var amount = s.price * s.units;          // Total Sales = Price x Units Sold
  byProduct[s.product] = (byProduct[s.product] || 0) + amount;
  byMonth[s.month] = (byMonth[s.month] || 0) + amount;
  grand += amount;
}

// 2. Ayusin ang mga product mula pinakamataas hanggang pinakamababa
var products = Object.keys(byProduct).sort(function (a, b) { return byProduct[b] - byProduct[a]; });
var best = products[0];
var average = grand / products.length;

// 3. Ilagay sa mga card
document.getElementById("total").textContent = peso(grand);
document.getElementById("best").textContent = best;
document.getElementById("avg").textContent = peso(average);

// 4. Bar chart (gawa sa div; ang haba ay ayon sa porsyento ng pinakamataas)
var chart = document.getElementById("chart");
products.forEach(function (name) {
  var pct = (byProduct[name] / byProduct[best]) * 100;
  var row = document.createElement("div");
  row.className = "bar-row";
  row.innerHTML =
    "<span>" + name + "</span>" +
    '<div class="bar-track"><div class="bar" style="width:' + pct.toFixed(1) + '%"></div></div>' +
    '<span class="bar-value">' + Math.round(byProduct[name]).toLocaleString("en-US") + "</span>";
  chart.appendChild(row);
});

// 5. Table ng buwanang benta
var tbody = document.querySelector("#monthTable tbody");
["January", "February", "March"].forEach(function (m) {
  var tr = document.createElement("tr");
  tr.innerHTML = "<td>" + m + "</td><td>" + Math.round(byMonth[m]).toLocaleString("en-US") + "</td>";
  tbody.appendChild(tr);
});