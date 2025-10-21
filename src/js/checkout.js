// Exercise 6
const validate = () => {
	let error = 0;
	
	const fName = document.getElementById("fName");
	const fLastN = document.getElementById("fLastN");
	const fEmail = document.getElementById("fEmail");
	const fAddress = document.getElementById("fAddress");
	const fPassword = document.getElementById("fPassword");
	const fPhone = document.getElementById("fPhone");

	const errorName = document.getElementById("errorName");
	const errorLastN = document.getElementById("errorLastN");
	const errorEmail = document.getElementById("errorEmail");
	const errorAddress = document.getElementById("errorAddress");
	const errorPassword = document.getElementById("errorPassword");
	const errorPhone = document.getElementById("errorPhone");
	
	document.querySelectorAll('.form-control').forEach(input => input.classList.remove('is-invalid'));
	document.querySelectorAll('.invalid-feedback').forEach(error => error.style.display = 'none');
		
	if(fName.value.trim() == "" || fName.value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(fName.value)){
		fName.classList.add('is-invalid');
		errorName.style.display = 'block';
		error++;
	}
	
	if(fLastN.value.trim() == "" || fLastN.value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(fLastN.value)){
		fLastN.classList.add('is-invalid');
		errorLastN.style.display = 'block';
		error++;
	}

	if(fEmail.value.trim() == "" || fEmail.value.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value)){
		fEmail.classList.add('is-invalid');
		errorEmail.style.display = 'block';
		error++;
	}
	
	if(fAddress.value.trim() == "" || fAddress.value.length < 3){
		fAddress.classList.add('is-invalid');
		errorAddress.style.display = 'block';
		error++;
	}
	
	if(fPassword.value.trim() == "" || fPassword.value.length < 4 || fPassword.value.length > 8 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(fPassword.value)){
		fPassword.classList.add('is-invalid');
		errorPassword.style.display = 'block';
		error++;
	}
	
	if(fPhone.value.trim() == "" || !/^[0-9]{9}$/.test(fPhone.value)){
		fPhone.classList.add('is-invalid');
		errorPhone.style.display = 'block';
		error++;
	}
	
	if(error > 0){
		alert("Please fill in all required fields correctly.");
	}else{
		alert("Form submitted successfully");
	}
}

const validateName = () => {
	const fName = document.getElementById("fName");
	const errorName = document.getElementById('errorName');
	
	fName.classList.remove('is-invalid');
	errorName.style.display = 'none';
	
	if(fName.value.trim() == "" || fName.value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(fName.value)){
		fName.classList.add('is-invalid');
		errorName.style.display = 'block';
	}
};

const validateLastName = () => {
	const fLastN = document.getElementById("fLastN");
	const errorLastN = document.getElementById('errorLastN');
	
	fLastN.classList.remove('is-invalid');
	errorLastN.style.display = 'none';
	
	if(fLastN.value.trim() == "" || fLastN.value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(fLastN.value)){
		fLastN.classList.add('is-invalid');
		errorLastN.style.display = 'block';
	}
};

const validateEmail = () => {
	const fEmail = document.getElementById("fEmail");
	const errorEmail = document.getElementById('errorEmail');
	
	fEmail.classList.remove('is-invalid');
	errorEmail.style.display = 'none';
	
	if(fEmail.value.trim() == "" || fEmail.value.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value)){
		fEmail.classList.add('is-invalid');
		errorEmail.style.display = 'block';
	}
};

const validateAddress = () => {
	const fAddress = document.getElementById("fAddress");
	const errorAddress = document.getElementById('errorAddress');
	
	fAddress.classList.remove('is-invalid');
	errorAddress.style.display = 'none';
	
	if(fAddress.value.trim() == "" || fAddress.value.length < 3){
		fAddress.classList.add('is-invalid');
		errorAddress.style.display = 'block';
	}
};

const validatePassword = () => {
	const fPassword = document.getElementById("fPassword");
	const errorPassword = document.getElementById('errorPassword');
	
	fPassword.classList.remove('is-invalid');
	errorPassword.style.display = 'none';
	
	if(fPassword.value.trim() == "" || fPassword.value.length < 4 || fPassword.value.length > 8 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(fPassword.value)){
		fPassword.classList.add('is-invalid');
		errorPassword.style.display = 'block';
	}
};

const validatePhone = () => {
	const fPhone = document.getElementById("fPhone");
	const errorPhone = document.getElementById('errorPhone');
	
	fPhone.classList.remove('is-invalid');
	errorPhone.style.display = 'none';
	
	if(fPhone.value.trim() == "" || !/^[0-9]{9}$/.test(fPhone.value)){
		fPhone.classList.add('is-invalid');
		errorPhone.style.display = 'block';
	}
};

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("fName").addEventListener('blur', validateName);
	document.getElementById("fLastN").addEventListener('blur', validateLastName);
	document.getElementById("fEmail").addEventListener('blur', validateEmail);
	document.getElementById("fAddress").addEventListener('blur', validateAddress);
	document.getElementById("fPassword").addEventListener('blur', validatePassword);
	document.getElementById("fPhone").addEventListener('blur', validatePhone);
});