import type { ReactNode } from 'react';

interface DropdownItem {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    disabled?: boolean;
}

interface DropdownProps {
    trigger: ReactNode;
    items: DropdownItem[];
    position?: 'bottom' | 'top' | 'left' | 'right';
    align?: 'start' | 'end';
    hover?: boolean;
}

export const Dropdown = ({
    trigger,
    items,
    position = 'bottom',
    align = 'end',
    hover = false
}: DropdownProps) => {
    const positionClasses = {
        bottom: 'dropdown-bottom',
        top: 'dropdown-top',
        left: 'dropdown-left',
        right: 'dropdown-right'
    };

    const alignClasses = {
        start: 'dropdown-start',
        end: 'dropdown-end'
    };

    const hoverClass = hover ? 'dropdown-hover' : '';

    return (
        <div className={`dropdown ${positionClasses[position]} ${alignClasses[align]} ${hoverClass}`.trim()}>
            <div tabIndex={0} role="button" className="m-1">
                {trigger}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow">
                {items.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className="flex items-center gap-2"
                        >
                            {item.icon && item.icon}
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
