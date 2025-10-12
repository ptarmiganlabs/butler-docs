#!/usr/bin/env node

/**
 * Script to convert markdown image syntax to ResponsiveImage Vue component
 * Converts: ![alt](src "title") to <ResponsiveImage src="..." alt="..." caption="..." />
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsDir = path.join(__dirname, "../docs");
const dryRun = process.argv.includes("--dry-run");
const verbose = process.argv.includes("--verbose");

// Track statistics
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  imagesConverted: 0,
  errors: [],
};

/**
 * Convert markdown image syntax to ResponsiveImage component
 * @param {string} content - File content
 * @param {string} filePath - File path for context
 * @returns {object} - { content, changed, count }
 */
function convertImages(content, filePath) {
  let changed = false;
  let count = 0;

  // Pattern to match markdown images with various formats:
  // 1. Standard: ![alt](src)
  // 2. With title: ![alt](src "title")
  // 3. Malformed: ![alt](src title) - without quotes
  const imageRegex = /!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)"|\s+([^)]+))?\)/g;

  // Check if we're in a table by looking for pipe characters in nearby lines
  const lines = content.split("\n");
  const inTable = (lineIndex) => {
    // Check current line and nearby lines for table syntax
    const startIdx = Math.max(0, lineIndex - 2);
    const endIdx = Math.min(lines.length - 1, lineIndex + 2);
    for (let i = startIdx; i <= endIdx; i++) {
      if (lines[i].includes("|") && !lines[i].trim().startsWith("<!--")) {
        return true;
      }
    }
    return false;
  };

  // Process line by line to handle tables properly
  const convertedLines = lines.map((line, lineIndex) => {
    // Skip if line is already using ResponsiveImage or other Vue components
    if (
      line.includes("<ResponsiveImage") ||
      line.includes("<SwaggerUI") ||
      line.includes("<Notice")
    ) {
      return line;
    }

    // Skip if in a code block
    if (line.trim().startsWith("```") || line.trim().startsWith("~~~")) {
      return line;
    }

    // Check if this line is in a table
    const isInTable = inTable(lineIndex);

    // Convert images in this line
    const convertedLine = line.replace(
      imageRegex,
      (match, alt, src, title, unquotedTitle) => {
        // Skip if not an image file
        if (!/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(src)) {
          return match;
        }

        // If in table, keep markdown syntax (tables don't work well with Vue components)
        if (isInTable) {
          if (verbose) {
            console.log(`  Skipping image in table: ${src}`);
          }
          return match;
        }

        count++;
        changed = true;

        // Use title if provided, otherwise use unquotedTitle
        const caption = title || unquotedTitle;

        // Determine maxWidth based on filename patterns
        let maxWidth = "800px"; // default

        // Mobile screenshots should be smaller
        if (src.includes("mobile") || src.includes("-app-")) {
          maxWidth = "400px";
        }
        // Very large screenshots or desktop images
        else if (
          src.includes("qmc") ||
          src.includes("desktop") ||
          src.includes("overview")
        ) {
          maxWidth = "900px";
        }

        // Build the ResponsiveImage component
        let component = `<ResponsiveImage\n  src="${src}"\n  alt="${alt}"`;

        // Add maxWidth if not default
        if (maxWidth !== "800px") {
          component += `\n  maxWidth="${maxWidth}"`;
        }

        // Add caption if title exists
        if (caption && caption.trim()) {
          component += `\n  caption="${caption.trim()}"`;
        }

        component += "\n/>";

        if (verbose) {
          console.log(
            `  Converting: ${match} -> ${component.replace(/\n/g, " ")}`
          );
        }

        return component;
      }
    );

    return convertedLine;
  });

  return {
    content: convertedLines.join("\n"),
    changed,
    count,
  };
}

/**
 * Process a single markdown file
 * @param {string} filePath - Path to the markdown file
 */
async function processFile(filePath) {
  try {
    stats.filesProcessed++;

    const content = fs.readFileSync(filePath, "utf8");
    const result = convertImages(content, filePath);

    if (result.changed) {
      stats.filesModified++;
      stats.imagesConverted += result.count;

      const relativePath = path.relative(docsDir, filePath);
      console.log(`✓ ${relativePath}: ${result.count} image(s) converted`);

      if (!dryRun) {
        fs.writeFileSync(filePath, result.content, "utf8");
      }
    } else if (verbose) {
      const relativePath = path.relative(docsDir, filePath);
      console.log(`  ${relativePath}: No changes needed`);
    }
  } catch (error) {
    const relativePath = path.relative(docsDir, filePath);
    stats.errors.push({ file: relativePath, error: error.message });
    console.error(`✗ Error processing ${relativePath}:`, error.message);
  }
}

/**
 * Recursively find all markdown files
 * @param {string} dir - Directory to search
 * @returns {string[]} - Array of file paths
 */
function findMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    // Skip certain directories
    if (item.isDirectory()) {
      if (
        ["node_modules", "dist", "cache", ".vitepress/cache"].some((skip) =>
          fullPath.includes(skip)
        )
      ) {
        continue;
      }
      files.push(...findMarkdownFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Main function
 */
async function main() {
  console.log(
    "🔍 Converting markdown images to ResponsiveImage component...\n"
  );

  if (dryRun) {
    console.log("📋 DRY RUN MODE - No files will be modified\n");
  }

  // Find all markdown files
  const files = findMarkdownFiles(docsDir);

  console.log(`Found ${files.length} markdown files\n`);

  // Process each file
  for (const file of files) {
    await processFile(file);
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Summary:");
  console.log("=".repeat(60));
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`Images converted: ${stats.imagesConverted}`);

  if (stats.errors.length > 0) {
    console.log(`\n❌ Errors: ${stats.errors.length}`);
    stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }

  if (dryRun) {
    console.log("\n💡 Run without --dry-run to apply changes");
  }

  console.log("=".repeat(60));
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
