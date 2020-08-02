import * as express from 'express';
import db from '../db';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
      const tags = await db.tags.all();
      res.json(tags);
  } catch (error) {
    console.log(error)
    res.status(500).json('Oops, something went wrong...')
  }
});

router.post('/', async (req, res, next) => {
  const tagDTO = req.body;
  try {
      const { insertId } = await db.tags.insert(tagDTO);
      res.json({msg: 'tag created', id: insertId });
  } catch (error) {
    console.log(error)
    res.status(500).json('Oops, something went wrong...')
  }
});

export default router