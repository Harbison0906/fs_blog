import * as express from 'express';
import db from '../db';


const router = express.Router();

router.get('/', async (req, res, next) => {
  const blogid = req.body;
  try {
      const blogtags = await db.blogtags.allTagsForBlog(blogid);
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

router.delete('/:blogid?', async (req, res) => {
  const blogid = Number(req.params.id);
  try {
    const destroy = await db.blogtags.destroy(blogid);
    res.json('Successfully deleted!');
  } catch (error) {
    console.log(error);
    res.status(500).json('This blogtag could not be deleted.')
  }
})

export default router