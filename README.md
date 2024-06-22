# extract-types

## 项目简介

`extract-types` 是一个工具，用于从 JavaScript、JSDoc、TypeScript 和 JSON 文件中提取类型定义，并生成 `.d.ts` 文件。它简化了处理不同类型源代码中的类型信息的过程。

## 安装

```bash
npm install extract-types
```

## 使用

在终端中运行以下命令：

```bash
npx extract-types [options] <filepath>
```

### 命令选项

- `-V, --version`: 显示版本号。
- `-o, --output <filepath>`: 指定输出类型定义文件的路径。
- `-t, --type <js|ts|json>`: 指定输入文件类型（默认尝试自动检测）。
- `-h, --help`: 显示帮助信息。

### 示例

```bash
# 从 lib.js 提取类型并保存到 types.d.ts
extract-types lib.js -o types.d.ts

# 从 data.json 提取类型并保存到 types.d.ts
extract-types data.json -o types.d.ts
```

## 功能

`extract-types` 能够：

- 根据输入的 JavaScript、TypeScript 或 JSON 文件，提取其中的类型定义。
- 将类型定义导出到指定的 `.d.ts` 文件中。
- 如果未指定输出文件，结果将默认输出到控制台。

## 许可证

该项目遵循 `MIT` 许可证。

## 问题与支持

- 如遇到问题，请访问 [https://github.com/yuanliwei/extract-types/issues](https://github.com/yuanliwei/extract-types/issues) 创建新问题。
- 查看更多项目信息：[https://github.com/yuanliwei/extract-types](https://github.com/yuanliwei/extract-types#readme)

## 依赖

- `commander`: CLI 参数解析库。
- `typescript`: 用于处理 TypeScript 类型。

## 开发依赖

- `@types/node`: Node.js 的类型定义。

要了解详细信息或贡献代码，请查看 GitHub 仓库。