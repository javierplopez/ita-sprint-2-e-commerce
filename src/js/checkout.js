// Exercise 6
const validate = (event) => {
	// Prevent default form submission
	if (event) {
		event.preventDefault();
	}
	
	let error = 0;
	let firstInvalidField = null;
	
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
	
	// Clear all previous error states
	document.querySelectorAll('.form-control').forEach(input => input.classList.remove('is-invalid'));
	document.querySelectorAll('.invalid-feedback').forEach(error => error.style.display = 'none');
	
	// Validate in order of appearance in the form to focus the first error
	const validations = [
		{
			field: fName,
			error: errorName,
			condition: fName.value.trim() == "" || fName.value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(fName.value)
		},
		{
			field: fLastN,
			error: errorLastN,
			condition: fLastN.value.trim() == "" || fLastN.value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(fLastN.value)
		},
		{
			field: fEmail,
			error: errorEmail,
			condition: fEmail.value.trim() == "" || fEmail.value.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value)
		},
		{
			field: fAddress,
			error: errorAddress,
			condition: fAddress.value.trim() == "" || fAddress.value.length < 3
		},
		{
			field: fPassword,
			error: errorPassword,
			condition: fPassword.value.trim() == "" || fPassword.value.length < 4 || fPassword.value.length > 8 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(fPassword.value)
		},
		{
			field: fPhone,
			error: errorPhone,
			condition: fPhone.value.trim() == "" || !/^[0-9]{9}$/.test(fPhone.value)
		}
	];
	
	// Check each validation and mark errors
	validations.forEach(validation => {
		if (validation.condition) {
			validation.field.classList.add('is-invalid');
			validation.error.style.display = 'block';
			error++;
			
			// Store the first invalid field
			if (!firstInvalidField) {
				firstInvalidField = validation.field;
			}
		}
	});
	
	if (error > 0) {
		// Focus the first invalid field
		if (firstInvalidField) {
			firstInvalidField.focus();
			// Scroll to the field smoothly
			firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
		
		// Show error message without alert (more user-friendly)
		showFormMessage("Please fill in all required fields correctly.", "error");
	} else {
		// Form is valid - show success message
		showFormMessage("Form submitted successfully! Processing your order...", "success");
		
		// Here you could actually submit the form data
		// submitFormData();
	}
	
	return error === 0;
}

// Helper function to show form messages
const showFormMessage = (message, type) => {
	// Remove any existing message
	const existingMessage = document.querySelector('.form-message');
	if (existingMessage) {
		existingMessage.remove();
	}
	
	// Create new message element
	const messageDiv = document.createElement('div');
	messageDiv.className = `form-message alert ${type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`;
	messageDiv.innerHTML = `
		<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2"></i>
		${message}
	`;
	
	// Insert message before the submit button
	const submitButton = document.getElementById('btn');
	submitButton.parentNode.insertBefore(messageDiv, submitButton);
	
	// Auto-remove success messages after 5 seconds
	if (type === 'success') {
		setTimeout(() => {
			if (messageDiv.parentNode) {
				messageDiv.remove();
			}
		}, 5000);
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
	// Add blur event listeners for real-time validation
	document.getElementById("fName").addEventListener('blur', validateName);
	document.getElementById("fLastN").addEventListener('blur', validateLastName);
	document.getElementById("fEmail").addEventListener('blur', validateEmail);
	document.getElementById("fAddress").addEventListener('blur', validateAddress);
	document.getElementById("fPassword").addEventListener('blur', validatePassword);
	document.getElementById("fPhone").addEventListener('blur', validatePhone);
	
	// Add form submit event listener to handle form submission properly
	const form = document.querySelector('.checkout-form');
	if (form) {
		form.addEventListener('submit', validate);
	}
	
	// Also handle the button click event (as backup)
	const submitButton = document.getElementById('btn');
	if (submitButton) {
		submitButton.addEventListener('click', validate);
	}
});