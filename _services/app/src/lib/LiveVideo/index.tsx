import React from "react";
import ReactHlsPlayer from "react-hls-player";

export default function LiveVideo(props: any) {
  const playerRef = React.useRef<any>();
  return (
    <ReactHlsPlayer
      src={props.source}
      autoPlay={true}
      controls={true}
      width="100%"
      height="auto"
      playerRef={playerRef}
    />
  );
}
