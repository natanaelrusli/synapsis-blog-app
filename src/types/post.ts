export type Post = {
  title: string;
  body: string;
  id: number;
  user_id: number;
}

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export type PostComment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export type PostData = {
  id?: string;
  user?: string;
  user_id: number;
  title: string;
  body: string;
}
