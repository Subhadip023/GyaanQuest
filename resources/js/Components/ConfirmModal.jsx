import Modal from './Modal';
import {
    ExclamationTriangleIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';

export default function ConfirmModal({
    show = false,
    onClose = () => {},
    onConfirm = () => {},
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning', // 'warning' | 'danger' | 'info' | 'success'
    processing = false,
    maxWidth = 'md',
}) {
    const iconConfig = {
        warning: {
            icon: ExclamationTriangleIcon,
            color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
            btnType: 'primary',
        },
        danger: {
            icon: XCircleIcon,
            color: 'text-red-500 bg-red-50 dark:bg-red-950/40',
            btnType: 'danger',
        },
        info: {
            icon: InformationCircleIcon,
            color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
            btnType: 'primary',
        },
        success: {
            icon: CheckCircleIcon,
            color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
            btnType: 'primary',
        },
    }[type] || { icon: ExclamationTriangleIcon, color: 'text-amber-500 bg-amber-50', btnType: 'primary' };

    const Icon = iconConfig.icon;

    return (
        <Modal show={show} onClose={onClose} maxWidth={maxWidth}>
            <div className="p-6">
                <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full flex-shrink-0 ${iconConfig.color}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                    <SecondaryButton type="button" onClick={onClose} disabled={processing}>
                        {cancelText}
                    </SecondaryButton>
                    {iconConfig.btnType === 'danger' ? (
                        <DangerButton type="button" onClick={onConfirm} disabled={processing}>
                            {processing ? 'Processing...' : confirmText}
                        </DangerButton>
                    ) : (
                        <PrimaryButton type="button" onClick={onConfirm} disabled={processing}>
                            {processing ? 'Processing...' : confirmText}
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </Modal>
    );
}
