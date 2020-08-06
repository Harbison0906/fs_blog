import * as express from 'express';
import db from '../db';

const router = express.Router();

router.get('/:id?', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    if (id) {
      const [blog] = await db.blogs.one(id);
      res.json(blog);
    } else {
      const blogs = await db.blogs.all();
      res.json(blogs);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json('Oops, something went wrong...')
  }
});

router.post('/', async (req, res) => {
  const blog = req.body;
  try {
    const insert = await db.blogs.insert(blog.title, blog.content);
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json('Oops, we couldn\'t post this blog');
  }
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const blog = req.body;
  try {
    const update = await db.blogs.update(id, blog.title, blog.content);
    res.json('Blog updated!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Oops, something went wrong...')
  }
})

router.delete('/:blogid', async (req, res) => {
  const blogid = Number(req.params.blogid);
  await db.blogtags.destroy(blogid); //delete this blog's reference first
  await db.blogs.destroy(blogid); //delete safely now from blogs table
  res.json({msg: 'destroyed' }); 
});

// router.delete('/:id?', async (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const destroy = await db.blogs.destroy(id);
//     res.json('Successfully deleted!');
//   } catch (error) {
//     console.log(error);
//     res.status(500).json('This blog could not be deleted.')
//   }
// })

export default router;