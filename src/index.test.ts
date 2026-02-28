import { describe, expect, test } from "bun:test";
import { formatMarkdown } from "./index.ts";

describe("formatMarkdown", () => {
  test("inserts space between Japanese and bold", () => {
    const input = "これは**太字**です";
    const expected = "これは **太字** です";
    expect(formatMarkdown(input)).toBe(expected);
  });

  test("does not insert space if already exists", () => {
    const input = "これは **太字** です";
    const expected = "これは **太字** です";
    expect(formatMarkdown(input)).toBe(expected);
  });

  test("does not change code blocks", () => {
    const input = "これは**太字**です\n```\nconst x = **not bold**;\n```";
    const expected = "これは **太字** です\n```\nconst x = **not bold**;\n```";
    expect(formatMarkdown(input)).toBe(expected);
  });

  test("does not change inline code", () => {
    const input = "これは**太字**で`**not bold**`です";
    const expected = "これは **太字** で`**not bold**`です";
    expect(formatMarkdown(input)).toBe(expected);
  });

  test("handles English text correctly", () => {
    const input = "this is**bold**text";
    const expected = "this is **bold** text";
    expect(formatMarkdown(input)).toBe(expected);
  });

  test("handles list markers", () => {
    const input = "- **item 1**\n* **item 2**";
    const expected = "- **item 1**\n* **item 2**";
    expect(formatMarkdown(input)).toBe(expected);
  });

  test("handles bold at start and end of string", () => {
    const input = "**Start** and **End**";
    const expected = "**Start** and **End**";
    expect(formatMarkdown(input)).toBe(expected);
  });
});
