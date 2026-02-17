import React, { createContext, useContext, useState } from 'react';

// A lightweight Dialog implementation to replace Radix UI Dialog.
// Provides open state management and renders content in a centered modal overlay.

const DialogContext = createContext(null);

export function Dialog({ children }) {
  // Manage open/close state internally.
  const [open, setOpen] = useState(false);
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

// DialogTrigger expects a single child which is an interactive element (like a button).
export function DialogTrigger({ children }) {
  const { setOpen } = useContext(DialogContext);
  // Clone the child element to inject an onClick handler.
  return React.cloneElement(children, {
    onClick: (e) => {
      if (typeof children.props.onClick === 'function') {
        children.props.onClick(e);
      }
      setOpen(true);
    },
  });
}

export function DialogContent({ children }) {
  const { open, setOpen } = useContext(DialogContext);
  if (!open) return null;
  // Close handler for the overlay; clicking outside content closes the dialog.
  const handleOverlayClick = () => {
    setOpen(false);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-zinc-950 border border-zinc-800 shadow-lg rounded-xl p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className = '', ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className = '', ...props }) {
  return (
    <h2 className={`text-lg font-medium text-white ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function DialogFooter({ children, className = '', ...props }) {
  return (
    <div className={`mt-4 flex justify-end gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

// Provide display names.
Dialog.displayName = 'Dialog';
DialogTrigger.displayName = 'DialogTrigger';
DialogContent.displayName = 'DialogContent';
DialogHeader.displayName = 'DialogHeader';
DialogTitle.displayName = 'DialogTitle';
DialogFooter.displayName = 'DialogFooter';