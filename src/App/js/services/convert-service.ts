export function dateToISO(v: string | null): string {
  if (!v) return 'null';
  const date = new Date(v).toISOString();
  return date;
}

export function dateToLocaleString(v: string | null): string {
  if (!v) return 'null';
  const date = new Date(v).toLocaleString();
  return date;
}

export function camelIdentifierToTitle(v: string): string {
  const split = v.split(/(?=[A-Z])/);
  const join = split.join(' ');
  const title = join.charAt(0).toUpperCase() + join.slice(1);
  return title;
}