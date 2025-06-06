function switchTab(tabId) {
    // Get all tabs and tab contents
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Remove active class from all tabs and tab contents
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and its content
    const selectedContent = document.querySelector(`#${tabId}`);
    selectedContent.classList.add('active');
    
    // Find the corresponding tab button
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => {
        if (button.getAttribute('onclick') === `switchTab('${tabId}')`) {
            button.classList.add('active');
        }
    });
}
