#!/usr/bin/env node

const path = require("path");
const {
  applyTemplate,
  collectTemplateEntries,
  parseCliArgs,
  promptForConfirmation,
  formatSummary,
} = require("../lib/apply-template");

async function main() {
  const options = parseCliArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const packageRoot = path.resolve(__dirname, "..");
  const templateDir = path.join(packageRoot, "template");
  const targetDir = path.resolve(options.target || process.cwd());
  const entries = await collectTemplateEntries(templateDir);

  console.log("AI Project Template CLI");
  console.log(`模板目录: ${templateDir}`);
  console.log(`目标目录: ${targetDir}`);
  console.log(`模板条目: ${entries.files} 个文件，${entries.directories} 个目录`);
  console.log(options.dryRun ? "执行模式: 预演，不会真正写入文件" : "执行模式: 覆盖复制");
  console.log("行为说明: 仅复制模板中存在的文件；同名文件会被覆盖，其它现有文件会保留。");
  console.log("重要提示: CLAUDE.md / GEMINI.md / .agents/AGENTS.md 三个文件内容必须保持一致！");

  if (!options.yes) {
    const confirmed = await promptForConfirmation();
    if (!confirmed) {
      console.log("已取消。");
      return;
    }
  }

  const result = await applyTemplate({
    templateDir,
    targetDir,
    dryRun: options.dryRun,
  });

  console.log(formatSummary(result));
}

function printHelp() {
  console.log(`Usage:
  npx @zb2947244682/ai-project-template
  npx @zb2947244682/ai-project-template --yes
  npx @zb2947244682/ai-project-template --dry-run
  npx @zb2947244682/ai-project-template --target D:\\Codes\\my-project

Options:
  -y, --yes       Skip confirmation and execute directly
  -d, --dry-run   Preview changes without writing files
  -t, --target    Specify target directory (default: current directory)
  -h, --help      Show this help message

Files created:
  - CLAUDE.md      Claude Code configuration
  - GEMINI.md      Gemini CLI configuration
  - .agents/       Shared governance rules
  - .claude/       Claude Code directory
  - .codex/        Codex directory
  - .gemini/       Gemini CLI directory
  - temp/scripts/  Temporary AI scripts directory
  - sync.bat       Git sync script
  - start-*.bat    AI tool launch scripts

Note: The three config files (CLAUDE.md, GEMINI.md, .agents/AGENTS.md)
must be kept in sync. When editing one, update the others as well.
`);
}

main().catch((error) => {
  console.error("执行失败:");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
