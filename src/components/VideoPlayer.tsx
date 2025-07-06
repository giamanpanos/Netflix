import classNames from "classnames";
import { useEffect, useRef, useState, type FC } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

interface VideoPlayerProps {
  videoId: string;
  isMuted?: boolean;
  pip?: boolean;
  customHeight?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  videoId,
  isMuted,
  pip,
  customHeight,
}) => {
  const location = useLocation();
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mute] = useState<boolean>(false);
  const [playing] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);

  useEffect(() => {
    setVolume(mute ? 0 : 0.8);
  }, [mute]);

  // We set classes depending of truth conditions
  const containerClass = classNames({
    "scale-110 relative pt-[56.25%] h-[190px]": pip,
    "h-[100vh]": location.pathname.startsWith("/watch"),
    [`h-[${customHeight}vh] relative pt-[56.25%] scale-150`]:
      !pip && !location.pathname.startsWith("/watch"),
  });

  return (
    <div className={containerClass} ref={containerRef}>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/embed/${videoId}`}
        controls={location.pathname.startsWith("/watch") ? true : false}
        muted={location.pathname.startsWith("/watch") ? mute : isMuted}
        playing={playing}
        volume={volume}
        loop={true}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        // The config should be added as we have a youtube video to display and we want to set some configs like no showing adds, etc
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              modestBranding: 1,
              rel: 0,
              disabledkb: 1,
            },
            // embedOptions: {}
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
