// Exercise 6

// Validation rules (shared across functions)
const VALIDATION_RULES = {
	fName: { pattern: /^[a-zA-ZÀ-ÿ\s]+$/, minLength: 3 },
	fLastN: { pattern: /^[a-zA-ZÀ-ÿ\s]+$/, minLength: 3 },
	fEmail: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, minLength: 3 },
	fAddress: { minLength: 3 },
	fPassword: { pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/, minLength: 4, maxLength: 8 },
	fPhone: { pattern: /^[0-9]{9}$/ }
};

// Core validation function (used by both validate and validateField)
const isFieldValid = (fieldId, value) => {
	const rule = VALIDATION_RULES[fieldId];
	return value !== "" && 
		value.length >= rule.minLength &&
		(!rule.maxLength || value.length <= rule.maxLength) &&
		(!rule.pattern || rule.pattern.test(value));
};

// Update field UI (shared function)
const updateFieldUI = (fieldId, isValid) => {
	const field = document.getElementById(fieldId);
	const errorElement = document.getElementById(`error${fieldId.charAt(1).toUpperCase() + fieldId.slice(2)}`);
	
	field.classList.toggle('is-invalid', !isValid);
	if (errorElement) errorElement.style.display = isValid ? 'none' : 'block';
};

// Main validation function
const validate = () => {
	// Clear all previous errors
	document.querySelectorAll('.form-control').forEach(input => input.classList.remove('is-invalid'));
	document.querySelectorAll('.invalid-feedback').forEach(error => error.style.display = 'none');
	
	let errors = 0;
	
	Object.keys(VALIDATION_RULES).forEach(fieldId => {
		const field = document.getElementById(fieldId);
		const value = field.value.trim();
		const valid = isFieldValid(fieldId, value);
		
		if (!valid) {
			updateFieldUI(fieldId, false);
			errors++;
		}
	});
	
	alert(errors > 0 ? "Please fix the errors in the form." : "Form submitted successfully");
};

// Single field validation
const validateField = (fieldId) => {
	const field = document.getElementById(fieldId);
	const value = field.value.trim();
	const valid = isFieldValid(fieldId, value);
	
	updateFieldUI(fieldId, valid);
};

// Initialize real-time validation
document.addEventListener('DOMContentLoaded', () => {
	Object.keys(VALIDATION_RULES).forEach(fieldId => {
		const field = document.getElementById(fieldId);
		if (field) field.addEventListener('blur', () => validateField(fieldId));
	});
});