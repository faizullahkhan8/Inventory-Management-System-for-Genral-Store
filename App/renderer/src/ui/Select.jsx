import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function Select({
    placeholder = "Select...",
    options = [],
    onChange,
    defaultValue,
    className = "",
}) {
    return (
        <SelectPrimitive.Root
            onValueChange={onChange}
            defaultValue={defaultValue}
        >
            <SelectPrimitive.Trigger
                className={`flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 px-3 py-2 h-9 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            >
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon>
                    <ChevronDownIcon className="h-4 w-4 opacity-60" />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                    position="popper"
                    className="rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-hidden z-50"
                >
                    <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
                        <ChevronUpIcon className="h-4 w-4" />
                    </SelectPrimitive.ScrollUpButton>

                    <SelectPrimitive.Viewport className="p-1">
                        {options.map((item, index) => (
                            <SelectPrimitive.Item
                                key={index}
                                value={item.value}
                                className="relative flex items-center rounded-md py-2 pl-8 pr-2 text-sm cursor-pointer select-none hover:bg-primary focus:bg-primary focus:text-white outline-none data-[state=checked]:bg-blue-500 my-1 transition-colors duration-200"
                            >
                                <SelectPrimitive.ItemIndicator className="absolute left-2">
                                    <CheckIcon className="h-4 w-4" />
                                </SelectPrimitive.ItemIndicator>

                                <SelectPrimitive.ItemText>
                                    {item.label}
                                </SelectPrimitive.ItemText>
                            </SelectPrimitive.Item>
                        ))}
                    </SelectPrimitive.Viewport>

                    <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
                        <ChevronDownIcon className="h-4 w-4" />
                    </SelectPrimitive.ScrollDownButton>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    );
}
