// Exercise 6
const VALIDATION_RULES = {
	fName: {
		fieldId: 'fName',
		errorId: 'errorName',
		validators: [
			{ 
				test: (value) => value.trim() === "", 
				message: "Name is required" 
			},
			{ 
				test: (value) => value.length < 3, 
				message: "Name must have at least 3 characters" 
			},
			{ 
				test: (value) => !/^[a-zA-ZÀ-ÿ\s]+$/.test(value), 
				message: "Name must contain only letters" 
			}
		]
	},
	fLastN: {
		fieldId: 'fLastN',
		errorId: 'errorLastN',
		validators: [
			{ 
				test: (value) => value.trim() === "", 
				message: "Last name is required" 
			},
			{ 
				test: (value) => value.length < 3, 
				message: "Last name must have at least 3 characters" 
			},
			{ 
				test: (value) => !/^[a-zA-ZÀ-ÿ\s]+$/.test(value), 
				message: "Last name must contain only letters" 
			}
		]
	},
	fEmail: {
		fieldId: 'fEmail',
		errorId: 'errorEmail',
		validators: [
			{ 
				test: (value) => value.trim() === "", 
				message: "Email is required" 
			},
			{ 
				test: (value) => value.length < 3, 
				message: "Email must have at least 3 characters" 
			},
			{ 
				test: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 
				message: "Email must be a valid email address" 
			}
		]
	},
	fAddress: {
		fieldId: 'fAddress',
		errorId: 'errorAddress',
		validators: [
			{ 
				test: (value) => value.trim() === "", 
				message: "Address is required" 
			},
			{ 
				test: (value) => value.length < 3, 
				message: "Address must have at least 3 characters" 
			}
		]
	},
	fPassword: {
		fieldId: 'fPassword',
		errorId: 'errorPassword',
		validators: [
			{ 
				test: (value) => value.trim() === "", 
				message: "Password is required" 
			},
			{ 
				test: (value) => value.length < 4, 
				message: "Password must have at least 4 characters" 
			},
			{ 
				test: (value) => value.length > 8, 
				message: "Password must have at most 8 characters" 
			},
			{ 
				test: (value) => !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value), 
				message: "Password must contain letters and numbers" 
			}
		]
	},
	fPhone: {
		fieldId: 'fPhone',
		errorId: 'errorPhone',
		validators: [
			{ 
				test: (value) => value.trim() === "", 
				message: "Phone number is required" 
			},
			{ 
				test: (value) => !/^[0-9]{9}$/.test(value), 
				message: "Phone number must be exactly 9 digits" 
			}
		]
	}
};

const validateField = (fieldKey) => {
	const rule = VALIDATION_RULES[fieldKey];
	if (!rule) return true;
	
	const field = document.getElementById(rule.fieldId);
	const errorElement = document.getElementById(rule.errorId);
	
	field.classList.remove('is-invalid');
	errorElement.style.display = 'none';
	
	const value = field.value;
	for (const validator of rule.validators) {
		if (validator.test(value)) {
			field.classList.add('is-invalid');
			errorElement.style.display = 'block';
			return false;
		}
	}
	
	return true;
};

const validate = (event) => {
	if (event) {
		event.preventDefault();
	}
	
	let error = 0;
	let firstInvalidField = null;
	
	document.querySelectorAll('.form-control').forEach(input => input.classList.remove('is-invalid'));
	document.querySelectorAll('.invalid-feedback').forEach(error => error.style.display = 'none');
	
	Object.keys(VALIDATION_RULES).forEach(fieldKey => {
		const isValid = validateField(fieldKey);
		
		if (!isValid) {
			error++;
			
			if (!firstInvalidField) {
				firstInvalidField = document.getElementById(VALIDATION_RULES[fieldKey].fieldId);
			}
		}
	});
	
	if (error > 0) {
		if (firstInvalidField) {
			firstInvalidField.focus();
			firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
		showFormMessage("Please fill in all required fields correctly.", "error");
	} else {
		showFormMessage("Form submitted successfully! Processing your order...", "success");
	}
	
	return error === 0;
}

const showFormMessage = (message, type) => {
	const existingMessage = document.querySelector('.form-message');
	if (existingMessage) {
		existingMessage.remove();
	}
	
	const messageDiv = document.createElement('div');
	messageDiv.className = `form-message alert ${type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`;
	messageDiv.innerHTML = `
		<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2"></i>
		${message}
	`;
	
	const submitButton = document.getElementById('btn');
	submitButton.parentNode.insertBefore(messageDiv, submitButton);
	
	if (type === 'success') {
		setTimeout(() => {
			if (messageDiv.parentNode) {
				messageDiv.remove();
			}
		}, 5000);
	}
}

const validateName = () => validateField('fName');
const validateLastName = () => validateField('fLastN');
const validateEmail = () => validateField('fEmail');
const validateAddress = () => validateField('fAddress');
const validatePassword = () => validateField('fPassword');
const validatePhone = () => validateField('fPhone');

document.addEventListener('DOMContentLoaded', () => {
	Object.keys(VALIDATION_RULES).forEach(fieldKey => {
		const field = document.getElementById(VALIDATION_RULES[fieldKey].fieldId);
		if (field) {
			field.addEventListener('blur', () => validateField(fieldKey));
		}
	});
	
	const form = document.querySelector('.checkout-form');
	if (form) {
		form.addEventListener('submit', validate);
	}
	
	const submitButton = document.getElementById('btn');
	if (submitButton) {
		submitButton.addEventListener('click', validate);
	}
});