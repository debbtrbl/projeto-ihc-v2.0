// Funções de controle dos passos — mantidas fora do DOMContentLoaded
const steps = document.querySelectorAll(".step");
let currentStep = 0;

function showStep(index) {
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === index);
    });
}

function nextStep() {
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

document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("multiStepForm");

    const cpfInput = document.getElementById('cpf');
    const rgInput = document.getElementById('rg');

    cpfInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    rgInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const cpf = document.getElementById('cpf').value.trim();
        const rg = document.getElementById('rg').value.trim();
        const email = document.getElementById('email').value.trim();
        const confirmarEmail = document.getElementById('confirmar-email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        if (!cpf || !rg || !email || !confirmarEmail || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {
            alert('Digite um email válido.');
            return;
        }


        if (email !== confirmarEmail) {
            alert('Os emails não coincidem.');
            return;
        }


        const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        if (!senhaForte.test(senha)) {
            alert('A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.');
            return;
        }


        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        window.location.href = "sucesso.html";
    });


    showStep(currentStep);

});
