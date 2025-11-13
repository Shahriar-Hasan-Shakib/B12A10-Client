import type { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    actions?: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'full';
    position?: 'top' | 'middle' | 'bottom';
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    actions,
    size = 'md',
    position = 'middle'
}: ModalProps) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'modal-box-sm',
        md: '',
        lg: 'modal-box-lg',
        full: 'modal-box-full'
    };

    const positionClasses = {
        top: 'modal-top',
        middle: 'modal-middle',
        bottom: 'modal-bottom'
    };

    return (
        <dialog className={`modal ${isOpen ? 'modal-open' : ''} ${positionClasses[position]}`}>
            <div className={`modal-box ${sizeClasses[size]}`}>
                {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
                <div className="py-4">{children}</div>
                {actions && <div className="modal-action">{actions}</div>}
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}
                        type="button"
                    >
                        ✕
                    </button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose} type="button">close</button>
            </form>
        </dialog>
    );
};
