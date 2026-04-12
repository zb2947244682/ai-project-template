# Claude Code 项目配置

## 项目文档位置

项目文档统一存放在 `docs/` 目录下，按类别分子目录存放：

| 目录 | 用途 |
|------|------|
| `docs/specs/` | 设计规格、接口定义 |
| `docs/guides/` | 环境搭建、提交规范、操作指南 |
| `docs/architecture/` | 架构图、模块依赖、技术选型 |
| `docs/decisions/` | 技术决策记录（ADRs） |
| `docs/onboarding/` | 项目背景、代码结构、流程说明 |
| `docs/api/` | API 定义、请求/响应格式、认证方式 |
| `docs/database/` | 数据库设计、ER图、迁移记录 |
| `docs/deployment/` | 部署流程、环境配置、CI/CD |
| `docs/testing/` | 测试计划、测试用例、覆盖率 |
| `docs/security/` | 安全策略、审计报告、漏洞披露 |
| `docs/changelog/` | 版本发布说明、变更记录 |
| `docs/faq/` | 常见问题解答 |
| `docs/troubleshooting/` | 错误排查、调试指南、应急响应 |
| `docs/requirements/` | 业务需求、功能规格、用户故事 |
| `docs/research/` | 技术调研、POC结果、竞品分析 |

**注意**：请勿将项目文档信息写入本文件，只保留 AI 治理规则。

## 文件同步规则（重要）

本项目有以下 AI 配置文件，**内容必须始终保持一致**：

- `CLAUDE.md` - 本文件（Claude Code 配置）
- `GEMINI.md` - Gemini CLI 配置
- `.agents/AGENTS.md` - 通用治理规则

**规则**：
- 无论修改哪个文件，都必须同步修改其他两个文件
- 保持三个文件的内容完全一致
- 修改完成后，使用 `sync.bat` 提交到 git

## 语言规则

- 默认语言：`简体中文`
- 所有回复、文档、注释使用简体中文
- **例外：所有 `.bat` 文件必须使用纯英文（避免编码问题）**

## 项目约定

- 优先最小必要抽象
- 先判断改动层级，再动手
- 错误信息要可读

## 代码规范

### 文件组织原则

- **充分解耦**：各模块间依赖关系清晰，避免循环依赖
- **分层架构**：按职责分层（如数据层、业务层、表现层），层与层之间通过接口通信
- **单一职责**：大多数文件应只负责一项功能，便于维护和测试

### 文件大小限制

- **单文件不得超过 300 行代码**
- 超过 300 行必须拆分为多个文件
- 拆分原则：按功能模块或逻辑单元拆分

### 前端开发规范

- **HTML、CSS、JavaScript/TypeScript 必须分离**
- 禁止在 HTML 中写内联样式（除动态计算值外）
- 禁止在 HTML 中写内联脚本（除必要的初始化外）
- 每个文件类型放在对应目录（如 `css/`、`js/`、`ts/`）

### 字符串管理

- **大量字符串常量必须单独提取**
- 定义到独立的常量文件中（如 `constants.js`、`strings.py`、`messages.go`）
- 禁止在业务逻辑代码中硬编码长字符串
- 适用于所有编程语言，不仅限于 Node.js

### 目录结构示例

```
src/
├── constants/         # 字符串常量
│   └── messages.ts
├── utils/            # 工具函数
│   ├── format.ts
│   └── validate.ts
├── components/       # UI 组件
│   ├── Button/
│   │   ├── index.ts
│   │   ├── Button.ts
│   │   └── Button.css
│   └── Input/
├── services/         # 业务逻辑层
│   ├── userService.ts
│   └── authService.ts
└── pages/            # 页面层
    ├── Home/
    └── Login/
```

## 验证基线

- 前端改动运行 `npm run build`

## 临时文件规范

- 所有 AI 生成的临时脚本必须放在 `temp/scripts/` 目录下
- 禁止在根目录放置临时文件
- `temp/` 目录下的所有文件都不被 git 跟踪（已配置 .gitignore）
- 定期清理临时文件
