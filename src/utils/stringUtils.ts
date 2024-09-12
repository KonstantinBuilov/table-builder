export function transformHeaderName(headerName: string) {
    return headerName[0].toUpperCase() + headerName.substring(1).replaceAll(/[A-Z]/g, c => ' ' + c);
}