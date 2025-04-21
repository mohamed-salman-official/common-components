export interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
  views: number;
  tags: string[]; // Assuming tags are strings; adjust if necessary
  reactions: {
    [key: string]: any; // Or use a more specific structure if known
  };
}

export interface PostModel {
  limit: number;
  skip: number;
  total: number;
  posts: PostData[];
}
