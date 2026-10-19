// h3-js builds `new TextDecoder("utf-16le")` at import time; Hermes' TextDecoder rejects it.
// h3-js never decodes UTF-16 for our calls, so a utf-8 stand-in is enough.
// shortcut: remove once Hermes supports utf-16le or h3-js drops the call.
try {
  new TextDecoder("utf-16le");
} catch {
  const Base = TextDecoder;
  (globalThis as { TextDecoder: unknown }).TextDecoder = class extends Base {
    constructor(label?: string, options?: TextDecoderOptions) {
      super(label === "utf-16le" ? "utf-8" : label, options);
    }
  };
}