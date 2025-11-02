import { CheckIcon } from "lucide-react";

function Checkbox({ className = "", checked, onChange, ...props }) {
    const baseStyles =
        "peer size-4 shrink-0 rounded-[4px] border border-input bg-input-background dark:bg-input/30 transition-shadow outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50";

    const checkedStyles =
        "checked:bg-primary checked:border-primary checked:text-primary-foreground";

    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={`${baseStyles} ${checkedStyles} ${className}`}
                {...props}
            />
        </label>
    );
}

export { Checkbox };
