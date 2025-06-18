var subreddit = document.querySelector(".add-subreddit");
var popup = document.querySelector(".popup");
subreddit.addEventListener("click", function() {
    popup.style.display = "flex";
});
popup.querySelector("#add").addEventListener("click", function() {
    popup.style.display = "none";
});
