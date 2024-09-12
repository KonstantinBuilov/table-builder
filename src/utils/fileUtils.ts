export function saveFile(fileName: string, content: Blob) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
}