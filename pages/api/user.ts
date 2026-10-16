import type { NextApiRequest, NextApiResponse } from 'next';
import { searchUser, updateUser } from 'lib/api/user';
import { getSession } from 'next-auth/react';
import { getMdxSource } from 'lib/api/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const rawQuery = req.query.query;
    if (Array.isArray(rawQuery)) {
      return res.status(400).json({ error: 'Query must be a string.' });
    }
    const query = typeof rawQuery === 'string' ? rawQuery.trim() : '';
    if (!query || query.length > 100) {
      return res.status(400).json({ error: 'Query must be between 1 and 100 characters.' });
    }
    try {
      const result = await searchUser(query);
      return res.status(200).json(result);
    } catch (e: any) {
      console.error('User API request failed', e);
      return res.status(500).json({ error: 'User request failed.' });
    }
  } else if (req.method === 'PUT') {
    const { username, bio } = req.body || {};
    const session = await getSession({ req });
    if (typeof username !== 'string' || typeof bio !== 'string' || bio.length > 256) {
      return res.status(400).json({ error: 'Invalid profile payload.' });
    }
    if (!session || session.username !== username) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }
    try {
      const result = await updateUser(username, bio);
      if (result) {
        await res.unstable_revalidate(`/${username}`);
      }
      const bioMdx = await getMdxSource(bio); // return bioMdx to optimistically show updated state
      return res.status(200).json(bioMdx);
    } catch (e: any) {
      console.error('User profile update failed', e);
      return res.status(500).json({ error: 'Profile update failed.' });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
