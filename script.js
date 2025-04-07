
//* ---------------------- Login and Sign Up Toggle Functionality ---------------------- //
//* This script handles the toggle functionality between login and sign-up forms
document.addEventListener('DOMContentLoaded', function () {
    const innerDiv = document.querySelector('.inner-div');
    const loginNav = document.querySelector('.login-nav');
    const signUpNav = document.querySelector('.sign-up-nav');
    const outerDiv = document.querySelector('.outer-div');
    const imgPoster = document.querySelector('.poster-img')

    let isLeft = true;
    let isAnimating = false;

    function moveDiv() {
        if (isAnimating) return;

        isAnimating = true;

        // Primera fase: expandir al 100%
        innerDiv.classList.add('expanding');

        setTimeout(() => {
            // Segunda fase: cambiar de lado
            if (isLeft) {
                innerDiv.classList.add('right');
                imgPoster.classList.add("right");
                imgPoster.src = "/lib/Sign in nuevo.jpg"

            } else {
                innerDiv.classList.remove('right');
                imgPoster.classList.remove("right");
                imgPoster.src = "/lib/Login nuevo.jpg";
                // Log in

            }
            isLeft = !isLeft;

            // Tercera fase: contraer a 50%
            setTimeout(() => {
                innerDiv.classList.remove('expanding');
                isAnimating = false;
            }, 50); // Pequeño delay para asegurar el renderizado
        }, 400); // Tiempo igual a la duración de la transición CSS
    }

    signUpNav.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!isLeft) return; // Ya está a la izquierda
        moveDiv();
    });

    loginNav.addEventListener('click', function (e) {
        e.stopPropagation();
        if (isLeft) return; // Ya está a la derecha
        moveDiv();
    });

});

// *------------------------ End of Login and Sign Up Toggle Functionality ---------------------- //


//* ----------------------------- Password Toggle Functionality ----------------------------- //

const togglePasswordRegister = document.getElementById('togglePasswordRegister');
const passwordRegister = document.getElementById('passwordRegister');
const imageRegister = document.getElementById('buttonImageRegister');

togglePasswordRegister.addEventListener('click', function() {
    const type = passwordRegister.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordRegister.setAttribute('type', type);
    
    // Cambiar solo la imagen (eliminado el textContent)
    imageRegister.src = type === 'password' 
        ? "https://img.icons8.com/material-outlined/20/visible--v1.png" 
        : "https://img.icons8.com/material-outlined/20/invisible.png";
    
    // Actualizar el texto alternativo para accesibilidad
    imageRegister.alt = type === 'password' ? "Mostrar contraseña" : "Ocultar contraseña";
});


const togglePasswordLogin = document.getElementById('togglePasswordLogin');
const passwordLogin = document.getElementById('passwordLogin');
const imageLogin = document.getElementById('buttonImageLogin');

togglePasswordLogin.addEventListener('click', function() {
    const type = passwordLogin.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordLogin.setAttribute('type', type);
    
    // Cambiar solo la imagen (eliminado el textContent)
    imageLogin.src = type === 'password' 
        ? "https://img.icons8.com/material-outlined/20/visible--v1.png" 
        : "https://img.icons8.com/material-outlined/20/invisible.png";
    
    // Actualizar el texto alternativo para accesibilidad
    imageLogin.alt = type === 'password' ? "Mostrar contraseña" : "Ocultar contraseña";
});

//* ----------------------------- End of Password Toggle Functionality ----------------------------- //

//* ----------------------------- Validate password ----------------------------- //


document.getElementById('singUpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    validatePassword();
});

document.getElementById('passwordRegister').addEventListener('input', function() {
    validatePassword(true);
});

function validatePassword(onInput = false) {
    const password = document.getElementById('passwordRegister').value;
    const errorElement = document.getElementById('passwordError');
    const inputElement = document.getElementById('passwordRegister');
    
    // Validaciones individuales
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    // Mensajes de error específicos
    let errorMessages = [];
    
    if (!hasMinLength) errorMessages.push("mínimo 8 caracteres");
    if (!hasUpperCase) errorMessages.push("1 letra mayúscula");
    if (hasSpecialChar) errorMessages.push("sin caracteres especiales");
    
    // Mostrar errores
    if (errorMessages.length > 0 && (password.length > 0 || !onInput)) {
        const errorText = "Falta: " + errorMessages.join(", ");
        errorElement.textContent = errorText;
        errorElement.style.display = 'block';
        inputElement.classList.add('error-border');
        return false;
    } else {
        errorElement.style.display = 'none';
        inputElement.classList.remove('error-border');
        
        if (!onInput && password.length > 0) {
            alert('¡Contraseña válida!');
            // Aquí iría tu lógica de envío del formulario
        }
        return true;
    }
}


//* ----------------------------- Validate empty inputs ----------------------------- //

function validarFormulario(form) {
    // Obtener todos los inputs del formulario
    const inputs = document.querySelectorAll(`#loginForm input`);
    let hayVacios = false;
  
    // Verificar cada input
    inputs.forEach(input => {
      if (input.value.trim() === '') {
        hayVacios = true;
        input.style.border = '1px solid red'; // Resaltar el campo vacío
      } else {
        input.style.border = ''; // Quitar el resaltado si está completo
      }
    });
  
    // Mostrar mensaje de error si hay campos vacíos
    if (hayVacios) {
        alert("⚠️ ¡Error! Hay campos vacíos. Por favor, complétalos."); // Alerta
        return false; // Validación fallida
      } else {
        alert("✅ ¡Formulario válido! Enviando datos..."); // Alerta de éxito (opcional)
        // document.getElementById('miFormulario').submit(); // Enviar formulario
        return true; // Validación exitosa
      }

  }


document.getElementById("registerBtn").addEventListener("click", validarFormulario)