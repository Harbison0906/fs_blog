import { Query } from '../db/index';


const all = () => Query('');
const one = () => Query('', []);
const insert = () => Query('', []);
const update = () => Query('', []);
const destroy = () => Query('', []);



export default { all, one, insert, update, destroy }