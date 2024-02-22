let t = setInterval(() => {
	let loc = location.href

	if (
		!loc.startsWith("https://www.youtube.com/results") &&
		!loc.startsWith("https://www.youtube.com/watch") &&
		!loc.startsWith("https://www.youtube.com/feed/subscriptions") &&
		!loc.startsWith("https://www.youtube.com/feed/history") &&
		!loc.startsWith("https://www.youtube.com/channel") &&
		!loc.startsWith("https://www.youtube.com/@") &&
		!loc.startsWith("https://www.youtube.com/account")
	) {
		window.location.href = "https://www.youtube.com/results"

		clearInterval(t)
	}

	let related = document.getElementById("related")

	if (related != null) {
		related.remove()
	}

	let comments = document.getElementById("comments")

	if (comments != null) {
		comments.remove()
	}
}, 10)
