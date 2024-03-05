let comments_div = null
let comments_button = null
let old_loc = null

let t = setInterval(() => {
	let loc = location.href

	if (loc != old_loc) {
		if (
			!loc.startsWith("https://www.youtube.com/results") &&
			!loc.startsWith("https://www.youtube.com/watch") &&
			!loc.startsWith("https://www.youtube.com/feed/subscriptions") &&
			!loc.startsWith("https://www.youtube.com/feed/history") &&
			!loc.startsWith("https://www.youtube.com/channel") &&
			!loc.startsWith("https://www.youtube.com/playlist") &&
			!loc.startsWith("https://www.youtube.com/embed") &&
			!loc.startsWith("https://www.youtube.com/@") &&
			!loc.startsWith("https://www.youtube.com/user") &&
			!loc.startsWith("https://www.youtube.com/account") &&
			!loc.startsWith("https://www.youtube.com/live_chat_replay")
		) {
			window.location.replace("https://www.youtube.com/results")

			clearInterval(t)
		}

		old_loc = loc
		comments_div = null
	}

	let related = document.getElementById("related")

	if (related != null) {
		related.remove()
	}

	let comments = document.getElementById("comments")

	if (comments != null && comments_div == null) {
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
}, 10)
