let related = document.getElementById("show_related")
let comments = document.getElementById("allow_comments")

related.addEventListener("change", async e => {
	await chrome.storage.sync.set({ show_related: e.target.checked });
});

comments.addEventListener("change", async e => {
	await chrome.storage.sync.set({ allow_comments: e.target.checked });
});

chrome.storage.sync.get(['show_related', 'allow_comments'], r => {
	related.checked = r.show_related ?? false
	comments.checked = r.allow_comments ?? true
});
