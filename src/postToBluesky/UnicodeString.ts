const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class UnicodeString {
  constructor(utf16: string) {
    this.utf16 = utf16;
    this.utf8 = encoder.encode(utf16);
  }

  utf16: string;
  utf8: Uint8Array;

  // helper to convert utf16 code-unit offsets to utf8 code-unit offsets
  utf16IndexToUtf8Index(i: number) {
    return encoder.encode(this.utf16.slice(0, i)).byteLength;
  }
}
