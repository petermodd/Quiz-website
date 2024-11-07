document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("quizForm");
    const quizResult = document.getElementById("quizResult");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        clearPreviousErrors();

        if (!validateForm()) {
            showValidationErrors();
            return;
        }

        let score = calculateScore();
        if (score !== null) {
            displayScore(score);
            disableInputsAfterSubmission();
            showSuccessMessage(score);
        }
    });

    function clearPreviousErrors() {
        document.querySelectorAll('.invalid-feedback').forEach(error => {
            error.style.display = 'none';
        });
        document.querySelectorAll('input, textarea').forEach(input => {
            input.classList.remove('is-invalid');
        });
    }

    function validateForm() {
        let isValid = true;
        // Validate first name, last name, and email specifically
        ['firstName', 'lastName', 'email'].forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('is-invalid');
                const errorSpan = input.nextElementSibling;
                if (errorSpan) {
                    errorSpan.style.display = 'block';
                }
            }
        });

        // Validate other required inputs
        document.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if ((input.type === 'checkbox' && !document.querySelector(`input[name="${input.name}"]:checked`)) ||
                (input.type !== 'checkbox' && !input.value)) {
                isValid = false;
                input.classList.add('is-invalid');
                const errorSpan = input.closest('div').querySelector('.invalid-feedback');
                if (errorSpan) {
                    errorSpan.style.display = 'block';
                }
            }
        });

        return isValid;
    }

    function showValidationErrors() {
        document.querySelectorAll('.is-invalid').forEach(input => {
            const errorSpan = input.nextElementSibling || input.closest('div').querySelector('.invalid-feedback');
            if (errorSpan) {
                errorSpan.style.display = 'block';
            }
        });
    }

    function calculateScore() {
        let score = 0;
        score += checkAnswer('aiApplication', 'Data Analysis');
        score += checkAnswer('aiTechnology', 'Natural Language Processing');
        score += checkAnswer('aiFather', 'John McCarthy');
        score += Array.from(document.querySelectorAll('input[name="aiImpact"]:checked')).reduce((acc, input) => acc + (input.checked ? 1 : 0), 0);
        return score;
    }

    function checkAnswer(questionName, correctAnswer) {
        const selected = document.querySelector(`input[name="${questionName}"]:checked`);
        return selected && selected.value === correctAnswer ? 1 : 0;
    }

    function displayScore(score) {
        quizResult.textContent = 'Your score is ' + score + ' out of 7.';
    }

    function showSuccessMessage(score) {
        quizResult.textContent += ' Information entered correctly.';
        quizResult.classList.add('success-message');
    }

    function disableInputsAfterSubmission() {
        document.querySelectorAll('input, textarea').forEach(input => {
            input.disabled = true;
        });
    }
});
