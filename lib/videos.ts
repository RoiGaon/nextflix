import videoTestData from "../data/videos.json";

const fetchVideos = async (url: string) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  );

  return await response.json();
};

export const getCommonVideos = async (url: string) => {
  try {
    const isDev = process.env.NODE_ENV === "production" ? false : true;
    const data = isDev ? videoTestData : await fetchVideos(url);

    if (data?.error) {
      console.error("Youtube Api Error ", data.error);
      return [];
    }

    return data?.items.map((item: any) => {
      const id = item?.id?.videoId ?? item.id;
      const snippet = item.snippet;
      return {
        title: snippet?.title,
        description: snippet.description,
        publishTime: snippet.publishedAt.split("T")[0],
        channelTitle: snippet.channelTitle,
        statistics: item?.statistics ? item.statistics : { viewCount: 0 },
        imgUrl: snippet?.thumbnails.high.url,
        id,
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = async (searchQuery: string) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = async () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IL`;
  return getCommonVideos(URL);
};

export const getYouTubeVideoById = async (videoId: string) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};
