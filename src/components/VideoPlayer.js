import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import {
  usePlayingVideoState,
  usePlayingVideoDispatch,
} from '../store/playingVideoContext';
import YouTube from 'react-native-youtube';
import dayjs from 'dayjs';

export default function VideoPlayer(props) {
  const videoData = props.videoData.item;

  const state = usePlayingVideoState();
  const dispatch = usePlayingVideoDispatch();

  const videoPublishedAt = dayjs(videoData.snippet.publishedAt).format(
    'DD/MM/YYYY',
  );

  return (
    <Card style={styles.card}>
      <Card.Title
        title={videoData.snippet.title}
        subtitle={`${videoData.snippet.channelTitle} - ${videoPublishedAt}`}
        titleNumberOfLines={3}
      />
      <Card.Content>
        {state.videoId === videoData.id ? (
          <YouTube
            apiKey={props.youTubeApiKey}
            videoId={videoData.id}
            play
            onError={(e) => console.error(e.error)}
            style={styles.videoPlayer}
          />
        ) : (
          <TouchableOpacity
            onPress={() =>
              dispatch({type: 'setVideoId', payload: videoData.id})
            }>
            <Image
              source={{uri: videoData.snippet.thumbnails.high.url}}
              style={styles.videoPlayer}
            />
          </TouchableOpacity>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {marginHorizontal: 8, marginVertical: 4},
  videoPlayer: {alignSelf: 'stretch', height: 204, marginTop: 8},
});
