"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('canvas_options_modal.js loaded');
const canvasSettingsButton = document.getElementById('canvasSettingsButton');
const modal = document.getElementById('canvas-settings-modal');
const closeBtn = document.getElementById('close-canvas-settings');
const submitBtn = document.getElementById('submit-canvas-settings');
document.addEventListener('DOMContentLoaded', function () {
    console.log('modal:', modal);
    console.log('submitBtn:', submitBtn);
    console.log('closeBtn:', closeBtn);
});
if (!canvasSettingsButton || !modal || !closeBtn || !submitBtn) {
    console.error('Required elements not found in the DOM');
}
else {
    // Open modal
    canvasSettingsButton.addEventListener('click', () => {
        modal.classList.add('show');
    });
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    // Close modal when clicking outside modal-content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
    // Handle submit
    if (submitBtn && modal) {
        submitBtn.addEventListener('click', () => {
            // Get selected pattern type
            const checkedInput = document.querySelector('input[name="pattern"]:checked');
            const patternType = checkedInput === null || checkedInput === void 0 ? void 0 : checkedInput.value;
            // Use the same logic as your full/half-drop pattern modals
            if (patternType === 'full') {
                document.body.setAttribute('data-mode', 'full');
                showFullPattern();
            }
            else if (patternType === 'halfdrop') {
                document.body.setAttribute('data-mode', 'half');
                showHalfDropPattern();
            }
            modal.classList.remove('show');
        });
    }
}
// Function to load a script dynamically
function loadScript(src, isModule = false) {
    const script = document.createElement('script');
    script.src = src;
    if (isModule) {
        script.type = 'module';
    }
    script.onload = () => {
        console.log(`Script loaded: ${src}`);
    };
    script.onerror = () => {
        console.error(`Error loading script: ${src}`);
    };
    document.head.appendChild(script);
}
// Example functions (replace with your actual logic)
function showFullPattern() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Full Drop Submit');
        const oldCanvas = document.getElementById('active-canvas') || document.getElementById('inactive-canvas');
        if (oldCanvas && oldCanvas.parentNode) {
            oldCanvas.innerHTML = '';
            oldCanvas.parentNode.removeChild(oldCanvas);
            console.log('Old canvas removed');
            // ...existing code to show full pattern modal/canvas...
            const container = document.getElementById('canvas-container');
            if (container) {
                // Create new active canvas
                const activeCanvas = document.createElement('canvas');
                activeCanvas.id = 'active-canvas';
                activeCanvas.width = 600;
                activeCanvas.height = 600;
                activeCanvas.style.background = '#fff';
                activeCanvas.style.display = 'block';
                activeCanvas.style.margin = '60px auto';
                document.body.appendChild(activeCanvas);
                console.log('Active canvas added:', activeCanvas);
                const { initCanvas } = yield import('../script.js');
                initCanvas();
            }
        }
    });
}
function showHalfDropPattern() {
    return __awaiter(this, void 0, void 0, function* () {
        // ...existing code to show half-drop pattern modal/canvas...
        console.log('Half Drop Submit');
        const oldCanvas = document.getElementById('active-canvas') || document.getElementById('inactive-canvas');
        if (oldCanvas && oldCanvas.parentNode) {
            oldCanvas.innerHTML = '';
            oldCanvas.parentNode.removeChild(oldCanvas);
            console.log('Old canvas removed');
            // ...existing code to show full pattern modal/canvas...
            const container = document.getElementById('canvas-container');
            if (container) {
                // Create new active canvas
                const activeCanvas = document.createElement('canvas');
                activeCanvas.id = 'active-canvas';
                activeCanvas.width = 600;
                activeCanvas.height = 600;
                activeCanvas.style.background = '#fff';
                activeCanvas.style.display = 'block';
                activeCanvas.style.margin = '60px auto';
                document.body.appendChild(activeCanvas);
                console.log('Active canvas added:', activeCanvas);
                const { initCanvas } = yield import('../script.js');
                initCanvas();
            }
        }
    });
}
