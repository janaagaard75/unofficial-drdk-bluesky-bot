const encoder = new TextEncoder();

export class UnicodeString {
  public constructor(utf16: string) {
    this.utf16 = utf16;
    this.utf8 = encoder.encode(utf16);
  }

  private utf16: string;
  private utf8: Uint8Array;

  // Helper to convert utf16 code-unit offsets to utf8 code-unit offsets.
  public utf16IndexToUtf8Index(i: number) {
    return encoder.encode(this.utf16.slice(0, i)).byteLength;
  }
}
