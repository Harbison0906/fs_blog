import { Query } from '../';

const all = () => Query('SELECT * FROM Blogs');
const one = (id: number) => Query('SELECT * FROM Blogs WHERE id = ?', [id]);
const insert = (title: string, content: string) => Query('INSERT INTO Blogs (title, content) VALUES(?, ?)', [title, content]);
const update = (id: number, title: string, content: string) => Query('UPDATE Blogs SET title=?, content=? WHERE id=?', [title, content, id]);
const destroy = (id: number) => Query('DELETE FROM Blogs WHERE id=?', [id]);


export default { all, one, insert, update, destroy } 