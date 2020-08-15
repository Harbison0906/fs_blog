export interface IBlog {
  id?=: string;
  title?: string;
  content?: string;
  _created?: number;
}

export interface ITags {
  id?: string;
  name?: string;
}

export interface IBlogTags {
  blogid?: number;
  tagid?: number;
}