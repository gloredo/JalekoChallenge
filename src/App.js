import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, FlatList} from 'react-native';
import {Searchbar, Appbar} from 'react-native-paper';
import VideoPlayer from './components/VideoPlayer';
import EmptySearch from './components/EmptySearch';
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

  const viewabilityConfigRef = useRef({itemVisiblePercentThreshold: 75});
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
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.appbar}>
          <Searchbar
            placeholder="Qual vídeo você quer ver?"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
          />
        </Appbar>
        <FlatList
          data={filteredVideosData}
          renderItem={renderVideo}
          keyExtractor={(video) => video.id}
          ListEmptyComponent={EmptySearch}
          onViewableItemsChanged={onViewableItemsRef.current}
          viewabilityConfig={viewabilityConfigRef.current}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65d4d3',
  },
  appbar: {paddingHorizontal: 8},
});
