const submitBtn = document.getElementById('submit-settings');
if (submitBtn) {
  submitBtn.addEventListener('click', function() {
  const pattern = document.querySelector('input[name="pattern"]:checked');
  if (!pattern) return;
  const patternInput = pattern as HTMLInputElement;
  if (patternInput.value === 'full') {
      window.location.href = 'full.html';
    } else if (patternInput.value === 'halfdrop') {
      window.location.href = 'halfdrop.html';
    }
  });
}