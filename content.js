let LENGTHS = [4, 16]

let style = document.createElement('style');

style.textContent = `
	a {
		text-decoration: underline !important;
	}
	lazy-eye-reader {
		display: inline !important;
		color: #000 !important;
		background-color: #FFF !important;
	}
	lazy-eye-reader.l {
		color: #FFC000 !important;
	}
	lazy-eye-reader.r {
		color: #00FFFF !important;
	}
`;

document.head.append(style);

let walk;
walk = node => {
	console.log(node);
	if (node.nodeType == Node.TEXT_NODE && node.textContent.trim().length > 0) {
		console.log("TEXT!");
		let text = node.textContent;
		let nodes = [];

		let line = document.createElement('lazy-eye-reader');

		let index = 2 * (Math.random() >= 0.5);

		while (text.length > 0) {
			let p = document.createElement('lazy-eye-reader');

			if (index % 4 == 1) {
				p.classList.add('r');
			}
			else if (index % 4 == 3) {
				p.classList.add('l');
			}

			let n = LENGTHS[index % 2];
			index += 1;

			p.textContent = text.substring(0, n);
			text = text.substring(n);

			nodes.push(p);
		}

		line.append(...nodes);

		node.replaceWith(line);
	}
	else if (!['STYLE', 'SCRIPT'].includes(node.tagName)) {
		for (let child of Array.from(node.childNodes)) {
			walk(child);
		}
	}
}

walk(document.body);
