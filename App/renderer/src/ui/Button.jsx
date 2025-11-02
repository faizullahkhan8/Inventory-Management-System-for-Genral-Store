function Button({
    variant = "default",
    size = "default",
    className = "",
    children,
    ...props
}) {
    const baseStyles =
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none";

    // ✅ Semantic Tailwind classes (assuming color names are defined in tailwind.config.js)
    const variantStyles = {
        default: "bg-primary text-white hover:bg-primary-hover",
        secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        outline:
            "border border-border text-secondary-foreground hover:bg-secondary-hover",
        success: "bg-success text-white hover:bg-success-hover",
        warning: "bg-warning text-black hover:bg-warning-hover",
        danger: "bg-danger text-white hover:bg-danger-hover",
        ghost: "bg-transparent hover:bg-secondary-hover",
        link: "text-primary underline-offset-4 hover:underline bg-transparent",
    };

    const sizeStyles = {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 rounded-md",
        lg: "h-10 px-6 rounded-md",
        icon: "size-9 rounded-md p-0 flex items-center justify-center",
    };

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

export { Button };
