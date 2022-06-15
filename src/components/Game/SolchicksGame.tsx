import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext, UnityContext } from 'react-unity-webgl';

interface Vector2 {
  x: number;
  y: number;
}

const unityContext = new UnityContext({
  loaderUrl:
    'games/solchicks/Build/solchicks_minigame_dungeon_escape_20220509_REAL.loader.js',
  dataUrl:
    'games/solchicks/Build/solchicks_minigame_dungeon_escape_20220509_REAL.data',
  frameworkUrl:
    'games/solchicks/Build/solchicks_minigame_dungeon_escape_20220509_REAL.framework.js',
  codeUrl:
    'games/solchicks/Build/solchicks_minigame_dungeon_escape_20220509_REAL.wasm',
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
});

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
      style={{ display: show ? 'block' : 'none' }}
    />
  );
};

export default SolchicksGame;
