import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
    title = null,
    description = null,
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        full: 'sm:max-w-full sm:m-4',
    }[maxWidth] || 'sm:max-w-2xl';

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex transform items-center justify-center overflow-y-auto p-4 transition-all sm:p-6"
                onClose={close}
            >
                {/* Backdrop Blur overlay */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
                </TransitionChild>

                {/* Modal Container */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`relative w-full transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 dark:text-slate-100 text-left shadow-2xl transition-all ${maxWidthClass}`}
                    >
                        {/* Header if title is present */}
                        {(title || closeable) && (
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 px-6 py-4">
                                <div>
                                    {title && <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>}
                                    {description && <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{description}</p>}
                                </div>
                                {closeable && (
                                    <button
                                        onClick={close}
                                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Modal Body */}
                        <div>{children}</div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
