import React, {createContext, useReducer, useContext} from 'react';

const PlayingVideoStateContext = createContext();
const PlayingVideoDispatchContext = createContext();

function playingVideoReducer(state, action) {
  switch (action.type) {
    case 'setVideoId': {
      return {videoId: action.payload};
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PlayingVideoProvider({children}) {
  const [state, dispatch] = useReducer(playingVideoReducer, {videoId: ''});

  return (
    <PlayingVideoStateContext.Provider value={state}>
      <PlayingVideoDispatchContext.Provider value={dispatch}>
        {children}
      </PlayingVideoDispatchContext.Provider>
    </PlayingVideoStateContext.Provider>
  );
}

function usePlayingVideoState() {
  const context = useContext(PlayingVideoStateContext);

  if (context === undefined) {
    throw new Error(
      'usePlayingVideoState must be used within a PlayingVideoProvider',
    );
  }

  return context;
}

function usePlayingVideoDispatch() {
  const context = useContext(PlayingVideoDispatchContext);

  if (context === undefined) {
    throw new Error(
      'usePlayingVideoDispatch must be used within a PlayingVideoProvider',
    );
  }

  return context;
}

export {PlayingVideoProvider, usePlayingVideoState, usePlayingVideoDispatch};
