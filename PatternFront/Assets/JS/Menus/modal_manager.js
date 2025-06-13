"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // Get all modal elements
    const modals = document.querySelectorAll(' #canvasSettingsModal, #selectionToolsModal, #brushToolsModal, #eraserToolsModal, #fillToolsModal, #stampToolsModal, #layersToolsModal, #palletToolsModal, #importModal, #exportModal, #settingsModal ');
    // Get all menu buttons that open modals
    const menuButtons = document.querySelectorAll('.Menu button[id$="Button"]');
    // Function to close all modals
    function closeAllModals() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
    // Add click event listeners to all menu buttons
    menuButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            // Close all modals first
            closeAllModals();
            // Then open the corresponding modal
            const modalId = button.id.replace('Button', 'Modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                console.log(`Opening modal: ${modalId}`);
                modal.style.display = 'block';
            }
        });
    });
    // Close the modal if clicking outside of it
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target &&
            !target.closest(' #canvasSettingsModal, #selectionToolsModal, #brushToolsModal, #eraserToolsModal, #fillToolsModal, #stampToolsModal, #layersToolsModal, #palletToolsModal, #importModal, #exportModal, #settingsModal') &&
            !target.closest('.Menu button')) {
            closeAllModals();
        }
    });
    // Prevent clicks inside the modals from closing them
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });
});
