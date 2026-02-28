#!/usr/bin/env node

import { lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

/**
 * 日本語マークダウンにおいて、日本語と太字(**)の間に半角スペースを挿入する
 * ただし、コードブロック(```...```)やインラインコード(`...`)の中身は変更しない
 */
export function formatMarkdown(content: string): string {
  const codeBlocks: string[] = [];
  const placeholderPrefix = "__CODE_BLOCK_PLACEHOLDER_";

  // 1. コードブロックを保護 (```...```)
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = `${placeholderPrefix}${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  });

  // 2. インラインコードを保護 (`...`)
  content = content.replace(/`[^`]+?`/g, (match) => {
    const placeholder = `${placeholderPrefix}${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  });

  // 3. ボールドブロック (**...**) を特定し、その「外側」にのみスペースを挿入
  content = content.replace(/(\*\*([^\*]+?)\*\*)/g, (match, fullMatch, innerText, offset, string) => {
    let result = fullMatch;
    const charBefore = string[offset - 1];
    const charAfter = string[offset + fullMatch.length];

    // 前が「空白・改行・文字列の先頭」以外ならスペースを挿入
    if (charBefore && !/[\s\n]/.test(charBefore)) {
      result = " " + result;
    }
    
    // 後ろが「空白・改行・文字列の末尾」以外ならスペースを挿入
    if (charAfter && !/[\s\n]/.test(charAfter)) {
      result = result + " ";
    }
    
    return result;
  });

  // リストマーカーの修正 (- **)
  content = content.replace(/^([-*])\s+(\*\*)/gm, "$1 $2");
  content = content.replace(/^([-*])(\*\*)/gm, "$1 $2");

  // 4. 保護していたコードブロックを復元
  codeBlocks.forEach((code, index) => {
    const placeholder = `${placeholderPrefix}${index}__`;
    content = content.replace(placeholder, () => code);
  });

  return content;
}

function processPath(targetPath: string) {
  const stats = lstatSync(targetPath);

  if (stats.isDirectory()) {
    const files = readdirSync(targetPath).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      processPath(join(targetPath, file));
    }
  } else if (stats.isFile() && targetPath.endsWith(".md")) {
    const original = readFileSync(targetPath, "utf-8");
    const formatted = formatMarkdown(original);

    if (original !== formatted) {
      writeFileSync(targetPath, formatted);
      console.log(`✅ Formatted: ${targetPath}`);
    }
  }
}

function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      help: { type: "boolean", short: "h" },
      version: { type: "boolean", short: "v" },
    },
    allowPositionals: true,
  });

  if (values.help || (positionals.length === 0 && !values.version)) {
    console.log("Usage: npx md-bold-spacer [path...]");
    console.log("");
    console.log("Options:");
    console.log("  -h, --help     Show this help message");
    console.log("  -v, --version  Show version");
    return;
  }

  if (values.version) {
    // 実行ファイルの場所からの相対パスでpackage.jsonを読む（配布時用）
    // または、環境変数やビルド時に埋め込む
    console.log("1.0.0"); 
    return;
  }

  for (const path of positionals) {
    try {
      processPath(path);
    } catch (e) {
      console.error(`Error processing ${path}: ${(e as Error).message}`);
    }
  }
}

// Bun環境でもNode環境でも実行できるように判定
const isMain = process.argv[1]?.includes("index.ts") || process.argv[1]?.includes("md-bold-spacer");

if (isMain) {
  main();
}
