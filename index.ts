#! /usr/bin/env node
const shell = require("shelljs");
const path = require("path");
const args = process.argv.slice(2);

if (!shell.which("git")) {
  shell.echo("Sorry, this script requires git");
  shell.exit(1);
}

const REPO_NAME = args[0] || "turbo-cast";

const cloneAndClear = (repoUrl: string, repoName?: string) => {
  shell.exec(`git clone ${repoUrl} ${repoName}`);
  shell.cd(repoName);
  shell.rm("-rf", ".git");
  shell.cd("../");
};

cloneAndClear(
  "https://github.com/jamstack-consulting/turbo-cast.git",
  REPO_NAME
);

// Install packages.
shell.cd(`${REPO_NAME}/packages`);
cloneAndClear(
  "https://github.com/jamstack-consulting/remark-end-with-code-block.git",
  "remark-end-with-code-block"
);
cloneAndClear(
  "https://github.com/jamstack-consulting/remark-mdx-toc.git",
  "remark-mdx-toc"
);
cloneAndClear(
  "https://github.com/jamstack-consulting/remark-pluck.git",
  "remark-pluck"
);
shell.cd("../");

// Install spellbook

shell.cd("./apps");
cloneAndClear(
  "https://github.com/jamstack-consulting/spellbook.git",
  "spellbook"
);
