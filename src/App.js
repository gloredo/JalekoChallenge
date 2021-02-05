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
import {YOUTUBE_DATA_API_V3_KEY} from '@env';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videosData, setVideosData] = useState([]);
  const [filteredVideosData, setFilteredVideosData] = useState([]);

  const renderVideo = (data) => (
    <VideoPlayer videoData={data} youTubeApiKey={YOUTUBE_DATA_API_V3_KEY} />
  );

  useEffect(() => {
    async function getVideosData() {
      const data = await getYouTubeVideosDataById(
        YOUTUBE_VIDEOS_ID.toString(),
        YOUTUBE_DATA_API_V3_KEY,
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

  //Prevents application crash due to known issue with react-native-youtube: UNAUTHORIZED_OVERLAY
  //See more: https://github.com/davidohayon669/react-native-youtube#known-issues
  const [viewableVideos, setViewableVideos] = useState([]);
  const playingVideoState = usePlayingVideoState();
  const playingVideoDispatch = usePlayingVideoDispatch();

  const viewabilityConfigRef = useRef({itemVisiblePercentThreshold: 95});
  const onViewableItemsRef = useRef(({viewableItems}) =>
    setViewableVideos(viewableItems),
  );

  useEffect(() => {
    if (viewableVideos.length === 0) {
      return;
    }

    const isPlayingVideoViewable = viewableVideos.filter(
      (video) => video.item.id === playingVideoState.videoId,
    );

    if (isPlayingVideoViewable.length === 0) {
      playingVideoDispatch({type: 'setVideoId', payload: ''});
    }
  }, [viewableVideos, playingVideoDispatch, playingVideoState.videoId]);

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView>
        <Searchbar
          placeholder="Qual vídeo você quer ver?"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
      </SafeAreaView>
      <FlatList
        data={filteredVideosData}
        renderItem={renderVideo}
        keyExtractor={(video) => video.id}
        onViewableItemsChanged={onViewableItemsRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
      />
    </>
  );
}

// const styles = StyleSheet.create({});
