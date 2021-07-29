import Image from 'next/image';
import React from 'react';
import { LegacyRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CardImages = ({
    image,
    canvas,
    tensor,
}: {
    image: string;
    canvas: LegacyRef<HTMLCanvasElement> | undefined;
    tensor: any;
}) => {
    const [copyState, setCopyState] = React.useState(false);

    const copy = () => {
        setCopyState(true);
    };
    return (
        <>
            <div className="card bordered">
                <div className="card-body">
                    <h2 className="card-title">Image uploaded</h2>
                </div>
                <div className="w-full h-full relative">
                    <Image
                        src={image + '?' + new Date().getTime()}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>
            <div className="card bordered">
                <div className="card-body">
                    <h2 className="card-title">Image from tensor</h2>
                </div>
                {copyState ? (
                    <p className="text-secondary">Tensor copied</p>
                ) : (
                    <></>
                )}
                <div className="card-actions">
                    <CopyToClipboard
                        text={JSON.stringify(tensor)}
                        onCopy={copy}
                    >
                        <button className="btn btn-primary">Copy Tensor</button>
                    </CopyToClipboard>
                </div>
                <canvas ref={canvas}></canvas>
            </div>
        </>
    );
};

export default CardImages;
