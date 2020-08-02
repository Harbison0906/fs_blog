import * as express from 'express';
import db from '../db';


const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
      const blogtags = await db.blogtags.all();
      res.json(blogtags);
  } catch (error) {
    console.log(error)
    res.status(500).json('Oops, something went wrong...')
  }
});

router.post('/', async (req, res, next) => {
  const { blogid, tagid } = req.body;
  try {
    await db.blogtags.insert(blogid, tagid)
    res.json({ msg: 'tag created' });
  } catch (error) {
    console.log(error)
    res.status(500).json('Oops, something went wrong...')
  }
});

export default router