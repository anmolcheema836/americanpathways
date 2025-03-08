
  const formSteps = document.querySelectorAll(".form-step");
  const stepIndicators = document.querySelectorAll(".step");
  let currentStep = 0;
  const completedSteps = Array(formSteps.length).fill(false);

  // Initially display the first step.
  showStep(0);

  function showStep(stepIndex) {
    formSteps.forEach(step => step.classList.remove("form-step-active"));
    stepIndicators.forEach(indicator => indicator.classList.remove("active"));
    formSteps[stepIndex].classList.add("form-step-active");
    stepIndicators[stepIndex].classList.add("active");
    currentStep = stepIndex;
  }

  function validateStep(stepIndex) {
    const inputs = formSteps[stepIndex].querySelectorAll("input[required], select[required], textarea[required]");
    for (let input of inputs) {
      if (!input.value.trim()) {
        alert("Please fill all required fields before proceeding.");
        return false;
      }
    }
    return true;
  }

  // When "Next" is clicked.
  document.querySelectorAll(".btn-next").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!validateStep(currentStep)) return;
      // Mark the step as complete permanently.
      completedSteps[currentStep] = true;
      stepIndicators[currentStep].classList.add("complete");
      if (currentStep < formSteps.length - 1) {
        showStep(currentStep + 1);
      }
    });
  });

  // When "Previous" is clicked.
  document.querySelectorAll(".btn-prev").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  // Allow clicking on step indicators only if all previous steps are complete.
  stepIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      let canJump = true;
      for (let i = 0; i < index; i++) {
        if (!completedSteps[i]) {
          canJump = false;
          break;
        }
      }
      if (canJump) {
        showStep(index);
      } else {
        alert("Please complete the previous sections first.");
      }
    });
  });

  // Toggle textarea enable/disable based on radio selection.
  function toggleTextarea(radioName, textareaId) {
    const radios = document.getElementsByName(radioName);
    const textarea = document.getElementById(textareaId);
    Array.from(radios).forEach(radio => {
      radio.addEventListener("change", function() {
        if (this.value === "Yes") {
          textarea.disabled = false;
          textarea.required = true;
        } else {
          textarea.disabled = true;
          textarea.required = false;
          textarea.value = "";
        }
      });
    });
  }

  toggleTextarea("criminalRecord", "criminalDetails");
  toggleTextarea("previousVisa", "visaDetails");

