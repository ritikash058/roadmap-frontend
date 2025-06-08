function openForm() {
    document.getElementById("cookie-consent").style.display = "block";
}

function closeForm() {
    document.getElementById("cookie-consent").style.display = "none";
}

function setConsent() {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = "consent=true; expires=" + date.toUTCString() + "; path=/";
    closeForm();
}

function getConsent() {
    return document.cookie;
}
if (!getConsent().includes("consent=true")) {
    openForm();
} else {
    closeForm();
}
