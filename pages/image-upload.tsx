import * as React from 'react';
import Image from 'next/image';

const ImageUpload = () => {
    const [image, setImage] = React.useState('');
    const [imageData, setImageData] = React.useState<File | undefined>();
    const [val, setVal] = React.useState('');
    const [temp, setTemp] = React.useState('');

    React.useEffect(() => {
        fetch('/api/upload', {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    console.log('Cleanup successful');
                }
            });
    }, []);

    const preview = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e?.target.files) {
            return;
        }
        const imgData = e.target.files[0];

        const img = URL.createObjectURL(imgData);
        setImageData(imgData);
        setImage(img);
        setVal('');
        setTemp('');
    };

    const upload = async (e: React.FormEvent) => {
        e.preventDefault();
        const body = new FormData();
        if (imageData) {
            body.append('file', imageData);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body,
            });
            const resp = await response.json();
            setImage('');
            if (resp.success) {
                setTemp(resp.file);
            }
        }
    };

    return (
        <>
            <div className="flex items-center justify-center bg-grey-lighter mt-5">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-primary-focus">
                    <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                        Select a file
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={preview}
                        value={val}
                    />
                </label>
            </div>
            <div className="flex items-center justify-center mt-5">
                <button
                    className="btn btn-primary btn-active mr-2"
                    role="button"
                    aria-pressed="true"
                    disabled={Boolean(!image)}
                    onClick={upload}
                >
                    Upload
                </button>
                {image ? <img src={image} /> : <></>}
            </div>
            <div className="flex items-center justify-center mt-5 ">
                <div className="w-96 h-96 relative">
                    {temp ? (
                        <Image
                            src={temp + '?' + new Date().getTime()}
                            layout="fill"
                            objectFit="contain"
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default ImageUpload;
