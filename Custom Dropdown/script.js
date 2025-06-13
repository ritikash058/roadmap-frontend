$('.dropdown-button').click(function () {
    if ($('.dropdown-content').is(':visible')) {
        $('.dropdown-content').hide();
        $(this).children('span').html('<i class="fa fa-chevron-down"></i>');
    } else {
        $('.dropdown-content').show();
        $(this).children('span').html('<i class="fa fa-chevron-up"></i>');
    }
})

$('.dropdown-content ul li').click(function () {
    // Get the button and its span element
    var button = $('.dropdown-button');
    var buttonSpan = button.children('span');
    
    // Store the current icon HTML
    var currentIcon = buttonSpan.html();
    
    // Update only the text part of the button (not the span with icon)
    button.text($(this).text());
    
    // Restore the icon span after setting the text
    button.append(buttonSpan.html(currentIcon));
    
    $('.dropdown-content').hide();
    
    // Make sure to show the down chevron after selection
    buttonSpan.html('<i class="fa fa-chevron-down"></i>');
})