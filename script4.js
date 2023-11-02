
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".genratePswd");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// #initial data showed on UI
console.log(uppercaseCheck);

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");

function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
  inputSlider.style.backgroundColor = "hsl(268, 47%, 21%)";
}

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});
function handleCheckBoxChange() {
  console.log("checkbox1");
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      console.log("checkbox2");
      checkCount++;
    }
  });
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

generateBtn.addEventListener("click", () => {
  console.log("clicked");
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  // code to find new password
  password = "";
  let funcArr = [];
  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber);
  }
  if (symbolsCheck.checked) {
    funcArr.push(generateSymbol);
  }
  console.log("firstpasswordcheck", password);
  //compulsory Addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  console.log("secondpasswordcheck", password);
  //Remaining Password
      for(let i=0; i<passwordLength-funcArr.length; i++) {
          let randIndex = getRndInteger(0 , funcArr.length);
          console.log("randIndex" + randIndex);
          password += funcArr[randIndex]();
      }
  console.log("thirdpasswordcheck", password);
  //shuffling of password
//   password = shufflePassword(Array.from(password));

  //show on UI
  console.log("fourthpasswordcheck", password);
  passwordDisplay.value = password;
  console.log("UI addition done");

  calcStrength();
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function generateRandomNumber() {
  return getRndInteger(0, 9);
}
function generateRandomNumber() {
  return getRndInteger(0, 9);
}
function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}
function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index and j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => {
    str += el;
    return str;
  });
}


function calcStrength() {
  console.log("calcStrength function");
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

function setIndicator(color) {
  indicator.style.backgroundColor = "color";
  indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}
