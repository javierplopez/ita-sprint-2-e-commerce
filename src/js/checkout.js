// Exercise 6

// Helper function to validate and show errors (eliminates duplication)
const validateField = (fieldId, condition) => {
	const field = document.getElementById(fieldId);
	const errorId = `error${fieldId.charAt(1).toUpperCase() + fieldId.slice(2)}`;
	const errorElement = document.getElementById(errorId);
	
	// Clear previous error
	field.classList.remove('is-invalid');
	errorElement.style.display = 'none';
	
	// Validate and show error if needed
	if (condition(field.value.trim())) {
		field.classList.add('is-invalid');
		errorElement.style.display = 'block';
		return false;
	}
	return true;
};

// Main validation function
const validate = () => {
	let isValid = true;
	
	// Validate all fields using the helper function
	isValid &= validateField("fName", value => 
		value === "" || value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(value));
	
	isValid &= validateField("fLastN", value => 
		value === "" || value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(value));
	
	isValid &= validateField("fEmail", value => 
		value === "" || value.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
	
	isValid &= validateField("fAddress", value => 
		value === "" || value.length < 3);
	
	isValid &= validateField("fPassword", value => 
		value === "" || value.length < 4 || value.length > 8 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value));
	
	isValid &= validateField("fPhone", value => 
		value === "" || !/^[0-9]{9}$/.test(value));
	
	alert(isValid ? "Form submitted successfully" : "Please complete all fields correctly.");
};

// Individual field validation for real-time feedback
const validateName = () => validateField("fName", value => 
	value === "" || value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(value));

const validateLastName = () => validateField("fLastN", value => 
	value === "" || value.length < 3 || !/^[a-zA-ZÀ-ÿ\s]+$/.test(value));

const validateEmail = () => validateField("fEmail", value => 
	value === "" || value.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

const validateAddress = () => validateField("fAddress", value => 
	value === "" || value.length < 3);

const validatePassword = () => validateField("fPassword", value => 
	value === "" || value.length < 4 || value.length > 8 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value));

const validatePhone = () => validateField("fPhone", value => 
	value === "" || !/^[0-9]{9}$/.test(value));

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("fName").addEventListener('blur', validateName);
	document.getElementById("fLastN").addEventListener('blur', validateLastName);
	document.getElementById("fEmail").addEventListener('blur', validateEmail);
	document.getElementById("fAddress").addEventListener('blur', validateAddress);
	document.getElementById("fPassword").addEventListener('blur', validatePassword);
	document.getElementById("fPhone").addEventListener('blur', validatePhone);
});