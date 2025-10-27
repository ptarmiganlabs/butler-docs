#!/usr/bin/env node

/**
 * Script to fix trailing slashes in VitePress config based on actual file structure
 * Directories with index.md should have trailing slashes, regular .md files should not
 */

import fs from "fs";
import path from "path";

// Find all directories with index.md files
function findDirectoriesWithIndex(baseDir) {
  const directories = new Set();

  function scanDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        const fullPath = path.join(dir, item.name);
        const indexPath = path.join(fullPath, "index.md");

        if (fs.existsSync(indexPath)) {
          // Convert to relative path from docs/docs
          const relativePath = path.relative(
            path.join(baseDir, "docs", "docs"),
            fullPath
          );
          directories.add(relativePath);
        }

        // Recursively scan subdirectories
        scanDir(fullPath);
      }
    }
  }

  scanDir(path.join(baseDir, "docs", "docs"));
  return directories;
}

// Main function
function fixTrailingSlashes() {
  const baseDir = process.cwd();
  const configPath = path.join(baseDir, "docs", ".vitepress", "config.ts");

  // Find directories that should have trailing slashes
  const directoriesWithIndex = findDirectoriesWithIndex(baseDir);
  console.log("Directories with index.md files:");
  directoriesWithIndex.forEach((dir) => console.log(`  ${dir}`));

  // Read config file
  let configContent = fs.readFileSync(configPath, "utf8");

  // For each directory with index.md, ensure it has trailing slash in config
  directoriesWithIndex.forEach((dir) => {
    const urlPath = `/docs/${dir}`;
    const withoutSlash = `link: '${urlPath}'`;
    const withSlash = `link: '${urlPath}/'`;

    // Replace any occurrence of the path without trailing slash
    configContent = configContent.replace(
      new RegExp(
        `link: '${urlPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}'`,
        "g"
      ),
      withSlash
    );
  });

  // Write back to file
  fs.writeFileSync(configPath, configContent, "utf8");
  console.log("\nFixed trailing slashes in VitePress config");
}

fixTrailingSlashes();
