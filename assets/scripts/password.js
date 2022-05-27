// DOm Elements
const resultEl = document.querySelector("#result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

// function objects
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Copy password to clipboard
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  alert("Password copied to clipboard");
});

// generate password click event
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  // password variable used to build the generated password
  let generatedPassword = "";
  // counting the number of checked values
  const typesCount = lower + upper + number + symbol;

  // Filter out unchecked types
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // see if there are none checked
  if (typesCount === 0) {
    return "";
  }

  // Loop over length of password and call generate fuunction for each type
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }

  // Add final pw to the pw var and return the final pw
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Generator funtions

// Generating random lowercase letters
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// generating random uppercase letters
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// generating random numbers
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// generating random symbols
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>,.?/|";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
