# 项目文档

此目录用于存放项目相关的文档，按类别分子目录存放。

## 目录结构

```
docs/
├── README.md              # 本文件
├── specs/                 # 规格文档
├── guides/                # 指南文档
├── architecture/          # 架构文档
├── decisions/             # 决策记录
├── onboarding/            # 新人入职
├── api/                   # API 文档
├── database/              # 数据库文档
├── deployment/            # 部署文档
├── testing/               # 测试文档
├── security/              # 安全文档
├── changelog/             # 变更日志
├── faq/                   # 常见问题
├── troubleshooting/       # 故障排查
├── requirements/          # 需求文档
└── research/              # 研究文档
```

## 各目录说明

| 目录 | 用途 | 目标读者 |
|------|------|----------|
| `specs/` | 设计规格、接口定义 | 开发人员 |
| `guides/` | 环境搭建、提交规范、操作指南 | 开发人员、运维 |
| `architecture/` | 架构图、模块依赖、技术选型 | 架构师、开发人员 |
| `decisions/` | 技术决策记录（ADRs） | 全体团队成员 |
| `onboarding/` | 项目背景、代码结构、流程说明 | 新成员 |
| `api/` | API 定义、请求/响应格式、认证方式 | 前后端开发人员 |
| `database/` | 数据库设计、ER图、迁移记录 | 开发人员、DBA |
| `deployment/` | 部署流程、环境配置、CI/CD | 运维、DevOps |
| `testing/` | 测试计划、测试用例、覆盖率 | QA、开发人员 |
| `security/` | 安全策略、审计报告、漏洞披露 | 安全团队、开发人员 |
| `changelog/` | 版本发布说明、变更记录 | 所有使用者 |
| `faq/` | 常见问题解答 | 新成员、使用者 |
| `troubleshooting/` | 错误排查、调试指南、应急响应 | 开发人员、运维 |
| `requirements/` | 业务需求、功能规格、用户故事 | 产品经理、开发人员 |
| `research/` | 技术调研、POC结果、竞品分析 | 架构师、技术负责人 |

## 文档分类速查

**开发相关**：`specs/`, `guides/`, `architecture/`, `api/`, `database/`, `testing/`

**运维相关**：`deployment/`, `troubleshooting/`, `security/`

**产品相关**：`requirements/`, `research/`, `decisions/`

**人员相关**：`onboarding/`（新人）, `faq/`（所有人）, `changelog/`（使用者）

## 与 .agents/docs/ 的区别

- `docs/`：项目业务/技术文档
- `.agents/docs/`：AI 治理专用文档（各 AI 工具的使用说明）
