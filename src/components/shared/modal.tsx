import Button from "../ui/button";

interface ModalProps {
  title: string;
  text: string;
  buttonLabel: string;
  type: "warning" | "info";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal = ({
  title,
  text,
  buttonLabel,
  type,
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 dark:bg-white/30"
      role="dialog"
    >
      <div className="animate-fade-down bg-background flex max-w-xs flex-col gap-4 rounded-lg p-4 shadow-xl md:max-w-md">
        <div className="flex items-center justify-between">
          <h4 className="!mb-0">{title}</h4>
          <button
            className="btn flex border-none !p-0 !shadow-none"
            onClick={onClose}
          >
            <span className="material-symbols-outlined !font-medium">
              close
            </span>
          </button>
        </div>
        <p>{text}</p>
        <div className="flex justify-end gap-3">
          <Button label="Cancel" variant="outline" onClick={onClose} />
          <Button
            label={buttonLabel}
            variant={type === "warning" ? "destructive" : "outline"}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
