# md-bold-spacer 🚀

**Stop the "Bold Not Rendering" bug in CJK Markdown without heavy tools like textlint.**

[日本語のREADMEは下記をご覧ください](#日本語)

---

## What is this?

In many Markdown renderers (GitHub, VSCode Preview, Zenn, etc.), bold text (`**BOLD**`) fails to render if it's placed immediately next to CJK (Chinese, Japanese, Korean) characters without a space.

`md-bold-spacer` is a lightning-fast, zero-dependency CLI tool that automatically fixes this by inserting half-width spaces between CJK characters and bold markers.

### Before
これは**太字**です。 (Might not render as bold)

### After
これは **太字** です。 (Always renders correctly)

## Why use this?

- **Zero Dependency**: Extremely lightweight.
- **Safe**: Automatically protects Code Blocks (```) and Inline Code (`).
- **Universal**: Works on any Markdown files, not just for Zenn.
- **Fast**: Built for speed and simplicity. Use it in your CI/CD or git hooks.

## Installation / Usage

No installation required. Just run it with `npx`.

```bash
# Fix a single file
npx md-bold-spacer path/to/your/file.md

# Fix all .md files in a directory
npx md-bold-spacer ./articles
```

---

<a name="日本語"></a>

## 日本語版

`md-bold-spacer` は、日本語などのCJK文字と太字（`**`）が隣接している場合に、一部のMarkdownレンダー（GitHub, VSCode, Zenn等）で太字が正しく表示されない問題を解決するためのCLIツールです。

### 特徴
- **インストール不要**: `npx` で即座に実行可能。
- **安全**: コードブロックやインラインコードの中身は変更しません。
- **軽量**: 依存関係ゼロで動作します。

### 使い方
```bash
npx md-bold-spacer <ファイルまたはディレクトリのパス>
```

---

## License
MIT

## Author
[kazuki-ookura](https://github.com/kazuki-ookura)
