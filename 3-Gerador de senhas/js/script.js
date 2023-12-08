const generatePasswordButton = document.querySelector("#generate-password")
const generatePasswordElement = document.querySelector("#generated-password")

const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const letterInput = document.querySelector("#letters")
const numberInput = document.querySelector("#numbers")
const symbolInput = document.querySelector("#symbols")
const copyPassword = document.querySelector("#copy-password")

const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97) 
}

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65) 
}

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString()
}

const getSymbols = () => {
  const symbols = "(){}[]!@#$%^&*_-+=;:'/?.>,<`|"
  return symbols[Math.floor(Math.random() * symbols.length)] 
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbols) => {

  let password = ""

  const passwordLength = + lengthInput.value

  const generators = []

  if(letterInput.checked){
    generators.push(getLetterLowerCase, getLetterUpperCase)
  }

  if(numberInput.checked){
    generators.push(getNumber)
  }
  if(symbolInput.checked){
    generators.push(getSymbols)
  }
  if(generators.length === 0){
    return
  }


  for (let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      
      const randomValue = generators[Math.floor(Math.random() * generators.length)]()
  
      password += randomValue
    });
    
  }
  password = password.slice(0, passwordLength)
  
  generatePasswordElement.style.display = "block"
  generatePasswordElement.querySelector("h4").innerText = password

}

  copyPassword.addEventListener("click", (ev) => {

    ev.preventDefault 

    const password = generatePasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(function (){
      copyPassword.innerText = "Senha copiada com sucesso!"

      setTimeout(() => {
        copyPassword.innerText = "Copiar"
      }, 2 * 1000)
    })
  })

generatePasswordButton.addEventListener("click", (ev) => {
  ev.preventDefault
  generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbols)
})

openCloseGeneratorButton.addEventListener("click", () =>{
  generatePasswordContainer.classList.toggle("hide")
}) 
