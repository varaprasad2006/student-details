


  function save() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var location = document.getElementById("location").value;

    // Regular expression patterns for email and phone validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^\d{10}$/;

    // Check if the name is empty
    if (name.trim() === "") {
      document.getElementById("nameError").textContent = "Please enter your name.";
      return;
    } else {
      document.getElementById("nameError").textContent = ""; // Clear any previous error message
    }

    // Check if the email is valid
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address.";
      return;
    } else {
      document.getElementById("emailError").textContent = ""; // Clear any previous error message
    }

    // Check if the phone number is valid
    if (!phonePattern.test(phone)) {
      document.getElementById("phoneError").textContent = "Please enter a valid 10-digit phone number.";
      return;
    } else {
      document.getElementById("phoneError").textContent = ""; // Clear any previous error message
    }
    // Check if the location is empty
    if (location.trim() === "") {
      document.getElementById("locationError").textContent = "Please enter your location.";
      return;
  } else {
      document.getElementById("locationError").textContent = ""; // Clear any previous error message
  }

  // Check if the gender is selected
  var gender = document.getElementById("gender").value;
  if (gender === "") {
      document.getElementById("genderError").textContent = "Please select your gender.";
      return;
  } else {
      document.getElementById("genderError").textContent = ""; // Clear any previous error message
  }

  // Check if the state is empty
  var state = document.getElementById("state").value;
  if (state.trim() === "") {
      document.getElementById("stateError").textContent = "Please enter your state.";
      return;
  } else {
      document.getElementById("stateError").textContent = ""; // Clear any previous error message
  }

    // Create a student object
    var registration = {
      name: name,
      email: email,
      phone: phone,
      location: location
    };

    // Retrieve existing registrations from localStorage or initialize an empty array
    var registrations = JSON.parse(localStorage.getItem('registrations')) || [];

    // Add the new registration to the array
    registrations.push(registration);

    // Save the updated registrations array back to localStorage
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Close the modal
  var modal = new bootstrap.Modal(document.getElementById('reg'));
  modal.hide();
  $('#reg').modal('hide');

    // Display the registration in the table
    displayRegistrations();

    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('location').value = "";
    document.getElementById('state').value = ""
    
  }

  function deleteRegistration(index) {
    var confirmDelete = confirm("Are you sure you want to delete this record?");

    if (confirmDelete) {
      // Retrieve stored registrations from localStorage
      var registrations = JSON.parse(localStorage.getItem('registrations')) || [];

      // Remove the registration at the given index
      registrations.splice(index, 1);

      // Save the updated registrations array back to localStorage
      localStorage.setItem('registrations', JSON.stringify(registrations));

      // Display the updated registrations in the table
      displayRegistrations();
    }
  }

  function displayRegistrations() {
    // Retrieve stored registrations from localStorage
    var registrations = JSON.parse(localStorage.getItem('registrations')) || [];

    // Clear existing table rows
    var tableRef = document.getElementById('dataRows');
    tableRef.innerHTML = '';

    // Loop through registrations and populate the table with each record
    for (var i = 0; i < registrations.length; i++) {
      var registration = registrations[i];

      var newRow = tableRef.insertRow();

      var snoCell = newRow.insertCell();
      snoCell.appendChild(document.createTextNode(i + 1)); // Display SNo as serial number

      var nameCell = newRow.insertCell();
      nameCell.appendChild(document.createTextNode(registration.name));

      var emailCell = newRow.insertCell();
      emailCell.appendChild(document.createTextNode(registration.email));

      var phoneCell = newRow.insertCell();
      phoneCell.appendChild(document.createTextNode(registration.phone));

      var locationCell = newRow.insertCell();
      locationCell.appendChild(document.createTextNode(registration.location));

      var actionCell = newRow.insertCell();

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.addEventListener('click', (function (index) {
        return function () {
          deleteRegistration(index);
        };
      })(i));
      actionCell.appendChild(deleteButton);
    }
  }

  // Display existing registrations on page load
  displayRegistrations();

