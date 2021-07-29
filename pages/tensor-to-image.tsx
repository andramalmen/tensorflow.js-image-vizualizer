import * as tf from '@tensorflow/tfjs';
import * as React from 'react';
import { convertTensorToImage } from '../utils';

const TensorToImage = () => {
    const myCanvas = React.useRef(null);
    const bigMess = tf.randomUniform([400, 400, 3]);

    React.useEffect(() => {
        convertTensorToImage(bigMess, myCanvas.current);
    }, []);

    return <canvas ref={myCanvas}></canvas>;
};

export default TensorToImage;
