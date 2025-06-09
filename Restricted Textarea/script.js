document.getElementById('textContent').addEventListener('input', function() {
    var count = 0;
    const text = document.getElementById('textContent').value;
    count = text.length;
    document.getElementById('count').innerText = count;
    if(count >= 250) {
        document.getElementById('textContent').setAttribute('aria-invalid', 'true');
    }
});