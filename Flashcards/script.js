$(document).ready(function () {
    var cards = [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
        { question: "What is the smallest country in the world?", answer: "Vatican City" },
        { question: "What is the most widely spoken language in the world?", answer: "Mandarin Chinese" },
        { question: "What is the highest mountain peak in the world?", answer: "Mount Everest" },
        { question: "What is the deepest part of the ocean?", answer: "Challenger Deep" },
        { question: "Who was the first president of the United States?", answer: "George Washington" },
        { question: "What is the smallest state in the United States?", answer: "Rhode Island" },
        { question: "What is the fastest land animal?", answer: "Cheetah" },
        { question: "What is the largest living species of lizard?", answer: "Komodo dragon" },
        { question: "What is the largest desert in the world?", answer: "Sahara Desert" },
        { question: "What is the smallest planet in our solar system?", answer: "Mercury" },
        { question: "What is the highest mammal?", answer: "Blue Whale" },
        { question: "What is the deepest lake in the world?", answer: "Lake Baikal" },
        { question: "What is the largest bird?", answer: "Ostrich" },
        { question: "What is the smallest mammal?", answer: "Bumblebee" },
        { question: "What is the highest mountain in the world?", answer: "Mount Everest" },
        { question: "What is the largest ocean in the world?", answer: "Pacific Ocean" },
        { question: "What is the smallest country in the world?", answer: "Vatican City" },
        { question: "What is the fastest animal?", answer: "Cheetah" }
    ];

    let currentIndex = 0; 
    let viewedCards = new Set(); 
    const totalCards = cards.length;

    const $flashcard = $('.flashcard');
    const $question = $('#question');
    const $answer = $('#answer');
    const $count = $('#count');
    const $prevBtn = $('#prev');
    const $nextBtn = $('#next');

    function updateCountDisplay(viewedCount, totalCount) {
        const percent = (viewedCount / totalCount) * 100;
        $count
            .text(`${viewedCount}/${totalCount}`)
            .css('width', `${percent}%`);
    }
    function showCard(index) {
        const card = cards[index];
        $question.text(card.question);
        $answer.text(card.answer);

        updateButtonStates(index);
        viewedCards.add(index);
        updateCountDisplay(index + 1, totalCards);
    }
    function updateButtonStates(index) {
        $prevBtn.prop('disabled', index === 0);
        $nextBtn.prop('disabled', index === totalCards - 1);
    }
    // Flip card on hover
    $flashcard.hover(function () {
        $(this).addClass('flipped');
    }, function () {
        $(this).removeClass('flipped');
    });

    // Next button
    $nextBtn.on('click', function () {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            showCard(currentIndex);
        }
    });

    // Previous button
    $prevBtn.on('click', function () {
        if (currentIndex > 0) {
            currentIndex = Math.max(0, currentIndex - 1); 
            showCard(currentIndex);
        }
    });

    // Initialize with current card
    showCard(currentIndex);
});