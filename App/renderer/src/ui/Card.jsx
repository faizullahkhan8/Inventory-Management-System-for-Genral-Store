function Card({ className = "", ...props }) {
    const classes =
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-300 " +
        className;

    return <div data-slot="card" className={classes} {...props} />;
}

function CardHeader({ className = "", ...props }) {
    const classes =
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 " +
        className;

    return <div data-slot="card-header" className={classes} {...props} />;
}

function CardTitle({ className = "", ...props }) {
    const classes = "leading-none " + className;
    return <h4 data-slot="card-title" className={classes} {...props} />;
}

function CardDescription({ className = "", ...props }) {
    const classes = "text-muted-foreground " + className;
    return <p data-slot="card-description" className={classes} {...props} />;
}

function CardAction({ className = "", ...props }) {
    const classes =
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end " +
        className;

    return <div data-slot="card-action" className={classes} {...props} />;
}

function CardContent({ className = "", ...props }) {
    const classes = "px-6 [&:last-child]:pb-6 " + className;
    return <div data-slot="card-content" className={classes} {...props} />;
}

function CardFooter({ className = "", ...props }) {
    const classes = "flex items-center px-6 pb-6 [.border-t]:pt-6 " + className;
    return <div data-slot="card-footer" className={classes} {...props} />;
}

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
};
