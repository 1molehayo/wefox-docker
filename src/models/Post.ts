interface IPost {
  id?: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

export default IPost;
