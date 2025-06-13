// Funções de controle dos passos — mantidas fora do DOMContentLoaded
const steps = document.querySelectorAll(".step");
let currentStep = 0;

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.textContent = message;
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 3000); // esconde após 3 segundos
}

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}

function validateStep() {
  const currentStepElement = steps[currentStep];
  const requiredInputs = currentStepElement.querySelectorAll(
    'input[required], select[required], input[type="radio"]:required, input[type="checkbox"]:required'
  );

  for (let input of requiredInputs) {
    if (input.type === "radio" || input.type === "checkbox") {
      const group = currentStepElement.querySelectorAll(
        `input[name="${input.name}"]`
      );
      const isChecked = [...group].some((i) => i.checked);
      if (!isChecked) {
        showPopup("Por favor, preencha todos os campos obrigatórios.");
        return false;
      }
    } else if (input.value.trim() === "") {
      showPopup("Por favor, preencha todos os campos obrigatórios.");
      input.focus();
      return false;
    }
  }

  if (
    currentStepElement.querySelector("#email") &&
    currentStepElement.querySelector("#confirmar-email")
  ) {
    const email = document.getElementById("email").value.trim();
    const confirmarEmail = document.getElementById("confirmar-email").value.trim();
    if (email !== confirmarEmail) {
      showPopup("Os emails não coincidem.");
      return false;
    }
  }

  if (
    currentStepElement.querySelector("#senha") &&
    currentStepElement.querySelector("#confirmar-senha")
  ) {
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    const senhaForte =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!senhaForte.test(senha)) {
      showPopup(
        "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
      );
      return false;
    }

    if (senha !== confirmarSenha) {
      showPopup("As senhas não coincidem.");
      return false;
    }
  }

  return true;
}

function nextStep() {
  if (!validateStep()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("multiStepForm");

  const cpfInput = document.getElementById("cpf");
  const celularInput = document.getElementById("celular");

  celularInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  cpfInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });


  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmarEmail = document.getElementById("confirmar-email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cpf || !email || !confirmarEmail || !senha || !confirmarSenha) {
      showPopup("Por favor, preencha todos os campos.");
      return;
    }

    if (!emailPattern.test(email)) {
      showPopup("Digite um email válido.");
      return;
    }

    if (email !== confirmarEmail) {
      showPopup("Os emails não coincidem.");
      return;
    }

    const senhaForte =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!senhaForte.test(senha)) {
      showPopup(
        "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
      );
      return;
    }

    if (senha !== confirmarSenha) {
      showPopup("As senhas não coincidem.");
      return;
    }

    // Se todas as validações passarem, redireciona para a página de sucesso
    window.location.href = "sucesso.html";
  });

  showStep(currentStep);
});
