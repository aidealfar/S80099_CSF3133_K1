function checkMark() {
  let name = document.forms["gradeForm"]["name"].value.trim();
  let markInput = document.forms["gradeForm"]["mark"].value.trim();

  // Check for empty name
  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  // Extension: Check for empty mark
  if (markInput === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  // Check for non-numeric mark
  if (isNaN(markInput)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  let mark = Number(markInput);

  // Check for out-of-range mark
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  let grade;
  if (mark >= 80) {
    grade = "A";
  } else if (mark >= 65) {
    grade = "B";
  } else if (mark >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }

  let resultEl = document.getElementById("result");
  resultEl.innerHTML = name + " got grade " + grade;

  // Extension: Set result color based on grade
  if (grade === "A" || grade === "B") {
    resultEl.style.color = "green";
  } else if (grade === "C") {
    resultEl.style.color = "orange";
  } else {
    resultEl.style.color = "red";
  }

  // Extension: Display date and time when grade was checked
  document.getElementById("checkedTime").innerHTML = "Checked on: " + new Date();

  // Prevent page reload so result stays visible
  return false;
}

// Extension: Generates a random whole number from 0 to 100 in the mark field
function generateRandomMark() {
  let randomMark = Math.floor(Math.random() * 101);
  document.getElementById("mark").value = randomMark;
}

// Displays all four grade bands starting from index 0
function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];

  let tableHTML = "<table><thead><tr><th>Grade</th><th>Mark Range</th></tr></thead><tbody>";

  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }

  tableHTML += "</tbody></table>";
  document.getElementById("tableContainer").innerHTML = tableHTML;
}

// Error 4 (grade.js, Line 3): Used ")" instead of "]" in document.forms["gradeForm"]["mark").value.
// Error 5 (grade.js, Line 4): Used assignment "=" instead of equality "===" in if (name = "").
// Error 6 (grade.js, Lines 5-7): Premature "}" closed the if block before the alert and return statement.
// Error 7 (grade.js, Line 12): Used "isNan" instead of "isNaN".
// Error 8 (grade.js, Lines 13-14): mark = parseInt(mark) was placed inside the isNaN block.
// Error 9 (grade.js, Line 15): Used "&&" instead of "||" in mark < 0 && mark > 100.
// Error 10 (grade.js, Lines 23-24): Missing ")" in else if (mark >= 50" and grade was lowercase "c".
// Error 11 (grade.js, Lines 29-30): Used getElementByID, unquoted "got grade", and style.colour instead of style.color.
// Error 12 (grade.js, Lines 38 & 42): Loop started at i = 1 instead of i = 0, and used .innerHtml instead of .innerHTML.