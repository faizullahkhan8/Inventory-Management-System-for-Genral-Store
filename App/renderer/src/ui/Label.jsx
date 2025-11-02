function Label({ className = "", ...props }) {
    const baseStyles =
        "flex items-center gap-2 text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50";

    const classes = `${baseStyles} ${className}`;

    return <label data-slot="label" className={classes} {...props} />;
}

export { Label };
