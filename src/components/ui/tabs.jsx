import React, { createContext, useContext, useState, useEffect } from 'react';

// Simple Tabs implementation that mirrors the Radix API used in FinP.
const TabsContext = createContext(null);

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children }) {
  const [internalValue, setInternalValue] = useState(() => controlledValue ?? defaultValue);
  // Keep internal state in sync when controlledValue changes.
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);
  // Handler for changing the active tab. Updates internal state for uncontrolled usage and calls onValueChange.
  const handleChange = (val) => {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onValueChange && onValueChange(val);
  };
  return (
    <TabsContext.Provider value={{ value: internalValue, onValueChange: handleChange }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = '', style, children, ...props }) {
  const { value: activeValue, onValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;
  // When clicked, set the tab value.
  const handleClick = (e) => {
    e.preventDefault();
    onValueChange && onValueChange(value);
  };
  return (
    <button
      type="button"
      className={className}
      style={style}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = '', children, ...props }) {
  const { value: activeValue } = useContext(TabsContext);
  if (activeValue !== value) return null;
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

// Provide display names for debugging.
Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';