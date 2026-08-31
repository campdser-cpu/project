import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]', className)} {...props} />
));
ToastViewport.displayName = 'ToastViewport';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg',
  { variants: { variant: { default: 'border bg-background text-foreground', destructive: 'border-destructive bg-destructive text-destructive-foreground' } }, defaultVariants: { variant: 'default' } },
);

type ToastProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toastVariants> & { open?: boolean; onOpenChange?: (open: boolean) => void };
type ToastActionElement = React.ReactElement;

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ className, variant, open = true, ...props }, ref) => (
  <div ref={ref} hidden={!open} role="status" aria-live="polite" className={cn(toastVariants({ variant }), className)} {...props} />
));
Toast.displayName = 'Toast';

const ToastAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => (
  <button ref={ref} type="button" className={cn('inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium focus:outline-none focus:ring-2', className)} {...props} />
));
ToastAction.displayName = 'ToastAction';

const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => (
  <button ref={ref} type="button" aria-label="Close notification" className={cn('absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2', className)} {...props}>
    {children ?? <X className="h-4 w-4" />}
  </button>
));
ToastClose.displayName = 'ToastClose';

const ToastTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
));
ToastDescription.displayName = 'ToastDescription';

export { type ToastProps, type ToastActionElement, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };
