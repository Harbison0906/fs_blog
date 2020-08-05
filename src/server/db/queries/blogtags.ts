import { Query } from '../';

const all = () => Query('');
const one = () => Query('', []);
const insert = (blogid: number, tagid: number) => Query('INSERT INTO BlogTags (blogid, tagid) VALUE(?, ?)', [blogid, tagid]);
const update = () => Query('', []);
const destroy = (blogid: number) => Query('DELETE FROM BlogTags WHERE blogid=?', [blogid]);
const allTagsForBlog = (blogid: number) => Query('CALL spBlogTags(?)', [blogid]);

export default { all, one, insert, update, destroy, allTagsForBlog }


