import React, { createContext, useContext, useEffect, useState } from 'react';

// The Select component here is a simplified replacement for Radix UI's Select.
// It exposes a similar API so that existing usage in the FinP app continues to work.

// Context to pass down state and handlers between Select subcomponents.
const SelectContext = createContext(null);

// Recursively flatten children to extract SelectItem props.
function flattenItems(children, items = []) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === SelectItem) {
      items.push({ value: child.props.value, label: child.props.children });
    } else if (child.props && child.props.children) {
      flattenItems(child.props.children, items);
    }
  });
  return items;
}

export function Select({ value, onValueChange, disabled, children }) {
  // Maintain trigger class name from SelectTrigger
  const [triggerClassName, setTriggerClassName] = useState('');
  return (
    <SelectContext.Provider value={{ value, onValueChange, disabled, triggerClassName, setTriggerClassName }}>
      {children}
    </SelectContext.Provider>
  );
}

// The SelectTrigger component is used to pass styling classes down to the select element.
export function SelectTrigger({ className = '', children, ...props }) {
  const { setTriggerClassName } = useContext(SelectContext);
  // Store trigger className in context so SelectContent can use it.
  useEffect(() => {
    setTriggerClassName(className);
  }, [className, setTriggerClassName]);
  // Does not render any DOM element.
  return null;
}

// SelectValue is a placeholder for Radix API compatibility. It doesn't render anything; the native select will display the selected option.
export function SelectValue({ placeholder }) {
  return null;
}

export function SelectContent({ className = '', children }) {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('SelectContent must be used within a Select');
  const { value, onValueChange, disabled, triggerClassName } = ctx;
  const options = flattenItems(children);
  // Use the triggerClassName passed via SelectTrigger if provided, otherwise fallback to className.
  const selectClassName = triggerClassName || className || '';
  return (
    <select
      value={value}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
      disabled={disabled}
      className={selectClassName}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className={''}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function SelectItem({ value, children }) {
  // Does not render anything on its own; it's consumed by flattenItems.
  return null;
}

// Provide names for debugging and component identification.
Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectContent.displayName = 'SelectContent';
SelectItem.displayName = 'SelectItem';