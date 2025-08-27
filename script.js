document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const userCountInput = document.getElementById("userCount");
  const userRows = document.getElementById("userRows");
  const nameFormatSelect = document.getElementById("nameFormat");

  async function fetchUsers(count = 5) {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${count}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("⚠️ Failed to fetch users. Please check your internet connection and try again.");
      return [];
    }
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

      // Name (first/last based on dropdown)
      const nameCell = document.createElement("td");
      nameCell.textContent = format === "first" ? user.name.first : user.name.last;

      // Gender
      const genderCell = document.createElement("td");
      genderCell.textContent = user.gender;

      // Email
      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;

      // Country
      const countryCell = document.createElement("td");
      countryCell.textContent = user.location.country;

      row.appendChild(nameCell);
      row.appendChild(genderCell);
      row.appendChild(emailCell);
      row.appendChild(countryCell);

      userRows.appendChild(row);
    });
  }

  async function generateUsers() {
    let count = parseInt(userCountInput.value, 10);

    // Validate input only between 1 and 500
    if (isNaN(count) || count < 1 || count > 500) {
      alert("⚠️ Please enter a number between 1 and 500 only.");
      return;
    }

    // Show loading row
    userRows.innerHTML = `<tr><td colspan="4" class="text-muted">Loading users...</td></tr>`;

    const users = await fetchUsers(count);
    renderUsers(users);
  }

  // Generate button
  generateBtn.addEventListener("click", generateUsers);

  // Dropdown (re-fetch with current count)
  nameFormatSelect.addEventListener("change", generateUsers);
});
