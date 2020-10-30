import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { username, password } = req.body as { username: string; password: string };

  if (username === password) {
    res.status(200).json({
      success: true,
      status: 200,
    });
  } else if (password === 'canales') {
    res.status(401).json({
      success: false,
      status: 401,
    });
  } else {
    res.status(500).json({
      success: false,
      status: 500,
    });
  }
};
