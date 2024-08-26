"use strict";

const users = [
  {
    name: "Ola Khateeb",
    email: "Ola@gmail.com",
    country: "Israel",
    phone: '050-2541373',
    img: 'ola1.jpg'
  },
  {
    name: "Rougeh Nijim",
    email: "Rougeh@gmail.com",
    country: "Israel",
    phone: '050-2841373',
    img: 'Roje1.jpg'
  },
  {
    name: "Danya Swaed",
    email: "Danya@gmail.com",
    country: "Israel",
    phone: '050-4556713',
    img: 'danya1.jpg'
  },
  {
    name: "Arwad Rahal",
    email: "Arwad@gmail.com",
    country: "Israel",
    phone: '050-6279542',
    img: 'Arwad.jpg'
  },
  {
    name: "Ayman Zeed",
    email: "AymanZ@gmail.com",
    country: "Israel",
    phone: '050-1678346',
    img: 'ayman1.jpg'
  },
  {
    name: "Jana Shaaban",
    email: "jana@gmail.com",
    country: "Israel",
    phone: '050-6180346',
    img: 'jojo.jpg'
  },
  {
    name: "Hazem Habarat",
    email: "Hazem@gmail.com",
    country: "Israel",
    phone: '054-6876987',
    img: 'Hazem.jpg'
  }
];
// Update the user count display
function updateUserCount() {
    const userCountElement = document.getElementById('userCount');
    userCountElement.textContent = `Total users: ${users.length}`;
  }
  updateUserCount();



// Show users function
function showUsers(usersToShow = users) {
  let sortedUsers = usersToShow.slice().sort((a, b) => a.name.localeCompare(b.name, 'he'));

  console.log(sortedUsers); // Check the sorted list

  let result = "";
  sortedUsers.forEach((elem) => {
    result += `
      <div class="user__data">
        <div class="user_img">
          <img src="./img/${elem.img}" alt="">
        </div>
        <div class="user_info">
          <div class="user__name">${elem.name}</div>
          <div class="user__email">${elem.email}</div>
          <div class="user__country">${elem.country}</div>
          <div class="user__phone">${elem.phone}</div>
        </div>
        <div>
          <button onclick="showInfo('${elem.phone}')"><img src="./icons/info.png"/></button>
          <button onclick="editUser('${elem.phone}')"><img src="./icons/edit.png"/></button>
          <button onclick="deleteUser('${elem.phone}')"><img src="./icons/delete.png"/></button>
        </div>
      </div>`;
  });

  document.getElementById('resultContainer').innerHTML = result;
}

// Show popup modal
function showPopup() {
  document.getElementById('popup').style.display = "flex";
}

// Toggle search container
function toggleSearch() {
  const searchContainer = document.getElementById('searchContainer');
  searchContainer.style.display = (searchContainer.style.display === 'none' || searchContainer.style.display === '') ? 'block' : 'none';
}

// Add new user with validation
function addNewUser() {
    showPopup();
  
    document.getElementById("popup").innerHTML = `
      <h2>Add new user</h2>
      <form id="userForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"><br><br>
        <label for="country">Country:</label>
        <input type="text" id="country" name="country"><br><br>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required><br><br>
        <label for="img">Image:</label>
        <input type="file" id="img" name="img"><br><br>
        <button type="submit"><img src="./icons/add1.png" alt="Add"/></button>
        <button type="button" onclick="closeModal(event)"><img src="./icons/close.png" alt="Close"/></button>
      </form>
      <div id="error-message" style="color: red;"></div>
    `;
  
    const form = document.getElementById("userForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const name = formData.get("name").trim();
      const phone = formData.get("phone").trim();
      
      // Validate required fields
      if (!name || !phone) {
        document.getElementById("error-message").textContent = "Name and phone are required fields.";
        return;
      }
  
      // Check if the name already exists
      const nameExists = users.some(user => user.name.toLowerCase() === name.toLowerCase());
      if (nameExists) {
        document.getElementById("error-message").textContent = "A user with this name already exists.";
        return;
      }
  
      // Create a new user object
      const newUser = {
        name: name,
        email: formData.get("email"),
        country: formData.get("country"),
        phone: phone,
        img: formData.get("img") ? formData.get("img").name : 'default.jpg' // Handle the case where no image is selected
      };
  
      // Add new user to the list
      users.push(newUser);
  
      // Refresh the user list
      showUsers();
  
      // Update user count
      updateUserCount();
  
      // Close the modal
      document.getElementById("popup").style.display = "none";
    });
  }

  

// Delete a user
function deleteUser(phoneNumber) {
    // Find the user by phone number
    const user = users.find((user) => user.phone === phoneNumber);
    
    if (user) {
      // Confirm deletion with user's name
      const confirmation = confirm(`Are you sure you want to delete ${user.name}?`);
      if (confirmation) {
        // Find the index of the user and remove them from the array
        const index = users.findIndex((user) => user.phone === phoneNumber);
        if (index !== -1) {
          users.splice(index, 1);
          showUsers();
          updateUserCount(); // Update user count
        }
      }
    } else {
      alert("User not found.");
    }
  }
  
  

// Delete all users
function deleteUsers() {
    if (confirm("Are you sure you want to delete all users?")) {
      // Clear the users array
      users.length = 0;
  
      // Remove all user elements from the DOM
      const userElements = document.querySelectorAll('#resultContainer > div');
      userElements.forEach(element => element.remove());
  
      // Update user count
      updateUserCount();
    }
  }
  

// Show user info
function showInfo(phoneNumber) {
  showPopup();
  const user = users.find((user) => user.phone === phoneNumber);

  const popup = document.getElementById("popup");

  popup.innerHTML = `
    <div class="user__data">
      <div class="user_img">
        <img src="img/${user.img}" alt="">
      </div>
      <div class="user_info">
        <div class="user__name">${user.name}</div>
        <div class="user__email">${user.email}</div>
        <div class="user__country">${user.country}</div>
        <div class="user__phone">${user.phone}</div>
      </div>
      <button onclick="closeModal(event)">X</button>
    </div>
  `;
}

// Edit user
function editUser(phoneNumber) {
  const user = users.find((user) => user.phone === phoneNumber);
  showPopup();

  const popup = document.getElementById("popup");

  popup.innerHTML = `
    <h2>Edit ${user.name}</h2>
    <form id="userForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" value="${user.name}"><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" value="${user.email}"><br><br>
      <label for="country">Country:</label>
      <input type="text" id="country" name="country" value="${user.country}"><br><br>
      <label for="phone">Phone:</label>
      <input type="tel" id="phone" name="phone" value="${user.phone}" readonly><br><br>
      <label for="img">Image:</label>
      <input type="file" id="img" name="img"><br><br>
    </form>
    <div>
      <button onclick="saveEditedUser('${user.phone}')"><img src="./icons/save.png" alt="Save" /></button>
      <button onclick="closeModal(event)"><img src="./icons/close.png" alt="Close" /></button>
    </div>
  `;
}

// Save edited user
function saveEditedUser(phoneNumber) {
  const user = users.find((user) => user.phone === phoneNumber);
  const form = document.getElementById("userForm");
  const formData = new FormData(form);

  // Update user details
  user.name = formData.get('name');
  user.email = formData.get('email');
  user.country = formData.get('country');

  // Check if a new image is selected
  const imgInput = document.getElementById("img");
  if (imgInput.files.length > 0) {
    const file = imgInput.files[0];
    user.img = file.name; // Update user image with the new file name
  }

  // Refresh user list display
  showUsers();
  document.getElementById("popup").style.display = "none";
}

// Search users
function searchUsers() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().startsWith(searchInput) || 
      user.email.toLowerCase().startsWith(searchInput) ||
      user.country.toLowerCase().startsWith(searchInput) ||
      user.phone.startsWith(searchInput)
    );
  });
  showUsers(filteredUsers);
 // Update the user count to reflect the number of filtered users
 document.getElementById('userCount').textContent = `Total users: ${filteredUsers.length}`;
}

document.getElementById('searchInput').addEventListener('input', searchUsers);

// Close modal
function closeModal ( event ) {
    if ( event.target === document.getElementById( 'popup' ) || event.target === document.getElementById( 'closeModalBtn' ) ) {
      document.getElementById( 'popup' ).style.display = "none";
    }
     document.getElementById('popup').style.display = "none";
  }


  const darkModeButton = document.getElementById('darkModeButton');

  darkModeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  });
