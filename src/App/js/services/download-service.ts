export function download(data: string, mime: string, filename: string) {
  const blob = new Blob([data], { type: mime });

  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  }

  else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}