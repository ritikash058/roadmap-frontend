$('.dropdown-button').click(function () {
    if ($('.dropdown-content').is(':visible')) {
        $('.dropdown-content').hide();
        $(this).children('span').html('<i class="fa fa-chevron-down"></i>');
    } else {
        $('.dropdown-content').show();
        $(this).children('span').html('<i class="fa fa-chevron-up"></i>');
    }
})
$('.dropdown-button-to').click(function () {
    if ($('.dropdown-content-to').is(':visible')) {
        $('.dropdown-content-to').hide();
        $(this).children('span').html('<i class="fa fa-chevron-down"></i>');
    } else {
        $('.dropdown-content-to').show();
        $(this).children('span').html('<i class="fa fa-chevron-up"></i>');
    }
})
$('.dropdown-content ul li').click(function () {
    var button = $('.dropdown-button');
    var buttonSpan = button.children('span');
    var currentIcon = buttonSpan.html();
    button.text($(this).text());
    button.append(buttonSpan.html(currentIcon));
    
    $('.dropdown-content').hide();
    
    buttonSpan.html('<i class="fa fa-chevron-down"></i>');
})

$('.dropdown-content-to ul li').click(function () {
    var button = $('.dropdown-button-to');
    var buttonSpan = button.children('span');
    var currentIcon = buttonSpan.html();
    
    button.text($(this).text());
    
    button.append(buttonSpan.html(currentIcon));
    
    $('.dropdown-content-to').hide();
    
    buttonSpan.html('<i class="fa fa-chevron-down"></i>');
})
function convertTemperature() {
    const fromUnit = $('.dropdown-button').text();
    const toUnit = $('.dropdown-button-to').text();
    const inputTemp = parseFloat($('#from').val());

    if (isNaN(inputTemp)) {
        $('#outputTemp').val('');
        return;
    }

    let result;

    if (fromUnit === 'Celsius') {
        if (toUnit === 'Fahrenheit') {
            result = (inputTemp * 9/5) + 32;
        } else if (toUnit === 'Kelvin') {
            result = inputTemp + 273.15;
        } else {
            result = inputTemp;
        }
    }
    else if (fromUnit === 'Fahrenheit') {
        if (toUnit === 'Celsius') {
            result = (inputTemp - 32) * 5/9;
        } else if (toUnit === 'Kelvin') {
            result = (inputTemp - 32) * 5/9 + 273.15;
        } else {
            result = inputTemp;
        }
    }
    else if (fromUnit === 'Kelvin') {
        if (toUnit === 'Celsius') {
            result = inputTemp - 273.15;
        } else if (toUnit === 'Fahrenheit') {
            result = (inputTemp - 273.15) * 9/5 + 32;
        } else {
            result = inputTemp;
        }
    }

    $('#outputTemp').text(`${inputTemp} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`);
}


$('#from, .dropdown-button, .dropdown-button-to').on('input', function() {
    const hasInput = $('#from').val() !== '' && !isNaN($('#from').val());
    const fromUnit = $('.dropdown-button').text().trim();
    const toUnit = $('.dropdown-button-to').text().trim();
    
    const hasFromUnit = fromUnit !== 'From Unit' && fromUnit !== '';
    const hasToUnit = toUnit !== 'To Unit' && toUnit !== '';
    
    const isDisabled = !(hasInput && hasFromUnit && hasToUnit);
    
    $('#convert').prop('disabled', isDisabled);
    if (isDisabled) {
        $('#outputTemp').text('');
    }
});

$('.dropdown-content ul li, .dropdown-content-to ul li').click(function() {
    if ($(this).closest('.dropdown-content').length) {
        $('.dropdown-button').trigger('input');
    } else {
        $('.dropdown-button-to').trigger('input');
    }
});

$(document).ready(function() {
    $('#convert').prop('disabled', true);
});
$('#convert').click(convertTemperature);
