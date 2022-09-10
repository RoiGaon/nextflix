export type Size = "small" | "medium" | "large";

export interface Video {
  id: string;
  imgUrl: string;
  title: string;
}

export interface VideoStatGraphQLData {
  favourited: number;
  watched: boolean;
  userId: string;
  videoId: string;
}
