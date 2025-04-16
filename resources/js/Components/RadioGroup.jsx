import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function RadioGroup(
  { name, options = [], value, onChange, className = '', isFocused = false, ...props },
  ref
) {
  const localRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <div className={`flex  gap-2 ${className}`} ref={localRef}>
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="text-indigo-600 focus:ring-indigo-500"
            {...props}
          />
          <span className="ml-2 capitalize text-md text-gray-700 dark:text-gray-300">
            {option.label ?? option.value}
          </span>
        </label>
      ))}
    </div>
  );
});
