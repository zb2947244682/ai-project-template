# 项目名称

> **注意：本文件是人看的项目介绍，非 AI 配置。AI 配置请查看 CLAUDE.md、GEMINI.md、.agents/AGENTS.md**

## 项目简介

（请在此处添加项目描述）

## 技术栈

（请在此处添加技术栈信息）

## 快速开始

（请在此处添加快速开始指南）

## 项目文档

项目文档统一存放在 `docs/` 目录下：

### 核心文档

| 目录 | 用途 |
|------|------|
| `docs/specs/` | 设计规格、接口定义 |
| `docs/guides/` | 环境搭建、提交规范、操作指南 |
| `docs/architecture/` | 架构图、模块依赖、技术选型 |
| `docs/decisions/` | 技术决策记录（ADRs） |
| `docs/onboarding/` | 项目背景、代码结构、流程说明 |

### 技术文档

| 目录 | 用途 |
|------|------|
| `docs/api/` | API 定义、请求/响应格式、认证方式 |
| `docs/database/` | 数据库设计、ER图、迁移记录 |
| `docs/testing/` | 测试计划、测试用例、覆盖率 |
| `docs/deployment/` | 部署流程、环境配置、CI/CD |
| `docs/security/` | 安全策略、审计报告、漏洞披露 |

### 维护文档

| 目录 | 用途 |
|------|------|
| `docs/changelog/` | 版本发布说明、变更记录 |
| `docs/faq/` | 常见问题解答 |
| `docs/troubleshooting/` | 错误排查、调试指南、应急响应 |

### 产品文档

| 目录 | 用途 |
|------|------|
| `docs/requirements/` | 业务需求、功能规格、用户故事 |
| `docs/research/` | 技术调研、POC结果、竞品分析 |

## 项目结构

```
.
├── README.md              # 本文件（项目介绍）
├── CLAUDE.md              # Claude Code 配置
├── GEMINI.md              # Gemini CLI 配置
├── .agents/               # 通用 AI 治理规则
├── .claude/               # Claude Code 专用目录
├── .codex/                # Codex 专用目录
├── .gemini/               # Gemini CLI 专用目录
├── docs/                  # 项目文档
│   ├── specs/             # 规格文档
│   ├── guides/            # 指南文档
│   ├── architecture/      # 架构文档
│   ├── decisions/         # 决策记录
│   ├── onboarding/        # 新人入职
│   ├── api/               # API 文档
│   ├── database/          # 数据库文档
│   ├── deployment/        # 部署文档
│   ├── testing/           # 测试文档
│   ├── security/          # 安全文档
│   ├── changelog/         # 变更日志
│   ├── faq/               # 常见问题
│   ├── troubleshooting/   # 故障排查
│   ├── requirements/      # 需求文档
│   └── research/          # 研究文档
├── temp/scripts/          # 临时脚本（不跟踪）
└── sync.bat               # Git 同步脚本
```

## AI 配置说明

本项目配置了多个 AI 工具，各工具配置文件：

- **CLAUDE.md** / **GEMINI.md** / **.agents/AGENTS.md**：三个文件内容必须保持一致，包含代码规范、文件大小限制、目录结构等规则

**重要**：修改任一配置文件时，务必同步更新其他两个文件！

## 代码规范（摘要）

- 单文件不超过 300 行代码
- 前端开发：HTML、CSS、JS/TS 分离
- 字符串常量单独提取到常量文件
- 充分解耦、分层架构、单一职责

完整规范见 CLAUDE.md / GEMINI.md / .agents/AGENTS.md

## 贡献指南

（请在此处添加贡献指南）

---

*本 README 文档待完善。*
