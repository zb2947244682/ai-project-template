# @zb2947244682/ai-project-template

AI 开发环境初始化工具。为 Claude Code、Codex 和 Gemini CLI 创建独立配置。

## 快速开始

```bash
npx @zb2947244682/ai-project-template@latest
```

带参数使用：
```bash
npx @zb2947244682/ai-project-template@latest --yes       # 跳过确认
npx @zb2947244682/ai-project-template@latest --dry-run   # 仅预览
npx @zb2947244682/ai-project-template@latest --target ./my-project
```

## 特性

- **独立配置**：每个 AI 工具有自己的配置目录
- **统一规则**：三个主配置文件（CLAUDE.md、GEMINI.md、.agents/AGENTS.md）内容一致
- **多工具支持**：开箱即用支持 Claude Code、Codex、Gemini CLI
- **零安装**：直接通过 `npx` 运行，无需安装
- **代码规范**：内置文件大小限制、关注点分离等规则

## 使用说明

### 初始化新项目

```bash
cd your-project
npx @zb2947244682/ai-project-template@latest
```

### 参数选项

| 参数 | 说明 |
|------|------|
| `--yes` | 跳过确认，直接执行 |
| `--dry-run` | 预览变更，不写入文件 |
| `--target <目录>` | 指定目标目录（默认：当前目录） |

## 项目结构

初始化后，你的项目将包含：

```
.
├── CLAUDE.md              # Claude Code 配置
├── GEMINI.md              # Gemini CLI 配置
├── .agents/               # 共享 AI 治理规则
│   └── AGENTS.md          #（与 CLAUDE.md/GEMINI.md 内容一致）
├── .claude/               # Claude Code 目录
├── .codex/                # Codex 目录
├── .gemini/               # Gemini CLI 目录
├── docs/                  # 项目文档
│   ├── guides/            # 开发指南（环境、规范、FAQ、故障排查）
│   ├── specs/             # 需求规格（PRD、设计、调研）
│   ├── tech/              # 技术文档（架构、API、数据库、决策）
│   └── ops/               # 运维文档（部署、测试、安全、变更）
├── temp/scripts/          # 临时 AI 脚本（不被跟踪）
├── start-claude.bat       # 启动 Claude Code
├── start-codex.bat        # 启动 Codex
├── start-gemini.bat       # 启动 Gemini CLI
├── sessions-cleaner.bat   # 清理 AI 会话历史数据
└── sync.bat               # Git 同步脚本
```

## 重要：文件同步规则

以下三个配置文件**必须始终保持一致**：

- `CLAUDE.md`
- `GEMINI.md`
- `.agents/AGENTS.md`

**规则**：编辑任一文件时，务必同步更新其他两个文件，保持内容一致！

## 代码规范（摘要）

- **文件大小**：单文件不超过 300 行代码
- **前端开发**：HTML、CSS、JS/TS 分离
- **字符串**：常量提取到单独文件
- **架构**：充分解耦、分层、单一职责

完整规范见 CLAUDE.md / GEMINI.md / .agents/AGENTS.md

## 文档说明

项目文档存放在 `docs/` 子目录下，按功能分为四类：

| 目录 | 用途 | 目标读者 |
|------|------|----------|
| `docs/guides/` | 环境搭建、开发规范、FAQ、故障排查 | 全体开发人员 |
| `docs/specs/` | 产品需求、技术设计、技术调研 | 产品经理、开发人员 |
| `docs/tech/` | 架构图、API定义、数据库设计、架构决策 | 架构师、开发人员 |
| `docs/ops/` | 部署流程、测试计划、安全策略、版本变更 | 运维、DevOps |

## 许可证

MIT
