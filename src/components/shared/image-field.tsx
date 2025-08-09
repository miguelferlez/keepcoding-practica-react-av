import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

interface ImageFieldProps {
  onChange: (file: File) => void;
}

const ImageField = ({ onChange, ...props }: ImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function showPreview(file: File | undefined) {
    const reader = new FileReader();

    if (!file) {
      return setPreview(null);
    }

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (file) {
      showPreview(file);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    showPreview(file);

    if (file) {
      showPreview(file);
      onChange(file);
    }
  }

  return (
    <div>
      <p className="mb-2 font-medium">Advert Image:</p>
      <div
        className="relative mb-4 flex h-80 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-500/15 p-6 transition hover:opacity-75"
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          accept="image/*"
          onChange={handleChange}
          {...props}
        />
        <div className="pointer-events-none text-center">
          <span className="material-symbols-outlined !text-5xl">
            add_photo_alternate
          </span>
          <label htmlFor="photo" className="relative">
            <h4>Drag and drop or browse to upload</h4>
            <input id="photo" name="photo" type="file" className="sr-only" />
          </label>
          <p className="text-xs">Allowed formats: PNG, JPG</p>
          {preview && (
            <img
              src={preview}
              className="absolute inset-0 h-full w-full bg-white object-cover"
              id="preview"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageField;
