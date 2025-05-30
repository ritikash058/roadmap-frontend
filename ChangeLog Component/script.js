document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const toggleButton = document.getElementById('toggleButton');
    let isExpanded = false;
    
    // Initially hide all but the first few items
    const initialVisibleItems = 3; // Show first 3 items by default
    timelineItems.forEach((item, index) => {
        if (index >= initialVisibleItems) {
            item.style.display = 'none';
        }
    });

    // Update button text based on initial state
    toggleButton.textContent = `View More (${timelineItems.length - initialVisibleItems})`;

    // Toggle functionality
    toggleButton.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        timelineItems.forEach((item, index) => {
            if (index >= initialVisibleItems) {
                item.style.display = isExpanded ? 'block' : 'none';
            }
        });
        
        if (isExpanded) {
            toggleButton.textContent = 'View Less';
        } else {
            toggleButton.textContent = `View More (${timelineItems.length - initialVisibleItems})`;
        }
    });
});