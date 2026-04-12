# Claude Code 高阶使用指南

> **目标：一次性交代清楚需求，让 Claude Code 自主完成编码、测试、交付——拿来就能用。**
>
> 基于 2026 年 4 月最新版本（v2.1.76+），整合官方文档与社区最佳实践。

---

## 一、核心认知：把 Claude Code 当「自主工程师」而非「聊天机器人」

Claude Code 不是问答工具。它能读文件、跑命令、改代码、自我验证，整个过程你可以只看不管。但它有一个关键约束：**上下文窗口会填满，填满后质量下降**。所有高阶技巧的本质都是围绕「高效利用上下文」展开的。

核心原则：
- **前期投入越多，后期操心越少**——把需求、约束、验证标准在一开始讲清楚
- **上下文是最稀缺的资源**——无关内容越少，Claude 越聪明
- **给它验证手段**——让它能自己跑测试、截图对比，而不是依赖你来判断对错

---

## 二、项目启动：一次配置，所有会话受益

### 2.1 CLAUDE.md —— 项目级「永久记忆」

`CLAUDE.md` 是 Claude Code 每次会话开始时自动加载的文件，相当于你对它下达的持久化指令。

**运行 `/init` 自动生成初始版本**，然后手动精炼。

```markdown
# CLAUDE.md 示例

## 构建命令
- 安装依赖: `pnpm install`
- 开发服务器: `pnpm dev`
- 构建: `pnpm build`
- 单元测试: `pnpm test`
- 类型检查: `pnpm typecheck`
- Lint: `pnpm lint --fix`

## 代码风格
- 使用 ES Modules (import/export)，不用 CommonJS
- 组件文件用 PascalCase，工具函数用 camelCase
- 所有异步操作必须有错误处理
- 禁止 any 类型，必须显式声明类型

## 架构规则
- API 路由放在 src/api/，按资源分目录
- 数据库操作全部通过 Repository 层，禁止在 Controller 里直接写 SQL
- 环境变量通过 src/config/env.ts 统一管理
- 新功能必须写测试，覆盖率不低于 80%

## Git 规范
- 分支命名: feat/xxx, fix/xxx, refactor/xxx
- Commit 信息用 Conventional Commits 格式
- 提交前必须通过 typecheck 和 lint

## 重要注意
- IMPORTANT: 修改数据库 Schema 时，必须同时创建 migration 文件
- IMPORTANT: 绝对不要在代码中硬编码密钥或密码
```

**层级加载机制**（全部自动生效）：

| 位置 | 作用域 | 是否提交到 Git |
|------|--------|---------------|
| `~/.claude/CLAUDE.md` | 所有项目通用 | 否 |
| `./CLAUDE.md` | 当前项目，团队共享 | 是 |
| `./CLAUDE.local.md` | 当前项目，个人 | 否（加入 .gitignore） |
| `./子目录/CLAUDE.md` | 按需加载 | 是 |

**黄金法则**：每行都问自己「没有这行 Claude 会犯错吗？」如果不会，删掉。**控制在 150-200 行以内**，超过后指令遵从度明显下降。

**引用外部文档**：用 `@` 语法避免 CLAUDE.md 膨胀：

```markdown
详细 API 规范见 @docs/api-spec.md
Git 工作流见 @docs/git-workflow.md
```

### 2.2 权限配置：让 Claude 自主工作不被打断

默认情况下每个文件修改、每条命令都要你点确认。这在自主模式下是灾难。

**三种方案，按安全等级递减：**

1. **沙箱模式（推荐新手）**：`/sandbox` 启用 OS 级隔离，限制文件系统和网络访问，在隔离区内无需逐一确认
2. **权限白名单**：`/permissions` 允许特定安全命令
   ```
   Bash(pnpm run *)
   Bash(git *)
   Bash(gh *)
   Edit(src/**)
   Edit(tests/**)
   ```
3. **Auto 模式（推荐熟手）**：`Shift+Tab` 切换，分类器模型自动审查命令，仅拦截高风险操作

### 2.3 Hooks —— 100% 必执行的自动化规则

与 CLAUDE.md 的「建议性」不同，Hooks 是**确定性执行**的。

让 Claude 帮你写 Hook：

```
写一个 hook，每次编辑文件后自动运行 eslint
写一个 hook，禁止修改 migrations 目录下的已有文件
写一个 hook，Claude 完成任务后发系统通知提醒我
```

配置存储在 `.claude/settings.json`，用 `/hooks` 查看当前配置。

**实用 Hook 场景**：
- 每次文件编辑后自动执行 lint + typecheck
- 阻止对特定敏感目录的写入
- 任务完成后发送桌面通知（macOS 用 `osascript`，Linux 用 `notify-send`）
- 自动格式化代码

### 2.4 Skills —— 按需加载的领域知识

Skills 是放在 `.claude/skills/` 下的 `SKILL.md` 文件，Claude 在相关时自动加载，不污染每次会话。

```markdown
# .claude/skills/deploy/SKILL.md
---
name: deploy
description: 部署流程和注意事项
---
# 部署流程
1. 确保所有测试通过
2. 构建生产包: `pnpm build`
3. 运行 `docker build -t app:latest .`
4. 推送到 registry: `docker push registry.example.com/app:latest`
5. 通过 kubectl 滚动更新
6. 验证健康检查端点
```

**可调用的工作流 Skill**（用 `disable-model-invocation: true` 防止自动触发）：

```markdown
# .claude/skills/fix-issue/SKILL.md
---
name: fix-issue
description: 从 GitHub Issue 到 PR 的全自动修复
disable-model-invocation: true
---
修复 GitHub Issue: $ARGUMENTS

1. 用 `gh issue view` 获取 Issue 详情
2. 分析问题根因
3. 搜索代码库找到相关文件
4. 实现修复
5. 编写并运行测试验证修复
6. 确保通过 lint 和 typecheck
7. 创建描述性 commit
8. 推送并创建 PR
```

使用：`/fix-issue 1234`

### 2.5 自定义子代理（Subagents）

在 `.claude/agents/` 下定义专门化的助手：

```markdown
# .claude/agents/security-reviewer.md
---
name: security-reviewer
description: 安全代码审查
tools: Read, Grep, Glob, Bash
model: opus
---
你是高级安全工程师。审查以下方面：
- 注入漏洞（SQL、XSS、命令注入）
- 认证和授权缺陷
- 代码中的硬编码密钥
- 不安全的数据处理
提供具体行号和修复建议。
```

使用时告诉 Claude：「用 security-reviewer 子代理审查这段代码」。

子代理在**独立上下文**中运行，不会污染你的主会话——这是管理上下文的利器。

### 2.6 MCP 服务器 —— 连接外部工具

```bash
claude mcp add notion    # 连接 Notion
claude mcp add figma     # 连接 Figma
claude mcp add postgres  # 连接数据库
```

让 Claude 直接从 Issue 跟踪器读需求、从 Figma 获取设计稿、查数据库验证数据。

### 2.7 CLI 工具集成

确保安装这些工具，Claude 会自动使用：
- `gh`：GitHub CLI（创建 Issue、PR、读评论）
- `aws` / `gcloud`：云平台 CLI
- `docker`：容器操作

Claude 也能学习你的自定义 CLI：「用 `foo-cli --help` 学习 foo 工具的用法，然后用它完成 X」

---

## 三、完美交付的工作流：从需求到可用代码

### 3.1 「访谈式」需求分析（大型功能必用）

**不要一次把你觉得够用的需求甩过去。让 Claude 来挖掘你没想到的。**

```
我要构建一个多租户 SaaS 订阅管理系统。
用 AskUserQuestion 工具深度访谈我。

问技术实现、UI/UX、边界情况、性能、安全、可扩展性方面的问题。
不要问显而易见的问题，深挖我可能忽略的难点。

持续访谈直到覆盖所有方面，然后将完整规格写入 SPEC.md。
```

Claude 会系统性地问你：
- 租户隔离策略？数据库层还是应用层？
- 计费周期如何处理跨时区？
- 降级时已使用的配额如何处理？
- 试用期结束的自动处理逻辑？
- ……

**访谈完成后，开一个全新会话来执行 SPEC.md**。新会话有干净的上下文，全部聚焦在实现上。

### 3.2 四阶段工作流

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  探索    │ →  │  规划    │ →  │  实现    │ →  │  交付    │
│ Plan Mode│    │ Plan Mode│    │ Normal   │    │ Normal   │
│ 读代码   │    │ 写计划   │    │ 写代码   │    │ 测试+PR  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

**阶段 1：探索（Plan Mode）**

```
进入 Plan Mode。阅读 src/auth 目录，理解当前的会话管理和登录机制。
同时看看环境变量是如何管理密钥的。
```

**阶段 2：规划（Plan Mode）**

```
我要添加 Google OAuth 登录。
哪些文件需要修改？会话流程是什么？
创建详细的实现计划。
```

按 `Ctrl+G` 可以在编辑器中直接修改计划。

**阶段 3：实现（Normal Mode）**

```
按照你的计划实现 OAuth 流程。
为回调处理器编写测试，运行测试套件并修复所有失败。
```

**阶段 4：交付（Normal Mode）**

```
提交代码，写描述性的 commit 信息，创建 PR。
```

### 3.3 高质量 Prompt 写法

| 原则 | 差的写法 | 好的写法 |
|------|---------|---------|
| 明确范围 | 「给 foo.py 加测试」 | 「给 foo.py 写测试，覆盖用户未登录时的边界情况。不要用 mock。」 |
| 指向模式 | 「加一个日历组件」 | 「看首页现有 widget 的实现模式，HotDogWidget.php 是好例子。按相同模式实现日历组件。」 |
| 描述症状 | 「修复登录 bug」 | 「用户报告会话超时后登录失败。检查 src/auth/ 的 token 刷新逻辑。先写一个复现问题的失败测试，再修复它。」 |
| 给验证标准 | 「实现邮箱验证函数」 | 「写 validateEmail 函数。测试用例：user@example.com → true, invalid → false, user@.com → false。实现后运行测试。」 |

### 3.4 给 Claude 自我验证的能力（最高杠杆动作）

**这是让交付质量从「差不多」跃升到「拿来就用」的关键。**

```
实现用户注册功能。完成后：

1. 运行全部单元测试，确保通过
2. 运行 `pnpm typecheck`，确保无类型错误
3. 运行 `pnpm lint`，确保无 lint 警告
4. 用 curl 测试 API 端点的正常和异常场景
5. 如果有任何失败，修复后重新验证
6. 最后列出你创建/修改了哪些文件
```

**UI 验证**（配合 Chrome 扩展）：

```
[粘贴设计稿截图]
按照这个设计实现页面。完成后截屏对比原图，列出差异并修复。
```

---

## 四、大型项目的自主化策略

### 4.1 超级计划（Ultraplan）

对于架构级任务，使用 `/ultraplan`：

```
/ultraplan 将整个项目从 REST API 迁移到 GraphQL
```

Ultraplan 把复杂规划任务卸载到云端，使用 Opus 4.6 进行长达 30 分钟的深度规划，你的终端不被占用。规划完成后你在浏览器审查计划，确认后再执行。

适用于：大规模重构、跨服务迁移、架构决策。

### 4.2 并行会话 + Git Worktree（一人多线程开发）

```bash
# 创建隔离工作树并启动 Claude
claude --worktree feature-auth
claude --worktree feature-payment
claude --worktree bugfix-dashboard

# 每个会话完全隔离，互不干扰
```

每个 worktree 有自己的目录和分支，多个 Claude 同时工作不会互相覆盖文件。

**实践模式**：
- **竞赛模式**：3 个 worktree 实现同一功能，比较结果选最优
- **Writer/Reviewer 模式**：A 会话写代码，B 会话审查（没有「自己审查自己」的偏见）
- **TDD 模式**：一个会话写测试，另一个写代码让测试通过

### 4.3 Agent Teams（实验性功能）

多个 Claude 实例作为团队协作：

```bash
# 启用 Agent Teams
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

```
创建一个 Agent Team 来重构支付模块。
分配三个队友：
- 一个负责 API 层
- 一个负责数据库迁移
- 一个负责测试覆盖
让他们通过共享任务列表协调。
```

Claude 会创建一个 Team Lead，分配三个独立的 Teammate，通过共享任务列表和消息系统协调工作。

### 4.4 无人值守模式（Headless）

用 `claude -p` 在无交互环境下运行：

```bash
# CI/CD 中自动修复 lint 错误
claude -p "修复所有 ESLint 错误并提交" --auto-approve

# 定时任务
claude -p "分析最近的错误日志，生成报告到 reports/daily.md"

# 结构化输出
claude -p "列出所有 API 端点" --output-format json
```

**配合 cron 实现定时自动化**：

```bash
# 每天凌晨 2 点自动运行安全检查
0 2 * * * cd /project && claude -p "运行安全审查，将报告写入 reports/security-$(date +%F).md"
```

### 4.5 `/batch` 批量操作

```
/batch 将 src/ 下所有组件从 Class 组件迁移到函数组件
```

自动分解为 5-30 个独立单元，每个单元分配一个后台代理在独立 worktree 中工作，各自实现、测试、提交 PR。

### 4.6 远程控制（Remote Control）

在手机上通过 Claude App 发指令，Claude Code 在你的电脑上自动执行：

```bash
# 终端启动远程控制
/remote-control --name "my-project"
```

然后在手机端 claude.ai/code 连接该会话，发送指令即可。代码和文件不离开你的电脑，仅聊天消息通过加密通道传输。

---

## 五、上下文管理：高手与新手的分水岭

### 5.1 主动管理上下文

```
/clear          # 任务之间清空上下文（最重要的习惯）
/compact        # 手动压缩，保留关键信息
/compact 聚焦在 API 变更上   # 定向压缩
```

**规则**：
- 不相关的任务之间**必须** `/clear`
- 同一问题纠正超过 2 次？`/clear` + 更好的 Prompt 重新开始
- 长会话中让 Claude 把计划写到文件（如 `plan.md`），而不是只存在聊天记录中

### 5.2 用子代理做调研

调研会读大量文件，消耗大量上下文。委托给子代理：

```
用子代理调查我们的认证系统如何处理 token 刷新，
以及是否有可复用的 OAuth 工具。
```

子代理在独立上下文中探索，只把结论报回主会话。

### 5.3 `/btw` 侧问

临时问一个不需要保留在上下文中的问题：

```
/btw TypeScript 的 Partial<T> 和 Pick<T, K> 有什么区别？
```

答案弹出在浮层中，不进入会话历史，不消耗上下文。

### 5.4 Checkpoint 回退

Claude 的每次操作都会创建检查点。双击 `Esc` 或 `/rewind` 打开回退菜单：
- 只恢复对话
- 只恢复代码
- 两者都恢复
- 从某个点开始总结压缩

**大胆尝试**：让 Claude 做一个有风险的方案，不行就 rewind，换个方案。检查点跨会话持久化。

### 5.5 会话持久化

```bash
claude --continue     # 继续最近的会话
claude --resume       # 选择历史会话
/rename oauth-migration   # 给会话命名便于查找
```

---

## 六、万能 Prompt 模板

### 6.1 全新项目启动

```
我要从零构建一个 [项目描述]。

技术栈：[具体技术栈]
目标用户：[用户画像]
核心功能：
1. [功能1]
2. [功能2]
3. [功能3]

非功能需求：
- 性能：[具体指标]
- 安全：[具体要求]
- 部署：[部署方式]

请按以下步骤执行：
1. 初始化项目结构和配置
2. 实现核心功能，每个功能完成后运行测试
3. 完成后运行完整测试套件 + typecheck + lint
4. 确保所有检查通过后，提交代码
5. 列出最终的项目结构和关键文件说明

每完成一个大模块先验证再继续下一个。如果任何测试失败，先修复再往前推进。
```

### 6.2 现有项目添加功能

```
阅读 SPEC.md 了解需求规格。
阅读 src/ 目录结构理解现有架构。
查看 [相关文件] 了解已有模式。

按照 SPEC.md 实现所有功能。遵循项目现有的代码风格和架构模式。

完成后：
1. 为所有新功能编写测试
2. 运行 `pnpm test` 确保全部通过
3. 运行 `pnpm typecheck && pnpm lint`
4. 用 git diff 检查自己的改动是否合理
5. 创建 commit 和 PR
```

### 6.3 Debug 模板

```
用户报告了以下问题：[粘贴错误描述或截图]

1. 在代码库中找到相关代码
2. 分析根本原因（不是表面症状）
3. 编写一个能复现问题的失败测试
4. 修复问题
5. 确认测试通过
6. 检查是否有其他地方存在类似问题
7. 提交修复
```

---

## 七、进阶技巧速查

| 技巧 | 命令/操作 | 用途 |
|------|----------|------|
| Plan Mode | `Shift+Tab` 切换 | 只读探索，不改代码 |
| 引用文件 | `@src/auth/login.ts` | 让 Claude 读取特定文件 |
| 管道输入 | `cat error.log \| claude` | 直接发送文件内容 |
| 图片输入 | 直接粘贴/拖拽图片 | 设计稿、截图、错误截图 |
| 停止操作 | `Esc` | 中断 Claude 但保留上下文 |
| 撤销 | `Esc + Esc` 或 `/rewind` | 回退到检查点 |
| 插件市场 | `/plugin` | 安装社区插件 |
| 语音模式 | `/voice` | 按住空格说话（支持 20 种语言） |
| 低开销提问 | `/btw` | 不消耗上下文的侧问 |
| 命名会话 | `/rename` | 给会话起名便于 resume |
| 努力级别 | 自动显示 | Claude 会标示当前 effort level |

---

## 八、常见失败模式与避免方法

| 失败模式 | 原因 | 解决方案 |
|---------|------|---------|
| Claude 越改越乱 | 上下文被失败尝试污染 | `/clear` + 更好的 Prompt 重新开始 |
| 忽略 CLAUDE.md 中的规则 | 文件太长（>200行） | 精简，重要规则加 IMPORTANT 前缀 |
| 大范围重写导致回归 | 单次改动过大 | 拆成小任务，每步测试验证 |
| 生成的代码风格不一致 | 没有指向现有模式 | 在 Prompt 中引用具体的示例文件 |
| 一直问你确认 | 权限未配置 | 配置 Auto Mode 或 Permissions |
| 长会话后期质量下降 | 上下文接近上限 | 主动 `/compact` 或 `/clear` 开新会话 |

---

## 九、推荐的日常工作流

```
早晨开始
  │
  ├─ 阅读 Issue/需求
  │
  ├─ 对复杂需求：让 Claude 访谈 → 生成 SPEC.md
  │
  ├─ 为每个任务开独立 worktree：
  │    claude --worktree task-a
  │    claude --worktree task-b
  │
  ├─ 每个会话：给完整 Prompt + 验证标准
  │    → Claude 自主实现 + 测试 + 提交
  │
  ├─ 配置通知 Hook → 完成时桌面提醒
  │
  ├─ 收到通知 → 审查 PR → 合并
  │
  └─ 下一个任务：/clear → 新的 Prompt
```

---

## 十、一句话总结

> **CLAUDE.md 管常识，Skills 管领域，Hooks 管纪律，Subagents 管调研，Worktrees 管并行，Auto Mode 管自主。把这六件事配好，你只需要写好需求，剩下的交给 Claude。**

---

*参考来源：[Claude Code 官方文档](https://code.claude.com/docs/en/best-practices) · 版本 v2.1.76+ · 2026 年 4 月*
