# 项目文件结构说明

## 根目录

```
your-project/
├── CLAUDE.md                    # Claude Code 项目规则文件（建议不超过 200 行）
├── CLAUDE.local.md              # 个人自定义配置，gitignored
├── .gitignore                   # Git 忽略规则
├── .mcp.json                    # 模型上下文协议（MCP）配置
├── .claude/                     # Claude 配置目录（优先级最高）
├── rules/                       # 局部规则，按文件路径匹配加载
├── statusline                   # 命令行底部状态栏显示配置
├── settings.json                # 权限设置、模型选择及钩子注册
├── settings.local.json          # 本地个人偏好设置，gitignored
└── docs/                        # 项目文档目录
```

## .claude/ 目录

```
.claude/
├── hooks/                       # 脚本钩子，在特定时机触发
│   ├── PostToolUse.sh           # 工具使用后自动执行
│   ├── SessionStart.sh          # 启动会话时加载项目上下文
│   └── PreCompact.sh            # 上下文压缩前保存状态
│
├── commands/                    # 自定义快捷命令
│   └── ship.md                  # 示例：一键构建、检查、部署
│
├── skills/                      # 可调用的具体 skill
│   └── project-pilot/           # AI 驱动的项目全流程开发 skill
│
├── agents/                      # 子 agent，每个具有独立上下文窗口
│   ├── Architect-Agent.md       # 架构设计 Agent
│   ├── Backend-Agent.md         # 后端开发 Agent
│   ├── Frontend-Agent.md        # 前端开发 Agent
│   ├── CodeReview-Agent.md      # 代码审查 Agent
│   ├── PM-Agent.md              # 项目管理 Agent
│   ├── Product-Agent.md         # 产品设计 Agent
│   └── QA-Agent.md              # 测试质量 Agent
│
├── output-styles/               # Claude 回复风格定义
│   └── terse.md                 # 示例：简洁风格，只给代码
│
└── plugins/                     # 插件集成
    └── vercel/                  # 示例：Vercel 部署插件
```

## docs/ 目录

```
docs/
├── guides/                      # 开发指南
│   └── README.md
├── specs/                       # 需求规格
│   └── README.md
├── tech/                        # 技术文档
│   └── README.md
└── ops/                         # 运维文档
    └── README.md
```

## rules/ 目录

局部规则文件，根据处理的文件路径自动加载。

```
rules/
└── api.md                       # 处理 API 相关目录时加载
```

## 关键文件说明

| 文件 | 用途 |
|------|------|
| `CLAUDE.md` | 核心规则文件，定义语言、编码规范、项目约定 |
| `CLAUDE.local.md` | 个人偏好，不提交到 git |
| `.mcp.json` | MCP 服务器配置，必须放在根目录 |
| `settings.json` | 共享的权限和钩子配置 |
| `settings.local.json` | 个人权限设置，不提交到 git |
| `statusline` | 终端状态栏显示内容配置 |

## 配置优先级

Claude Code 查找配置的顺序（从高到低）：

1. `.claude/` 目录
2. 根目录的 `CLAUDE.md`
3. `settings.json` / `settings.local.json`
