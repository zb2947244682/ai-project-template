const fs = require("fs/promises");
const path = require("path");
const readline = require("readline/promises");
const { stdin, stdout } = require("process");

async function collectTemplateEntries(templateDir) {
  const counts = { files: 0, directories: 0 };
  await walk(templateDir, counts);
  return counts;
}

async function walk(currentPath, counts) {
  const entries = await fs.readdir(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(currentPath, entry.name);
    if (entry.isDirectory()) {
      counts.directories += 1;
      await walk(entryPath, counts);
      continue;
    }

    if (entry.isFile()) {
      counts.files += 1;
    }
  }
}

function parseCliArgs(args) {
  const options = {
    dryRun: false,
    help: false,
    target: null,
    yes: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "-y" || arg === "--yes") {
      options.yes = true;
      continue;
    }

    if (arg === "-d" || arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "-h" || arg === "--help") {
      options.help = true;
      continue;
    }

    if (arg === "-t" || arg === "--target") {
      const nextArg = args[index + 1];
      if (!nextArg) {
        throw new Error("--target 需要提供目录路径");
      }
      options.target = nextArg;
      index += 1;
      continue;
    }

    throw new Error(`不支持的参数: ${arg}`);
  }

  return options;
}

async function promptForConfirmation() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const answer = await rl.question("是否继续并覆盖目标目录中的同名文件？[Y/n] ");
    const normalized = answer.trim().toLowerCase();
    return normalized === "" || normalized === "y" || normalized === "yes";
  } finally {
    rl.close();
  }
}

async function applyTemplate({ templateDir, targetDir, dryRun }) {
  const summary = {
    createdDirectories: 0,
    createdFiles: 0,
    overwrittenFiles: 0,
    preservedFiles: 0,
    skippedEntries: 0,
    dryRun,
    targetDir,
  };

  await fs.mkdir(targetDir, { recursive: true });
  await copyDirectory(templateDir, targetDir, summary, dryRun);

  return summary;
}

async function copyDirectory(sourceDir, targetDir, summary, dryRun) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetName = mapTemplateEntryName(entry.name);
    const targetPath = path.join(targetDir, targetName);

    if (entry.isDirectory()) {
      const exists = await pathExists(targetPath);
      if (!exists) {
        summary.createdDirectories += 1;
        if (!dryRun) {
          await fs.mkdir(targetPath, { recursive: true });
        }
      }

      await copyDirectory(sourcePath, targetPath, summary, dryRun);
      continue;
    }

    if (!entry.isFile()) {
      summary.skippedEntries += 1;
      continue;
    }

    await fs.mkdir(path.dirname(targetPath), { recursive: true });

    const exists = await pathExists(targetPath);
    if (shouldPreserveExistingFile(targetName, exists)) {
      summary.preservedFiles += 1;
      continue;
    }

    if (exists) {
      summary.overwrittenFiles += 1;
    } else {
      summary.createdFiles += 1;
    }

    if (!dryRun) {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

function mapTemplateEntryName(entryName) {
  if (entryName === "_gitignore") {
    return ".gitignore";
  }

  return entryName;
}

function shouldPreserveExistingFile(targetName, exists) {
  return exists && targetName === ".gitignore";
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function formatSummary(summary) {
  const lines = [
    "",
    summary.dryRun ? "预演完成。" : "模板应用完成。",
    `目标目录: ${summary.targetDir}`,
    `新建目录: ${summary.createdDirectories}`,
    `新建文件: ${summary.createdFiles}`,
    `覆盖文件: ${summary.overwrittenFiles}`,
  ];

  if (summary.preservedFiles > 0) {
    lines.push(`保留现有文件: ${summary.preservedFiles}`);
  }

  if (summary.skippedEntries > 0) {
    lines.push(`跳过条目: ${summary.skippedEntries}`);
  }

  lines.push("未出现在模板中的现有文件未被删除。");
  lines.push("");
  lines.push("重要: 编辑 CLAUDE.md / GEMINI.md / .agents/AGENTS.md 时，务必保持三个文件内容一致！");
  return lines.join("\n");
}

module.exports = {
  applyTemplate,
  collectTemplateEntries,
  formatSummary,
  parseCliArgs,
  promptForConfirmation,
};
