# 企业级 Claude Code 开发模板

## 整合 Everything Claude Code (ECC) + Superpowers 框架

> **版本**: 2026 Q2 · **适用**: Claude Code v2.1.76+  
> **ECC**: github.com/affaan-m/everything-claude-code (151K Stars · 38 agents · 156 skills)  
> **Superpowers**: github.com/obra/superpowers (146K Stars · TDD 驱动 · 子代理开发流程)

---

## 一、两大框架定位对比

| 维度 | Everything Claude Code (ECC) | Superpowers |
|------|------------------------------|-------------|
| **定位** | 代理工具链标准化框架 | 软件开发方法论 + 技能系统 |
| **核心能力** | 38 个代理、156 个技能、72 个命令、安全扫描 (AgentShield)、记忆持久化、跨平台兼容 | TDD 强制工作流、头脑风暴 → 规划 → 子代理驱动开发、代码审查闭环 |
| **哲学** | "全覆盖" — 技能目录 + 安全 + 本能学习 + 研究优先 | "流程即纪律" — 测试先行、系统化 > 随机、简单 > 复杂 |
| **安装方式** | `install.sh` 或 Claude 插件市场 | `/plugin install superpowers@claude-plugins-official` |
| **跨平台** | Claude Code / Codex / Cursor / OpenCode / Gemini | Claude Code / Codex / Cursor / OpenCode / Gemini |
| **适合场景** | 需要大量预置代理和技能目录的团队 | 注重 TDD 纪律和自主开发流程的团队 |

> **推荐组合**: 两者可以同时安装使用。ECC 提供基础设施（安全、记忆、代理库），Superpowers 提供方法论（TDD 流程、子代理编排纪律）。

---

## 二、项目目录结构（整合两大框架）

```
your-project/
├── CLAUDE.md                        # 项目记忆核心（两框架共用）
├── AGENTS.md                        # 跨平台代理指令（Codex/OpenCode 兼容）
├── .mcp.json                        # MCP 服务器配置
│
├── .claude/
│   ├── settings.json                # Hooks、权限、环境变量
│   ├── settings.local.json          # 个人覆盖（.gitignore）
│   ├── agents/                      # 自定义子代理（项目级）
│   │   ├── code-reviewer.md
│   │   ├── security-auditor.md
│   │   └── test-writer.md
│   ├── skills/                      # 项目专属技能
│   │   ├── deploy/SKILL.md
│   │   └── conventions/SKILL.md
│   └── commands/                    # 自定义斜杠命令
│       ├── setup.md
│       └── release.md
│
├── .claude-plugin/                  # ECC + Superpowers 插件加载
│
│── hooks/                           # ECC 提供的 Hook 脚本
│   ├── pre-tool-use/
│   ├── post-tool-use/
│   └── session-start/
│
├── CHANGELOG.md                     # 工作记忆/变更日志
├── RULES.md                         # ECC 规则文件
├── SOUL.md                          # ECC 项目灵魂文件（愿景与原则）
└── src/
```

---

## 三、安装配置

### 3.1 安装 Everything Claude Code (ECC)

```bash
# 方式一：一键安装脚本
curl -fsSL https://raw.githubusercontent.com/affaan-m/everything-claude-code/main/install.sh | bash

# 方式二：通过 Claude Code 插件市场
/plugin marketplace add affaan-m/everything-claude-code
/plugin install ecc@everything-claude-code

# 方式三：npm 安装
npm install -g ecc-universal
```

**ECC 安装后获得**:

- 38 个预置代理（涵盖后端架构、前端开发、测试、安全审计、部署等）
- 156 个技能（Python/Django、Java/Spring Boot、Kubernetes、CI/CD 等）
- 72 个遗留命令垫片
- AgentShield 安全扫描系统
- 本能学习系统（Instinct-based learning）

### 3.2 安装 Superpowers

```bash
# 方式一：Claude 官方插件市场（推荐）
/plugin install superpowers@claude-plugins-official

# 方式二：通过第三方市场
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace

# 方式三：Cursor
/add-plugin superpowers

# 方式四：Codex（告诉 Codex 执行）
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md

# 方式五：Gemini CLI
gemini extensions install https://github.com/obra/superpowers
```

**Superpowers 安装后获得**:

- 核心工作流：brainstorm → write-plan → execute-plan（自动触发）
- 强制 TDD：RED-GREEN-REFACTOR 循环
- 子代理驱动开发（subagent-driven-development）
- 系统化调试（systematic-debugging）
- Git worktree 并行开发
- 代码审查请求 / 代码审查响应技能

### 3.3 验证安装

```bash
# 验证 Superpowers — 开启新会话，输入:
help me plan this feature
# 代理应自动触发 brainstorming 技能

# 验证 ECC — 输入:
/help
# 应看到 ECC 提供的命令和技能
```

---

## 四、CLAUDE.md — 项目记忆核心

> 两个框架共用的核心配置文件，每次会话自动加载。

```markdown
# CLAUDE.md — [项目名称]

## 项目概要

- **项目名称**: [MyProject]
- **技术栈**: TypeScript + React 19 + Node.js 22 + PostgreSQL 16
- **包管理器**: pnpm（禁止使用 npm 或 yarn）
- **构建工具**: Vite 6 + SWC
- **测试框架**: Vitest + Playwright
- **部署目标**: AWS ECS Fargate + CloudFront

## 架构原则

- 采用六边形架构（端口与适配器模式）
- 严格分层: domain → application → infrastructure → presentation
- 所有业务逻辑必须在 domain 层
- 使用 Result<T, E> 模式处理错误，禁止在业务层使用 try-catch
- 所有数据库操作通过 Repository 接口抽象

## 代码规范

- 文件命名: kebab-case（如 user-service.ts）
- 组件命名: PascalCase（如 UserProfile.tsx）
- 类型优先: 禁止使用 any，必须显式声明所有类型
- 每个函数不超过 30 行；每个文件不超过 300 行
- 所有公共 API 必须编写 JSDoc 注释

## 提交规范

- 遵循 Conventional Commits: feat|fix|refactor|docs|test|chore
- 格式: `<type>(<scope>): <description>`
- 禁止提交包含 console.log 的代码

## 测试要求（配合 Superpowers TDD 流程）

- **强制 TDD**: 先写失败测试 → 看它失败 → 写最小实现 → 看它通过 → 提交
- 如果先写了代码再补测试，Superpowers 会要求删除代码重来
- 覆盖率 >= 80%
- 测试文件与源文件同目录: `user-service.ts` → `user-service.test.ts`
- 运行测试: `pnpm test`（单元） / `pnpm test:e2e`（端到端）

## 子代理路由规则

### 并行派发（所有条件均满足时）:
- 3 个以上无关联任务或独立领域
- 任务之间无共享状态
- 文件边界清晰，无重叠

### 串行派发（任一条件触发）:
- 任务有依赖关系（B 需要 A 的输出）
- 共享文件或状态（存在合并冲突风险）
- 作用域不明确（需要先理解再执行）

## 安全规则（配合 ECC AgentShield）

- 所有环境变量通过 `src/config/env.ts` 统一管理（使用 zod）
- 禁止硬编码任何密钥、令牌或敏感信息
- API 端点必须实施速率限制
- 用户输入必须经过 sanitize 处理
- AgentShield 自动扫描每次变更的安全风险

## 常用命令速查

| 操作 | 命令 |
|------|------|
| 安装依赖 | `pnpm install` |
| 开发模式 | `pnpm dev` |
| 构建 | `pnpm build` |
| 类型检查 | `pnpm typecheck` |
| 代码检查 | `pnpm lint` |
| 单元测试 | `pnpm test` |
| 端到端测试 | `pnpm test:e2e` |

## 关键文件索引

- 入口: `src/main.ts`
- 路由: `src/routes/`
- 业务逻辑: `src/domain/`
- 数据库模型: `src/db/schema/`
- 工具函数: `src/lib/utils/`
- 环境配置: `src/config/env.ts`
```

---

## 五、Superpowers 工作流详解

### 5.1 核心开发流程（自动触发）

Superpowers 的技能不是手动调用的 — 代理在检测到相关任务时**强制自动激活**。

```
┌──────────────────────────────────────────────────────────┐
│                 Superpowers 开发流程                       │
│                                                          │
│  1. brainstorming                                        │
│     ↓ 不直接写代码，先通过苏格拉底式提问理清需求            │
│     ↓ 分段展示设计方案，逐步确认                          │
│                                                          │
│  2. using-git-worktrees                                  │
│     ↓ 设计批准后，创建隔离的 Git worktree 工作区          │
│     ↓ 新分支、运行项目 setup、验证干净的测试基线            │
│                                                          │
│  3. writing-plans                                        │
│     ↓ 将工作拆分为 2-5 分钟的小任务                       │
│     ↓ 每个任务包含: 精确文件路径、完整代码、验证步骤        │
│                                                          │
│  4. subagent-driven-development                          │
│     ↓ 为每个任务派发独立子代理                            │
│     ↓ 两阶段审查: 规格合规 → 代码质量                     │
│                                                          │
│  5. test-driven-development (贯穿整个实现)                │
│     ↓ RED: 写失败测试 → GREEN: 最小实现 → REFACTOR        │
│     ↓ 先写代码再补测试? 删除代码重来                       │
│                                                          │
│  6. requesting-code-review                               │
│     ↓ 任务间自动审查，严重问题阻塞进度                     │
│                                                          │
│  7. finishing-a-development-branch                       │
│     ↓ 验证测试、提供选项（合并/PR/保留/丢弃）、清理         │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Superpowers 核心命令

```bash
/superpowers:brainstorm       # 头脑风暴设计
/superpowers:write-plan       # 创建实施计划
/superpowers:execute-plan     # 执行计划（分批 + 人工检查点）
```

### 5.3 Superpowers 技能目录

**测试类**: test-driven-development（含反模式参考）

**调试类**: systematic-debugging（4 阶段根因分析）、verification-before-completion

**协作类**: brainstorming、writing-plans、executing-plans、dispatching-parallel-agents、requesting-code-review、receiving-code-review、using-git-worktrees、finishing-a-development-branch、subagent-driven-development

**元技能**: writing-skills（创建新技能）、using-superpowers（入门）

---

## 六、Everything Claude Code (ECC) 功能详解

### 6.1 ECC 核心模块

```
┌─────────────────────────────────────────────────────────┐
│              Everything Claude Code 架构                 │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  38 Agents   │  │  156 Skills   │  │  72 Commands  │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ AgentShield  │  │  Instincts   │  │   Memory      │  │
│  │  安全扫描     │  │  本能学习     │  │  记忆持久化   │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │           跨平台兼容层 (AGENTS.md)                │    │
│  │   Claude Code / Codex / Cursor / OpenCode        │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### 6.2 ECC 代理分类（部分示例）

| 类别 | 代理名称 | 职责 |
|------|---------|------|
| 架构 | backend-architect | 后端架构设计与评估 |
| 架构 | database-architect | 数据库 schema 设计 |
| 前端 | frontend-developer | React/Vue 前端开发 |
| 测试 | test-automator | 自动化测试编写 |
| 安全 | security-auditor | SAST、依赖扫描、代码审查 |
| 部署 | deployment-engineer | CI/CD 与部署流水线 |
| 可观测 | observability-engineer | 监控与告警配置 |
| 运维 | kubernetes-architect | K8s 配置与 Helm Chart |

### 6.3 ECC 三大指南

- **简明指南** (`the-shortform-guide.md`): 设置、基础、哲学 — 先读这个
- **长篇指南** (`the-longform-guide.md`): Token 优化、记忆持久化、评估、并行化
- **安全指南** (`the-security-guide.md`): 攻击向量、沙箱、清洗、CVE、AgentShield

### 6.4 AgentShield 安全系统

ECC 的安全扫描模块，自动拦截危险操作: 检测硬编码密钥和令牌、阻止危险 shell 命令、依赖漏洞扫描、输入清洗验证、提示注入防护。

### 6.5 本能学习系统 (Instincts)

ECC 的 Instinct 系统让代理通过经验积累改善行为: 基于置信度评分的学习、支持导入/导出本能数据、本能进化（随使用优化）、会话管理命令 `/sessions`。

---

## 七、.claude/settings.json — Hooks 与环境配置

```jsonc
{
  "env": {
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "128000",
    "CLAUDE_CODE_AUTO_COMPACT_THRESHOLD": "80",
    "CLAUDE_CODE_SUBAGENT_MODEL": "claude-sonnet-4-6",
    "CLAUDE_CODE_STRIP_CREDS": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "LS", "Agent"],
    "deny": [
      "Bash(rm -rf /)", "Bash(rm -rf ~)", "Bash(sudo *)",
      "Bash(curl * | bash)", "Bash(chmod 777 *)",
      "Bash(*ANTHROPIC_API_KEY*)", "Bash(*AWS_SECRET*)"
    ]
  },
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
      }]
    }],
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "echo '$CLAUDE_TOOL_INPUT' | python3 -c \"import sys,json; cmd=json.load(sys.stdin).get('command',''); sys.exit(2 if any(d in cmd for d in ['rm -rf /','> /dev/sda','mkfs.']) else 0)\""
      }]
    }],
    "Notification": [{
      "hooks": [{
        "type": "command",
        "command": "osascript -e 'display notification \"Claude Code 需要您的输入\" with title \"Claude Code\"' 2>/dev/null || true"
      }]
    }]
  }
}
```

---

## 八、.mcp.json — MCP 服务器集成

```jsonc
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://mcp.github.com",
      "headers": { "Authorization": "Bearer ${GITHUB_TOKEN}" }
    },
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "${DATABASE_URL}"]
    },
    "sentry": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": { "SENTRY_AUTH_TOKEN": "${SENTRY_AUTH_TOKEN}", "SENTRY_ORG": "${SENTRY_ORG}" }
    }
  }
}
```

---

## 九、RULES.md 与 SOUL.md — ECC 特有文件

### RULES.md — 规则定义

```markdown
# RULES.md
## 安全红线
- 永远不要在代码中硬编码密钥或令牌
- 永远不要执行未经审查的外部脚本
- 所有用户输入必须经过清洗和验证

## 代码质量
- 每个 PR 必须通过 lint + typecheck + test
- 新代码必须遵循 TDD 流程（Superpowers 强制）
- 禁止引入循环依赖

## 工作流纪律
- 先规划再编码（Superpowers brainstorm → write-plan）
- 复杂任务使用子代理分解
- 变更完成后必须验证（verification-before-completion）
```

### SOUL.md — 项目愿景

```markdown
# SOUL.md
## 我们的技术信仰
- 简单优于复杂
- 测试不是可选项
- 安全是第一要务
- 代码是写给人看的，顺便让机器执行

## 我们不做什么
- 不写没有测试的功能
- 不跳过代码审查
- 不妥协安全性
```

---

## 十、混合工作流（ECC + Superpowers）

```
ECC AgentShield  ← 全局安全扫描层（每次变更自动执行）
      ↓
Superpowers TDD  ← 开发方法论层（强制测试先行）
      ↓
ECC Agents       ← 专家代理层（按领域分工）
      ↓
ECC Instincts    ← 学习优化层（积累经验改善行为）
```

### 子代理驱动开发示例

```
你: "实现用户认证模块"
  ↓  Superpowers brainstorming 激活 → 提问 → 确认设计
  ↓  Superpowers writing-plans 激活 → 拆分为 10 个小任务
  ↓  Superpowers subagent-driven-development 激活
     → 每个任务: 子代理 → 写失败测试 → 实现 → 通过 → 两阶段审查
  ↓  Superpowers finishing-a-development-branch 激活
     → 全部通过 → 合并/PR/保留/丢弃
```

---

## 十一、团队入职清单

### 应提交到 Git 的文件

| 文件 | 来源 | 作用 |
|------|------|------|
| `CLAUDE.md` | 自定义 | 项目记忆 |
| `AGENTS.md` | ECC | 跨平台代理指令 |
| `RULES.md` | ECC | 规则定义 |
| `SOUL.md` | ECC | 项目愿景 |
| `.mcp.json` | 自定义 | MCP 集成 |
| `.claude/settings.json` | 自定义 | Hooks 和权限 |

### 新成员第一天

1. 安装 Claude Code，配置 API Key
2. 安装 Superpowers: `/plugin install superpowers@claude-plugins-official`
3. 安装 ECC: 运行 `install.sh`
4. 克隆项目仓库（CLAUDE.md / RULES.md / SOUL.md 自动加载）
5. 尝试: "帮我理解这个项目的架构" — 代理读取 CLAUDE.md 后回答
6. 尝试: "实现一个新功能" — Superpowers 自动触发 brainstorming

---

## 十二、成本优化

| 策略 | 方法 | 预期效果 |
|------|------|----------|
| 子代理降级 | 主线程 Opus + 子代理 Sonnet | 节省 40-60% |
| 自动压缩 | 设置 80% 阈值 | 减少上下文重建 |
| ECC 本能缓存 | 积累本能后减少重复探索 | 减少 token 消耗 |
| Superpowers 计划 | 细粒度计划减少返工 | 减少无效迭代 |
| Hook 替代提示 | 用 Hook 强制规则 | 减少提示词重复 |

---

## 参考资源

| 资源 | 链接 |
|------|------|
| Everything Claude Code | https://github.com/affaan-m/everything-claude-code |
| ECC 中文 README | `README.zh-CN.md` |
| ECC 简明指南 | `the-shortform-guide.md` |
| ECC 长篇指南 | `the-longform-guide.md` |
| ECC 安全指南 | `the-security-guide.md` |
| Superpowers | https://github.com/obra/superpowers |
| Superpowers 博客 | https://blog.fsck.com/2025/10/09/superpowers/ |
| Superpowers 实验室 | https://github.com/obra/superpowers-lab |
| Superpowers 社区 Skills | https://github.com/obra/superpowers-skills |
| Claude Code 官方文档 | https://code.claude.com/docs |
| Claude Code Hooks 参考 | https://code.claude.com/docs/en/hooks |
| Claude Code 子代理文档 | https://code.claude.com/docs/en/sub-agents |
