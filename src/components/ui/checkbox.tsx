
interface CheckboxProps {
    checked: boolean;
    onCheckedChange: () => void;
}

export function Checkbox({ checked, onCheckedChange }: CheckboxProps) {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={() => onCheckedChange()}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
        />
    );
}