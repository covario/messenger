import { NextApiRequest, NextApiResponse } from 'next';
import { readFile } from 'fs';
import { v4 as uuid } from 'uuid';

interface Config {
  licenseKey: string;
  runtime: {
    version: string;
  };
  startup_app: {
    name: string;
    uuid: string;
    url: string;
    autoShow: boolean;
    defaultWidth: number;
    defaultHeight: number;
  };
}

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  readFile('./app.local.json', { encoding: 'utf-8' }, (_err, data) => {
    const responseJson = JSON.parse(data) as Config;
    responseJson.startup_app.uuid = uuid();
    res.json(responseJson);
  });
};
