import * as express from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogTagsRouter from './blogtags';

const router = express.Router();

router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogTagsRouter);


export default router;