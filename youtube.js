setInterval(() => {
	if (location.href == "https://www.youtube.com/") {
		let home_feed = document.getElementById("contents")

		if (home_feed != null) {
			home_feed.remove()
		}
	}

	let related = document.getElementById("related")

	if (related != null) {
		related.remove()
	}

	let comments = document.getElementById("comments")

	if (comments != null) {
		comments.remove()
	}

	let shorts = document.getElementById("shorts-container")

	if (shorts != null) {
		shorts.remove()

		// Todo: Find a reliable way to stop audio from shorts
	}
}, 50)
