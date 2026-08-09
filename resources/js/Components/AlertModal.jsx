import ConfirmModal from './ConfirmModal';

export default function AlertModal({ show, onClose, onConfirm, title, message }) {
    return (
        <ConfirmModal
            show={show}
            onClose={onClose}
            onConfirm={onConfirm}
            title={title}
            message={message}
            type="warning"
        />
    );
}
