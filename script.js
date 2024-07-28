let related = document.getElementById("show_related")
let comments = document.getElementById("allow_comments")
let shorts = document.getElementById("allow_shorts")

related.addEventListener("change", async e => {
	await chrome.storage.sync.set({ show_related: e.target.checked });
});

comments.addEventListener("change", async e => {
	await chrome.storage.sync.set({ allow_comments: e.target.checked });
});

shorts.addEventListener("change", async e => {
	await chrome.storage.sync.set({ allow_shorts: e.target.checked });
});

chrome.storage.sync.get(["show_related", "allow_comments", "allow_shorts"], r => {
	related.checked = r.show_related ?? false
	comments.checked = r.allow_comments ?? true
	shorts.checked = r.allow_shorts ?? false
});
