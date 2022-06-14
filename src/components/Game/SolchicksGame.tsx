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
});

const SolchicksGame = ({ show }: { show: boolean }) => {
  const [isUnityMounted, setIsUnityMounted] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(30);
  const [cubeRotation, setCubeRotation] = useState<number>(0);
  const [clickPosition, setClickPosition] = useState<Vector2>({ x: 0, y: 0 });
  const [saidMessage, setSaidMessage] = useState<string>('Nothing');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [progression, setProgression] = useState<number>(0);

  useEffect(() => {
    unityContext.on('canvas', handleOnUnityCanvas);
    unityContext.on('progress', handleOnUnityProgress);
    unityContext.on('loaded', handleOnUnityLoaded);
    unityContext.on('RotationDidUpdate', handleOnUnityRotationDidUpdate);
    unityContext.on('ClickedPosition', handleOnUnityClickedPosition);
    unityContext.on('Say', handleOnUnitySayMessage);
    // When the component is unmounted, we'll unregister the event listener.
    return function () {
      unityContext.removeAllEventListeners();
    };
  }, []);

  function handleOnUnityCanvas(canvas: HTMLCanvasElement) {
    canvas.setAttribute('role', 'unityCanvas');
  }

  // Built-in event invoked when the Unity app's progress has changed.
  function handleOnUnityProgress(progression: number) {
    setProgression(progression);
  }

  // Built-in event invoked when the Unity app is loaded.
  function handleOnUnityLoaded() {
    setIsLoaded(true);
  }

  // Custom event invoked when the Unity app sends a message indicating that the
  // rotation has changed.
  function handleOnUnityRotationDidUpdate(degrees: number) {
    setCubeRotation(Math.round(degrees));
  }

  // Custom event invoked when the Unity app sends a message indicating that the
  // mouse click position has changed.
  function handleOnUnityClickedPosition(x: number, y: number) {
    setClickPosition({ x, y });
  }

  // Custom event invoked when the Unity app sends a message including something
  // it said.
  function handleOnUnitySayMessage(message: string) {
    setSaidMessage(message);
  }

  // Event invoked when the user clicks the button, the speed will be increased.
  function handleOnClickIncreaseSpeed() {
    setRotationSpeed(rotationSpeed + 15);
  }

  // Event invoked when the user clicks the button, the speed will be decreased.
  function handleOnClickDecreaseSpeed() {
    setRotationSpeed(rotationSpeed - 15);
  }

  // Event invoked when the user clicks the button, the unity container will be
  // mounted or unmounted depending on the current mounting state.
  function handleOnClickUnMountUnity() {
    if (isLoaded === true) {
      setIsLoaded(false);
    }
    setIsUnityMounted(isUnityMounted === false);
  }

  return (
    <div>
      {show ? (
        <Unity className="unity-canvas" unityContext={unityContext} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SolchicksGame;
