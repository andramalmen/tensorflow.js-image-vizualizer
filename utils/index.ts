import * as tf from '@tensorflow/tfjs';
import { Rank, Tensor } from '@tensorflow/tfjs';

export const convertToTensor = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(tf.browser.fromPixels(img));

        img.onerror = reject;
        img.src = src;
    });
};

export const convertTensorToImage = async (
    tensor: any,
    current: HTMLCanvasElement | null
) => {
    console.log(typeof tensor);
    try {
        if (current) {
            tf.browser.toPixels(tensor, current).then(() => {
                tensor.dispose();
                console.log('Check cleaning', tf.memory().numTensors);
            });
        } else {
            console.error('No tensor passed ');
        }
    } catch (err) {
        console.error(err);
    }
};
