class RedditClient {
    constructor() {
        this.addSubredditButton = document.querySelector(".add-subreddit");
        this.popup = document.querySelector(".popup");
        this.resultsContainer = document.getElementById("results");
        this.loadingIndicator = document.createElement("div");
        this.loadingIndicator.className = "loading";
        this.loadingIndicator.innerHTML = "Loading...";
        this.errorContainer = document.createElement("div");
        this.errorContainer.className = "error-message";
        this.resultsContainer.appendChild(this.loadingIndicator);
        this.resultsContainer.appendChild(this.errorContainer);
        this.hideLoading();
        this.hideError();
        
        this.addSubredditButton.addEventListener("click", () => this.togglePopup());
        this.popup.querySelector("#add").addEventListener("click", () => this.handleAddSubreddit());
        
        // Load saved subreddits from local storage
        this.loadSavedSubreddits();
    }

    togglePopup() {
        this.popup.style.display = this.popup.style.display === "flex" ? "none" : "flex";
    }

    showLoading() {
        this.loadingIndicator.style.display = "block";
    }

    hideLoading() {
        this.loadingIndicator.style.display = "none";
    }

    showError(message) {
        this.errorContainer.textContent = message;
        this.errorContainer.style.display = "block";
    }

    hideError() {
        this.errorContainer.style.display = "none";
    }

    async fetchSubreddit(subreddit) {
        try {
            this.showLoading();
            const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=5`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch subreddit: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(data)
            this.displayResults(data.data.children, subreddit);
        } catch (error) {
            this.showError(`Error fetching subreddit: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    displayResults(data, subreddit) {
        // Create a new container for this subreddit
        const subredditContainer = document.createElement("div");
        subredditContainer.className = "subreddit-lane";
    
        // Add header with subreddit name and actions dropdown
        const header = document.createElement("div");
        header.className = "subreddit-header";
        header.innerHTML = `
            <h3>r/${subreddit}</h3>
            <div class="actions-dropdown">
                <button class="dropdown-toggle">
                    <i class="fa fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-content">
                    <button class="dropdown-item" onclick="this.closest('.subreddit-lane').remove();">
                        Delete Lane
                    </button>
                    <button class="dropdown-item" onclick="this.closest('.subreddit-lane').querySelector('.refresh-button').click();">
                        Refresh
                    </button>
                </div>
            </div>
        `;
        // Add hidden refresh button for programmatic refresh
        const refreshButton = document.createElement("button");
        refreshButton.className = "refresh-button";
        refreshButton.onclick = () => this.fetchSubreddit(subreddit);
        header.appendChild(refreshButton);
        subredditContainer.appendChild(header);
    
        // Add posts
        const postsContainer = document.createElement("div");
        postsContainer.className = "posts-container";
        data.forEach(item => {
            const post = document.createElement("div");
            post.className = "post";
            post.innerHTML = `
                <div class="post-content">
                    <h4>${item.data.title}</h4>
                    <div class="post-meta">
                        <span class="author">by u/${item.data.author}</span>
                        <span class="score">Score: ${item.data.score}</span>
                    </div>
                </div>
            `;
            postsContainer.appendChild(post);
        });
        subredditContainer.appendChild(postsContainer);
    
        // Add the lane to the wrapper
        const wrapper = this.resultsContainer.querySelector('.subreddits-wrapper');
        if (wrapper) {
            wrapper.insertBefore(subredditContainer, wrapper.firstChild);
        } else {
            this.resultsContainer.appendChild(subredditContainer);
        }
    
        // Save the subreddit to local storage
        this.saveSubreddit(subreddit);
    }

    handleAddSubreddit() {
        const subredditInput = document.getElementById("subreddit").value.trim();
        if (subredditInput) {
            this.fetchSubreddit(subredditInput);
            this.togglePopup();
            document.getElementById("subreddit").value = "";
        }
    }

    saveSubreddit(subreddit) {
        let savedSubreddits = JSON.parse(localStorage.getItem("savedSubreddits") || "[]");
        if (!savedSubreddits.includes(subreddit)) {
            savedSubreddits.push(subreddit);
            localStorage.setItem("savedSubreddits", JSON.stringify(savedSubreddits));
        }
    }

    loadSavedSubreddits() {
        const savedSubreddits = JSON.parse(localStorage.getItem("savedSubreddits") || "[]");
        savedSubreddits.forEach(subreddit => this.fetchSubreddit(subreddit));
    }
}

// Initialize the Reddit client when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new RedditClient();
});