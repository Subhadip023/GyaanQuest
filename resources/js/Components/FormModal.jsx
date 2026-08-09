import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function FormModal({
    show = false,
    onClose = () => {},
    onSubmit = () => {},
    title = '',
    description = '',
    submitText = 'Save',
    cancelText = 'Cancel',
    processing = false,
    maxWidth = 'md',
    children,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth={maxWidth} title={title} description={description}>
            <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-4">
                    {children}
                </div>

                <div className="flex items-center justify-end gap-3 bg-gray-50 dark:bg-slate-800/50 px-6 py-4 border-t border-gray-100 dark:border-slate-800 rounded-b-2xl">
                    <SecondaryButton type="button" onClick={onClose} disabled={processing}>
                        {cancelText}
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing ? 'Processing...' : submitText}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
