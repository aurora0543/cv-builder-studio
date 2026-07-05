# CV Builder Studio (简历智能编辑与排版渲染系统)

这是一个支持 **Markdown <-> JSON 双向转换** 并且能够生成 **XeLaTeX 源码** 的简历可视化编辑器。
系统底层遵循统一的标准 Schema 验证规范，并融入了 AI 提示词复制助手与实时页面主题配置，旨在提供一站式、高定制性的简历输出方案。

---

## 🎨 核心功能

1. **可视化 Web 编辑器**:
   - 界面采用极简而优雅的磨砂玻璃暗黑设计，响应式栅格布局。
   - 所有简历版块（个人信息、求职意向、教育背景、技术栈、科研成果、项目背景、所获荣誉、自我评价）以结构化表单呈现。
   - 支持动态的添加、删除、重新排序列表项目（如多段项目经历或多级学历）。
   - **智能合并**: 多项获奖经历在同一个学年内时，渲染引擎会自动将其折叠合并到同一行中，避免重复展示时间区间，匹配规范排版。

2. **交互式页面主题定制 (Theme Switcher)**:
   - **多种视觉风格**: 支持一键切换经典白 (Classic)、温暖杏 (Warm)、学术蓝 (Academic) 与极客黑 (Midnight) 等背景与文字风格。
   - **字号微调**: 快速切换小号 (12px)、标准 (13px) 与大号 (14px) 保证排版一页纸容纳度。
   - **标题装饰**: 支持下划线 (Underline)、左侧竖线 (Border Left) 与无装饰极简 (Minimalist) 等多种栏目视觉样式。
   - **页边距自适应**: 提供紧凑、默认、宽松等页边距选项，并自动适配 LaTeX 几何宏包。

3. **零依赖 JSON Schema 验证与诊断**:
   - 网页端内置 **诊断日志控制台**，实时监测当前表单或导入 JSON 数据是否符合标准化 schema 约束。
   - Python 转换引擎在执行转换时，也会自动执行轻量级 Schema 诊断，输出字段类型及必填提示，防呆防漏。

4. **双向转换与 LaTeX 导出**:
   - 网页端支持实时查看及复制 Markdown 源码、JSON 结构体和 LaTeX 源码。
   - 导出为标准 `.tex` 文件后，直接配合 XeLaTeX 编译器可渲染出 Times New Roman 与 Adobe 宋体相结合的高清 A4 纸质 PDF。
   - 完美适配 fancyhdr 页码机制，页脚自动呈现“第 1 页”、“第 2 页”，多页排版互不重叠。

5. **AI 智能润色助手 (Prompt Copy Assist)**:
   - 移除了繁琐的 API Key 限制，改为“AI 复制助手”弹框。
   - 点击一键生成针对该块经历的 **专属 Prompt 提示词**（包含 STAR 原则限制、技术栈融入规则及三要素结构约束）。
   - 在任意外部大模型（ChatGPT/Claude/Gemini）中润色后，粘回窗口即可完成回填。

---

## 📂 目录结构说明

```
CV Builder Skill/
├── samples/               # 简历样本存储目录
│   ├── resume_sample.json # Voldemort 趣味简历 JSON 数据样本 (符合 schema 规范)
│   └── resume_sample.md   # 从 JSON 自动生成的 Markdown 预览样本
├── scripts/               # 辅助脚本
│   └── cv_parser.py       # 核心 Python 解析与双向转换/验证脚本
├── web/                   # Vite React 前端应用
│   ├── src/
│   │   ├── App.jsx        # 核心前端编辑器逻辑 (含实时验证、LaTeX/Markdown生成器)
│   │   ├── App.css        # 自定义特效样式
│   │   └── index.css      # 全局排版、网格系统及主题变量
│   └── package.json       # React App 依赖项配置
├── latex/                 # 本地 LaTeX 渲染模板依赖
│   ├── resume.cls         # LaTeX 简历文档模板类
│   ├── fonts/             # 预置中文字体 (包含 Adobe 宋体等)
│   └── *.sty              # Noto 字体及线条排版宏包依赖
├── schema.json            # 统一约定的标准化 JSON Schema 验证文件
└── package.json           # 项目总包配置文件 (支持 root 命令一键启动)
```

---

## 🚀 启动与构建方式

在项目根目录下，使用 node 终端运行以下命令：

### 1. 安装项目依赖
```bash
npm install
```

### 2. 启动本地开发热更新服务器
```bash
npm run dev
```
启动后在浏览器打开控制台输出的地址（默认为 `http://localhost:5173/`）即可编辑。

### 3. 构建发布生产版本
```bash
npm run build
```
打包好的静态资源文件将存放在 `web/dist/` 中。

---

## 🐍 辅助命令行转换脚本 (Python CLI)

您可以在终端中通过 Python 3 调用 [cv_parser.py](file:///Users/boqian/Downloads/招聘回忆/01_个人简历/CV Builder Skill/scripts/cv_parser.py) 进行批量数据转换。脚本在运行时会自动读取根目录的 [schema.json](file:///Users/boqian/Downloads/招聘回忆/01_个人简历/CV Builder Skill/schema.json) 并进行实时格式诊断：

### 1. Markdown 解析并验证生成 JSON
```bash
python3 scripts/cv_parser.py parse -i samples/resume_sample.md -o samples/resume_sample.json
```

### 2. JSON 验证并生成 Markdown
```bash
python3 scripts/cv_parser.py generate -i samples/resume_sample.json -o samples/resume_sample.md
```

### 3. JSON 验证并生成 LaTeX 源码
```bash
python3 scripts/cv_parser.py latex -i samples/resume_sample.json -o samples/resume_sample.tex
```

---

## 🖨️ LaTeX 编译为 PDF

1. 安装基础排版环境（推荐使用 MacTeX / TeX Live，需要包含 XeLaTeX 编译器）。
2. 将导出的 `.tex` 简历源码复制到 `latex/` 目录下（该目录包含 `resume.cls` 依赖）。
3. 运行 XeLaTeX 命令编译：
   ```bash
   xelatex resume_sample.tex
   ```
4. 编译完成后，会在同级目录下生成同名的 `.pdf` 文件。中文字体将渲染为标准宋体，英文字体渲染为 Times New Roman，底部正中带有页码，间距自然紧凑。
