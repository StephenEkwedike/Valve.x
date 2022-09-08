import { XIcon } from "@heroicons/react/solid";

interface IProps {
  className?: string;
  value: {
    file: File | null;
    fileUrl: string;
  };
  placeholder: string;
  onChange: (file: File | null) => void;
  size: {
    width: number;
    height: number;
  };
  id: string;
  disabled?: boolean;
}

export const ImageUpload = (props: IProps) => {
  const { id, onChange, placeholder, size, value } = props;

  const getImageDimensions = (file: File) =>
    new Promise((resolve, reject) => {
      const img = new Image();

      // the following handler will fire after a successful loading of the image
      img.onload = () => {
        const { naturalWidth: width, naturalHeight: height } = img;
        resolve({ width, height });
      };

      // and this handler will fire if there was an error with the image (like if it's not really an image or a corrupted one)
      img.onerror = () => {
        reject("There was some problem with the image.");
      };

      img.src = URL.createObjectURL(file);
    });

  const onChangeFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const imgSize: { width: number; height: number } =
        (await getImageDimensions(event.target.files[0])) as any;

      if (imgSize.height !== size.height || imgSize.width !== size.width) {
        alert(`Image size should be ${size.width}x${size.height}`);
        (event.target as any).value = null;
        return;
      }

      onChange(event.target.files[0]);
      (event.target as any).value = null;
    }
  };

  return (
    <div
      className={`rounded-2xl bg-base p-6 w-full bg-base1 my-8 ${props.className}`}
    >
      <input
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        id={id}
        onChange={onChangeFiles}
        type="file"
      />
      {!value.file && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray">{placeholder}</p>
          <label
            htmlFor={id}
            className="bg-white py-2 px-6 text-black text-sm rounded-lg cursor-pointer"
          >
            Upload
          </label>
        </div>
      )}
      {value.file && value.fileUrl && (
        <div className="flex justify-between">
          <img alt="img" className="w-24 h-24" src={value.fileUrl} />
          <button
            className="w-6 h-6 flex items-center justify-center"
            onClick={() => onChange(null)}
          >
            <XIcon className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};
