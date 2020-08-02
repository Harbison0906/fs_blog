import { Query } from '../';

const all = () => Query('');
const one = () => Query('', []);
const insert = (blogid: number, tagid: number) => Query('INSERT INTO BlogTags (blogid, tagid) VALUE(?, ?)', [blogid, tagid]);
const update = () => Query('', []);
const destroy = () => Query('', []);
const allTagsForBlog = (blogid) => Query('CALL spBlogTags(?)', [blogid]);

export default { all, one, insert, update, destroy, allTagsForBlog }


