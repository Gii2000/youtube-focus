let comments_div = null
let comments_button = null

let old_loc = null

let show_related, allow_comments, allow_shorts

chrome.storage.sync.get(['show_related', 'allow_comments', 'allow_shorts'], r => {
	show_related = r.show_related ?? false
	allow_comments = r.allow_comments ?? true
	allow_shorts = r.allow_shorts ?? false
});

let t = setInterval(() => {
	if (show_related == null) {
		return;
	}

	let loc = location.href

	if (loc != old_loc) {
		chrome.storage.sync.get(['show_related', 'allow_comments', 'allow_shorts'], r => {
			show_related = r.show_related ?? false
			allow_comments = r.allow_comments ?? true
			allow_shorts = r.allow_shorts ?? false
		});

		if (
			loc == "https://www.youtube.com" ||
			loc == "https://www.youtube.com/" ||
			loc.startsWith("https://www.youtube.com/channel/UC") ||
			loc.startsWith("https://www.youtube.com/feed") && !(
				loc.startsWith("https://www.youtube.com/feed/you") ||
				loc.startsWith("https://www.youtube.com/feed/playlists") ||
				loc.startsWith("https://www.youtube.com/feed/history") ||
				loc.startsWith("https://www.youtube.com/feed/subscriptions")
			) ||
			loc.startsWith("https://www.youtube.com/gaming") ||
			loc.startsWith("https://www.youtube.com/podcasts") ||
			loc.startsWith("https://www.youtube.com/playables") ||
			loc.startsWith("https://www.youtube.com/shorts") && !allow_shorts
		) {
			window.location.replace("https://www.youtube.com/results")

			clearInterval(t)
		}

		old_loc = loc
		comments_div = null
	}

	if (loc.startsWith("https://www.youtube.com/shorts") && !show_related) {
		let shorts_view = document.getElementById("shorts-container")

		if (shorts_view != null) {
			shorts_view.style.overflowY = "hidden"
		}

		let nav_buttons = document.getElementsByClassName("navigation-button")

		for (let button of nav_buttons) {
			button.remove()
		}
	}

	let related = document.getElementById("related") ?? document.getElementById("bottom-grid")

	if (related && !show_related) {
		related.remove()
	}

	let comments = document.getElementById("comments")

	if (comments != null && comments_div == null) {
		if (!allow_comments) {
			comments.remove()
		}
		else {
			comments_div = comments

			if (comments_button != null) {
				comments_button.remove()
			}

			comments_button = document.createElement("div")
			comments_button.classList.add("item")
			comments_button.style.cssText = `
				padding: 6px;
				color: var(--yt-spec-text-primary);
				background: var(--yt-spec-badge-chip-background);
				border-radius: 8px;
				text-align: center;
				font-size: 1.4rem;
				font-weight: 400;
				cursor: pointer;
			`

			comments.parentElement.insertBefore(comments_button, comments)

			let hide_comments = () => {
				comments.style.display = "none"
				comments_button.textContent = "Show comments"
				comments_button.onclick = () => {
					comments.style.display = "block"
					comments_button.textContent = "Hide comments"

					comments_button.onclick = hide_comments
				}
			}

			hide_comments()
		}
	}
}, 10)
