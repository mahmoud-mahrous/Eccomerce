// Regular expressions for input validation
const firstNameRegex = /^[A-Za-z]+$/;
const lastNameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

// DOM elements
const $registerForm = $("#registerForm");
const $firstNameInput = $("#firstNameInput");
const $lastNameInput = $("#lastNameInput");
const $emailInput = $("#email");
const $passwordInput = $("#password");

// Array of input fields
const $inputFields = [
  $firstNameInput,
  $lastNameInput,
  $emailInput,
  $passwordInput,
];

// Event listener for form submission
$registerForm.on("submit", async (e) => {
  e.preventDefault();

  // Iterate over input fields for validation
  $inputFields.forEach(($input) => {
    const value = $input.val();
    const $alertElement = $(`#${$input.attr("id")}Alert`);

    if (!isValidInput(value, $input)) {
      $alertElement.css("display", "block");
    } else {
      $alertElement.css("display", "none");
    }
  });

  // Prepare user registration data
  const registerData = {
    firstName: $firstNameInput.val().toLowerCase().trim(),
    lastName: $lastNameInput.val().toLowerCase().trim(),
    email: $emailInput.val().toLowerCase().trim(),
    password: $passwordInput.val(),
    rule: "user",
  };

  // Validate input data against regex
  const isValidFirstName = firstNameRegex.test(registerData.firstName);
  const isValidLastName = lastNameRegex.test(registerData.lastName);
  const isValidEmail = emailRegex.test(registerData.email);
  const isValidPassword = passwordRegex.test(registerData.password);

  // Check if all inputs are valid before proceeding
  if (isValidFirstName && isValidLastName && isValidEmail && isValidPassword) {
    try {
      // Fetch all users from the server
      const allUsers = await fetchAllUsers();
      const searchEmail = registerData.email;

      // Check if the email already exists
      const foundUser = allUsers.find((user) => user.email === searchEmail);
      if (foundUser) {
        console.log("Email exists. User found:");
        $("#emailFoundAlert").css("display", "block");
      } else {
        console.log("Email does not exist.");
        // Post the user data to the server
        postUserToDb(registerData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

// Function to fetch all users from the server
async function fetchAllUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Function to post user data to the server
function postUserToDb(user) {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}

// Event delegation for input validation on keyup
$inputFields.forEach(($input) => {
  $input.on("keyup", (e) => {
    const value = e.target.value;
    const $alertElement = $(`#${$input.attr("id")}Alert`);

    if (!isValidInput(value, $input)) {
      $alertElement.css("display", "block");
    } else {
      $alertElement.css("display", "none");
    }
  });
});

// Function to validate input using regex based on input ID
function isValidInput(value, $input) {
  switch ($input.attr("id")) {
    case "firstNameInput":
      return firstNameRegex.test(value);
    case "lastNameInput":
      return lastNameRegex.test(value);
    case "email":
      return emailRegex.test(value);
    case "password":
      return passwordRegex.test(value);
    default:
      return false;
  }
}
