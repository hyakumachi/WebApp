const form = document.getElementById("studentForm");
const addButton = document.getElementById("addButton");
const searchInput = document.getElementById("searchInput");
const studentTableBody = document.getElementById("studentTableBody");

addButton.addEventListener("click", () => {
  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const birthdate = form.birthdate.value;
  const gender = form.gender.value;
  const course = form.course.value;
  const consent = form.consent.checked;

  if (!firstName || !lastName || !birthdate || !gender || !course) {
    alert("Please complete the form.");
    return;
  }

  if (!consent) {
    alert("Please consent before proceeding.");
    return;
  }

  const fullName = `${firstName} ${lastName}`;
  const birthDateObj = new Date(birthdate);
 let age = new Date().getFullYear() - birthDateObj.getFullYear();

  const today = new Date();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDateObj.getMonth() ||
    (today.getMonth() === birthDateObj.getMonth() &&
      today.getDate() >= birthDateObj.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  const formattedBirthdate = birthDateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const row = document.createElement("tr");
  row.innerHTML = `
                <td>${fullName}</td>
                <td>${formattedBirthdate}</td>
                <td>${age}</td>
                <td>${gender}</td>
                <td>${course}</td>
            `;
  studentTableBody.appendChild(row);

  form.reset();
});

searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  const rows = studentTableBody.getElementsByTagName("tr");
  Array.from(rows).forEach((row) => {
    const fullNameCell = row.cells[0];
    if (fullNameCell) {
      const fullName = fullNameCell.textContent.toLowerCase();
      row.style.display = fullName.includes(filter) ? "" : "none";
    }
  });
});
