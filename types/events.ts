export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  badge?: string;
  image?: string;
  link?: string;
  isUpcoming?: boolean;
}
