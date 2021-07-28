// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import fse from 'fs-extra';

export const config = {
    api: {
        bodyParser: false,
    },
};

const dirPath = './public/uploads';

const saveFile = async (file: any) => {
    const data = fs.readFileSync(file.path);
    const extension = file.name.match(/\.[0-9a-z]+$/i)[0];
    const path = `${dirPath}/temp${extension}`;
    fs.writeFileSync(path, data);
    await fs.unlinkSync(file.path);
    return path.replace('./public', '');
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        uploadFile(req, res);
    } else if (req.method === 'DELETE') {
        await deleteFile(res);
    } else {
        res.status(405).send('Method Not Allowed');
    }
};

const uploadFile = (req: NextApiRequest, res: NextApiResponse) => {
    const form = new formidable.IncomingForm();
    try {
        form.parse(req, async (_err, _fields, files) => {
            const filePath = await saveFile(files.file);
            return res.status(200).json({ success: true, file: filePath });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occured', success: false });
    }
};

const deleteFile = async (res: NextApiResponse) => {
    try {
        await fse.emptyDir(dirPath);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occured', success: false });
    }
};
