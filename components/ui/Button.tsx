import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-5 py-2 rounded-card text-sm font-semibold font-display transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        variant === 'primary' && 'bg-brand text-white hover:bg-brand-dark',
        variant === 'outline' && 'border border-border text-ink hover:bg-surface-muted',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
