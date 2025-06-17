let languages = [];
let currentPage = 1;
const itemsPerPage = 15; // Increased for better lazy loading experience
let loadedItems = [];
let isLoading = false;

async function fetchLanguages() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json');
        languages = await response.json();
        populateDropdown();
    } catch (error) {
        console.error('Error fetching languages:', error);
    }
}

function populateDropdown() {
    if (isLoading) return;
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = languages.slice(start, end);
    
    const ul = $('.dropdown-content ul');
    
    // Remove loading indicator if it exists
    ul.find('.loading').remove();
    
    // Only empty if it's the first page
    if (currentPage === 1) {
        ul.empty();
        loadedItems = [];
    }
    
    pageItems.forEach(lang => {
        if (!loadedItems.includes(lang.title)) {
            loadedItems.push(lang.title);
            ul.append(`<li data-lang="${encodeURIComponent(lang.title)}">${lang.title}</li>`);
        }
    });
    
    // Only add loading indicator if there are more items to load
    if (end < languages.length) {
        ul.append($(`<li class="loading"><i class="fa fa-spinner fa-spin"></i> Loading more languages...</li>`));
    }
}

async function searchGitHubRepos(language) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&per_page=10`, {
            headers: {
                'Accept': 'application/vnd.github+json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        displayResults(data.items, language);
    } catch (error) {
        console.error('Error searching GitHub repos:', error);
        showError(language);
    }
}

function showError(language) {
    $('#results').html(`
        <div class="error-container">
            <div class="error">
                <p>Error fetching repositories for ${language}</p>
            </div>
                <button id="retry-btn" class="retry-button">
                <i class="fa fa-rotate"></i> Click to Retry
            </button>
        </div>
    `);
    
    $('#retry-btn').click(() => {
        searchGitHubRepos(language);
    });
}

function displayResults(repos, language) {
    const resultsContainer = $('#results');
    resultsContainer.empty();
    
    if (repos.length === 0) {
        resultsContainer.html(`<div class="no-results">No repositories found for ${language}</div>`);
        return;
    }
    
    const repoList = $('<div class="repo-list"></div>');
    resultsContainer.append(repoList);

    resultsContainer.append(`
        <div class="results-header">
            <button id="refresh-btn" class="refresh-button">
                <i class="fa fa-rotate"></i> Refresh
            </button>
        </div>
    `);
    
    const showRandomRepo = () => {
        const randomIndex = Math.floor(Math.random() * repos.length);
        const repo = repos[randomIndex];
        
        repoList.empty();
        
        const repoItem = $(`
            <div class="repo-item">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <div class="repo-meta">
                    <span><i class="fa fa-star"></i> ${repo.stargazers_count.toLocaleString()}</span>
                    <span><i class="fa fa-code-fork"></i> ${repo.forks_count.toLocaleString()}</span>
                    <span><i class="fa fa-exclamation"></i> ${repo.open_issues_count.toLocaleString()}</span>
                </div>
            </div>
        `);
        
        repoList.append(repoItem);
    };
    
    showRandomRepo();
    
    $('#refresh-btn').click(() => {
        repoList.html('<div class="loading"><i class="fa fa-spinner fa-spin"></i> Loading new repository...</div>');
        
        setTimeout(() => {
            showRandomRepo();
        }, 300);
    });
}

    // Initialize dropdown
$('.dropdown-button').click(function () {
    if ($('.dropdown-content').is(':visible')) {
        $('.dropdown-content').hide();
        $(this).children('span').html('<i class="fa fa-chevron-down"></i>');
    } else {
        $('.dropdown-content').show();
        $(this).children('span').html('<i class="fa fa-chevron-up"></i>');
        if (currentPage !== 1) {
            currentPage = 1;
            populateDropdown();
        }
    }
});

        // Handle language selection
$('.dropdown-content ul').on('click', 'li:not(.loading)', function () {
    const button = $('.dropdown-button');
    const buttonSpan = button.children('span');
    const selectedLanguage = $(this).text();
    
    button.text(selectedLanguage);
    button.append(buttonSpan.html('<i class="fa fa-chevron-down"></i>'));
    
    $('.dropdown-content').hide();
    
    $('#results').html('<div class="loading"><i class="fa fa-spinner fa-spin"></i> Searching GitHub repositories...</div>');
    
    searchGitHubRepos(selectedLanguage);
});

// Improved lazy loading    
$('.dropdown-content').on('scroll', function() {
    const ul = $(this).find('ul');
    const loading = ul.find('.loading');
    
    if (loading.length && ul.scrollTop() + ul.innerHeight() >= ul[0].scrollHeight - 50) {
        currentPage++;
        populateDropdown();
    }
});

// Close dropdown when clicking outside
$(document).on('click', function(e) {
    if (!$(e.target).closest('.dropdown').length) {
        $('.dropdown-content').hide();
        $('.dropdown-button span').html('<i class="fa fa-chevron-down"></i>');
    }
});

fetchLanguages();