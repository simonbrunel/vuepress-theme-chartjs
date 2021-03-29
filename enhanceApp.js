// Note that prismjs comes as a 'vuepress' dependency.
// https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/markdown/package.json#L31

if (typeof window !== 'undefined') {
  // BUG(brunel): Importing prismjs from the EditorTextarea component causes issues when
  // mixing chart editors with regular code blocks. It's due to the attempt to highlight
  // all code blocks after the document has loaded. Setting manual=true fixes the issue.
  // https://prismjs.com/docs/Prism.html#.manual
  window.Prism = window.Prism || {};
  window.Prism.manual = true;

  // This is required by vue-prism-editor/dist/prismeditor.esm.js
  if (window.global === undefined) {
    window.global = window;
  }
}
