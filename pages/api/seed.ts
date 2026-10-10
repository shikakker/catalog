import type { NextApiRequest, NextApiResponse } from 'next';
import { setup } from 'scripts/setup.mjs';
import { isSeedRequestAuthorized } from 'lib/seed-auth.mjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expectedToken = process.env.SEED_API_TOKEN;
  if (!expectedToken) {
    return res.status(503).json({ error: 'Seed endpoint is disabled until SEED_API_TOKEN is configured.' });
  }

  if (!isSeedRequestAuthorized({
    method: req.method,
    authorization: req.headers.authorization,
    expectedToken
  })) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const message = await setup();

    if (message) {
      return res.status(500).json({ error: { message } });
    }

    await res.unstable_revalidate('/');
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Seed failed:', error);
    return res.status(500).json({ error: 'Seed failed' });
  }
}

export default handler;
