import axios from 'axios';

export default async function getYouTubeVideosDataById(videoId, youTubeKey) {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: {
          part: 'snippet',
          id: videoId,
          key: youTubeKey,
        },
      },
    );

    return response.data.items;
  } catch (error) {
    console.error(error);
  }
}
