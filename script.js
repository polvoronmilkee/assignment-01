document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const userCountInput = document.getElementById("userCount");
  const userRows = document.getElementById("userRows");
  const nameFormatSelect = document.getElementById("nameFormat");

  function fetchUsers(count = 5) {
    return new Promise((resolve, reject) => {
      fetch(`https://randomuser.me/api/?results=${count}`)
        .then(response => {
          if (!response.ok) {
            reject(new Error(`API Error: ${response.status}`));
            return;
          }
          return response.json();
        })
        .then(data => resolve(data.results || []))
        .catch(error => reject(error));
    });
  }

  function renderUsers(users) {
    userRows.innerHTML = "";

    if (users.length === 0) {
      userRows.innerHTML = `<tr><td colspan="4" class="text-danger fw-bold">No users found. Try again.</td></tr>`;
      return;
    }

    const format = nameFormatSelect.value;

    users.forEach(user => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = format === "first" ? user.name.first : user.name.last;

      const genderCell = document.createElement("td");
      genderCell.textContent = user.gender;

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;

      const countryCell = document.createElement("td");
      countryCell.textContent = user.location.country;

      row.appendChild(nameCell);
      row.appendChild(genderCell);
      row.appendChild(emailCell);
      row.appendChild(countryCell);

      userRows.appendChild(row);
    });
  }

  function generateUsers() {
    let count = parseInt(userCountInput.value, 10);

    if (isNaN(count) || count < 1 || count > 500) {
      alert("⚠️ Please enter a number between 1 and 500 only.");
      return;
    }

      // show loading ..
    userRows.innerHTML = `<tr><td colspan="4" class="text-muted">Loading users...</td></tr>`;

    fetchUsers(count)
      .then(users => {
        renderUsers(users);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        alert("⚠️ Failed to fetch users. Please check your internet connection and try again.");
        userRows.innerHTML = `<tr><td colspan="4" class="text-danger fw-bold">Failed to load users</td></tr>`;
      });
  }

  // generate button
  generateBtn.addEventListener("click", generateUsers);

  //refetch with current count
  nameFormatSelect.addEventListener("change", generateUsers);
});