const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "public");

function rmrf(dir) {
	if (fs.existsSync(dir)) {
		fs.rmSync(dir, { recursive: true, force: true });
	}
}

function copyDir(src, dest) {
	fs.mkdirSync(dest, { recursive: true });
	for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
		const s = path.join(src, ent.name);
		const d = path.join(dest, ent.name);
		if (ent.isDirectory()) {
			copyDir(s, d);
		} else {
			fs.copyFileSync(s, d);
		}
	}
}

function copyFile(src, dest) {
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.copyFileSync(src, dest);
}

rmrf(out);
fs.mkdirSync(out, { recursive: true });
copyFile(path.join(root, "index.html"), path.join(out, "index.html"));
copyDir(path.join(root, "css"), path.join(out, "css"));
copyDir(path.join(root, "images"), path.join(out, "images"));
copyDir(path.join(root, "js"), path.join(out, "js"));
