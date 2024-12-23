export interface Note {
  id: string;
  content: string;
  category: string;
  created_at: string;
  user_id: string;
}

export interface Category {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}