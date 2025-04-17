import Modal from './Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from './Button';

export default function AlertModal({ show, onClose, onConfirm, title = 'Are you sure?', message = 'This action cannot be undone.' }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <div className="flex items-center space-x-3">
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-lg font-semibold">{title}</h2>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {message}
                </p>
                <div className="mt-6 flex justify-end gap-2">
                    <Button btnType="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button btnType="danger" onClick={onConfirm}>
                        Yes, Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
