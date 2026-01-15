import * as React from 'react';
import { cn } from '@/lib/utils';

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-primary text-white',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
    outline: 'border border-gray-300 text-gray-700',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge };
