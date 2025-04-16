export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block dark:text-white md:text-lg text-sm font-medium text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
