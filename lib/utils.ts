export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('hi-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
