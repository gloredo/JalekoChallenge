import React from 'react';
import {AppRegistry} from 'react-native';
import {PlayingVideoProvider} from './src/store/playingVideoContext';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './src/App';

export default function Main() {
  return (
    <PlayingVideoProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </PlayingVideoProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
