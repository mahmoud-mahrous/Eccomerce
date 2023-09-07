if (localStorage.getItem("userInfo")) {
  const currentURL = window.location.host;
  const newURL = `http://${currentURL}`;
  console.log(newURL);
  window.location.href = newURL;
} else {
  // Regular expressions for input validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // DOM elements
  const $loginForm = $("#loginForm");
  console.log($loginForm);
  const $emailInput = $("#email");
  const $passwordInput = $("#password");

  // Array of input fields
  const $inputFields = [$emailInput, $passwordInput];

  // Event listener for form submission
  $loginForm.on("submit", async (e) => {
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

    // Prepare user login data
    const loginData = {
      email: $emailInput.val().toLowerCase().trim(),
      password: $passwordInput.val(),
    };

    console.log(loginData);

    // Validate input data against regex
    const isValidEmail = emailRegex.test(loginData.email);
    const isValidPassword = passwordRegex.test(loginData.password);

    // Check if all inputs are valid before proceeding
    if (isValidEmail && isValidPassword) {
      try {
        // Fetch all users from the server
        const allUsers = await fetchAllUsers();
        const searchEmail = loginData.email;

        // Check if the email already exists
        const foundUser = allUsers.find((user) => user.email === searchEmail);

        if (foundUser) {
          allUsers.forEach((user) => {
            console.log($emailInput.val());
            if (
              $emailInput.val() === user.email &&
              $passwordInput.val() === user.password
            ) {
              localStorage.setItem("userInfo", JSON.stringify(user));
              const currentURL = window.location.host;
              const newURL = `http://${currentURL}`;
              console.log(newURL);
              window.location.href = newURL;
            }
          });
        } else {
          console.log("Email does not exist.");
          $("#emailFoundAlert").fadeIn(500);
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

  // Function to validate input using regex based on input ID
  function isValidInput(value, $input) {
    switch ($input.attr("id")) {
      case "email":
        return emailRegex.test(value);
      case "password":
        return passwordRegex.test(value);
      default:
        return false;
    }
  }
}
