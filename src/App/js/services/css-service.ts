let cssRules = '';

export function cssStylesAdd(css: string) {
  cssRules = cssRules + css;
}

export function cssStylesInject() {
  const sheet = document.createElement('style');
  sheet.type = 'text/css';
  sheet.innerHTML = cssRules;
  document.head.appendChild(sheet);
  cssRules = '';
}