// script.js: logic ng Allowance Tracker

var KEY = "sm-allowance-entries";    // pangalan ng save sa localStorage
var entries = load();                // bawat entry: { id, desc, amount, type }

var list = document.getElementById("list");
var errorBox = document.getElementById("error");

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch (e) { return []; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(entries)); } catch (e) {}
}

// Gawing "PHP 1,234.50"
function peso(n) {
  return "PHP " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Ipakita ang listahan at ang total
function render() {
  var income = 0;
  var expense = 0;
  list.innerHTML = "";

  if (entries.length === 0) {
    var empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No entries yet. Add your first one above!";
    list.appendChild(empty);
  }

  entries.forEach(function (e) {
    if (e.type === "income") income += e.amount; else expense += e.amount;

    var li = document.createElement("li");
    li.className = "entry " + e.type;

    var desc = document.createElement("span");
    desc.className = "desc";
    desc.textContent = e.desc;                       // textContent: ligtas

    var amt = document.createElement("span");
    amt.className = "amt";
    amt.textContent = (e.type === "income" ? "+" : "-") + peso(e.amount);

    var del = document.createElement("button");
    del.className = "delete";
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", function () {
      entries = entries.filter(function (x) { return x.id !== e.id; });
      save(); render();
    });

    li.appendChild(desc); li.appendChild(amt); li.appendChild(del);
    list.appendChild(li);
  });

  var balance = income - expense;
  document.getElementById("income").textContent = peso(income);
  document.getElementById("expense").textContent = peso(expense);
  var bal = document.getElementById("balance");
  bal.textContent = peso(balance);
  bal.classList.toggle("negative", balance < 0);
}

// Magdagdag ng entry
document.getElementById("form").addEventListener("submit", function (ev) {
  ev.preventDefault();
  var desc = document.getElementById("desc").value.trim();
  var amount = parseFloat(document.getElementById("amount").value);

  // Validation
  if (desc === "") { errorBox.textContent = "Please type a description."; return; }
  if (isNaN(amount) || amount <= 0) { errorBox.textContent = "Please enter an amount greater than 0."; return; }
  errorBox.textContent = "";

  entries.push({ id: Date.now(), desc: desc, amount: amount, type: document.getElementById("type").value });
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  save(); render();
});

document.getElementById("clearBtn").addEventListener("click", function () {
  if (entries.length === 0) return;
  if (confirm("Delete all entries?")) { entries = []; save(); render(); }
});

render();