import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const SolchicksGame = ({ show }: { show: boolean }) => {
  const { unityProvider, isLoaded } = useUnityContext({
    loaderUrl:
      'games/solchicks/Build/solchicks_minigame_dungeon_escape_20220509_REAL.loader.js',
    dataUrl:
      'games/solchicks/Build/solchicks_minigame_dungeon_escape_20220509_REAL.data',
    frameworkUrl:
      'games/solchicks/Build/solchicks_minigame_dungeon_escape_20220509_REAL.framework.js',
    codeUrl:
      'games/solchicks/Build/solchicks_minigame_dungeon_escape_20220509_REAL.wasm',
  });

  return (
    <Unity
      unityProvider={unityProvider}
      style={{ visibility: show ? 'visible' : 'hidden' }}
    />
  );
};

export default SolchicksGame;
