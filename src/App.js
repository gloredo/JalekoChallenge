import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, FlatList} from 'react-native';
import {Searchbar} from 'react-native-paper';
import VideoPlayer from './components/VideoPlayer';
import getYouTubeVideosDataById from './services/getYouTubeVideosDataById';
import {
  usePlayingVideoState,
  usePlayingVideoDispatch,
} from './store/playingVideoContext';
import YOUTUBE_VIDEOS_ID from './data/YOUTUBE_VIDEOS_ID';
import {YOUTUBE_DATA_API_V3} from '@env';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videosData, setVideosData] = useState([]);
  const [filteredVideosData, setFilteredVideosData] = useState([]);

  const renderVideo = (data) => (
    <VideoPlayer videoData={data} youTubeApiKey={YOUTUBE_DATA_API_V3} />
  );

  useEffect(() => {
    async function getVideosData() {
      const data = await getYouTubeVideosDataById(
        YOUTUBE_VIDEOS_ID.toString(),
        YOUTUBE_DATA_API_V3,
      );
      setVideosData(data);
    }

    getVideosData();
  }, []);

  useEffect(() => {
    const filteredVideos = videosData.filter((video) =>
      video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredVideosData(filteredVideos);
  }, [videosData, searchQuery]);

  //Prevents application crash due to known issue with react-native-youtube UNAUTHORIZED_OVERLAY
  //See more: https://github.com/davidohayon669/react-native-youtube#known-issues
  const [viewableVideo, setViewableVideo] = useState({});
  const state = usePlayingVideoState();
  const dispatch = usePlayingVideoDispatch();

  const viewConfigRef = useRef({itemVisiblePercentThreshold: 60});
  const onViewRef = useRef((viewableItems) => {
    setViewableVideo(viewableItems.changed[0]);
  });

  useEffect(() => {
    if (viewableVideo.item?.id === state.videoId && !viewableVideo.isViewable) {
      dispatch({type: 'setVideoId', payload: ''});
    }
  }, [viewableVideo, dispatch, state.videoId]);

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView>
        <Searchbar
          placeholder="Qual vídeo você quer ver?"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
        <FlatList
          data={filteredVideosData}
          renderItem={renderVideo}
          keyExtractor={(video) => video.id}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      </SafeAreaView>
    </>
  );
}

// const styles = StyleSheet.create({});
