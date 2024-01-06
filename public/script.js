const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnLogin = document.querySelector('.btnLogin-popup');
const btnRegister = document.querySelector('.btnRegister-popup');
const btnRegister1 = document.querySelector('.btnRegister-popup1');
const iconClose = document.querySelector('.icon-close');

document.addEventListener('DOMContentLoaded', function () {
    const gender = document.querySelector('#floatingSelect');
    const genderLabel = document.querySelector('.Gender-lable'); // Corrected the class name

    gender.addEventListener('change', () => {
        const choice = gender.value;
        console.log(choice);

        if (choice === 'Male' || choice === 'Female') {
            genderLabel.classList.add('active2');
        } else {
            genderLabel.classList.remove('active2');
        }
    });
});



let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active1');
}


registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnRegister.addEventListener('click', () => {
    wrapper.classList.add('active','active-popup');
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active1');
});

btnRegister1.addEventListener('click', () => {
    wrapper.classList.add('active','active-popup');
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active1');
});

btnLogin.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    wrapper.classList.remove('active');
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active1');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});