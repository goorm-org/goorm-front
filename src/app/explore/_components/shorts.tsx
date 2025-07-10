import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { useLongPress } from "use-long-press";
import MuteToggleIcon from "./mute-toggle-icon";
import ShortsInfoSection from "./shorts-info-section";
import { ShortsData } from "../_hooks/useShorts";
import FilterDrawerButton from "./filter-drawer-button";

interface ShortsProps {
  item: ShortsData;
  page: number;
  currentPage: number;
}

export default function Shorts({ item, page, currentPage }: ShortsProps) {
  const playerRef = useRef<YouTube>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showVolumeIcon, setShowVolumeIcon] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleToggleMute = async () => {
    const player = playerRef.current?.internalPlayer;
    if (!player) return;
    const currentMuteState = await player.isMuted();
    if (currentMuteState) {
      player.unMute();
      setIsMuted(false);
      return;
    }
    player.mute();
    setIsMuted(true);
  };

  const handleShowVolumeIcon = () => {
    setShowVolumeIcon(true);
    setTimeout(() => {
      setShowVolumeIcon(false);
    }, 500);
  };

  const onLongPressVideo = useLongPress(
    () => {
      setIsLongPressing(true);
      setIsPaused(true);
      if (playerRef.current?.internalPlayer) {
        playerRef.current.internalPlayer.pauseVideo();
      }
    },
    {
      onFinish: () => {
        // 누르고 있다가 뗄 때 재생 재개 (longPress가 실제로 발생한 경우에만)
        if (isPaused) {
          if (playerRef.current?.internalPlayer && page === currentPage) {
            playerRef.current.internalPlayer.playVideo();
          }
          setIsPaused(false);
        }
        // 잠시 후 longPress 상태 해제
        setTimeout(() => setIsLongPressing(false), 50);
      },
      onCancel: () => {
        if (isPaused) {
          if (playerRef.current?.internalPlayer && page === currentPage) {
            playerRef.current.internalPlayer.playVideo();
          }
          setIsPaused(false);
        }
        setIsLongPressing(false);
      },
      threshold: 500, // 1초 후 longPress 콜백 실행
      captureEvent: true,
      cancelOnMovement: 10,
    }
  );

  const onClickVideo = () => {
    // 롱 프레스시
    if (isLongPressing) return;

    handleToggleMute();
    handleShowVolumeIcon();
  };

  useEffect(() => {
    if (!isPlayerReady || !playerRef.current?.internalPlayer) return;
    // 현재 페이지에 있으면 재생
    if (page === currentPage) {
      playerRef.current.internalPlayer.playVideo();
      return;
    }

    // 다른 페이지에 있으면 일시정지 & 처음으로 이동
    playerRef.current.internalPlayer.pauseVideo();
    playerRef.current.internalPlayer.seekTo(0);
  }, [page, currentPage, isPlayerReady]);

  return (
    <div className="flex bg-black max-h-[calc(100dvh-80px)] relative">
      <div className="w-full aspect-[9/16] relative max-w-sm mx-auto max-h-[calc(100dvh-80px)]">
        <YouTube
          videoId={item.id}
          ref={playerRef}
          onReady={() => setIsPlayerReady(true)}
          className="w-full h-full rounded-lg"
          iframeClassName="youtube-iframe"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              loop: 1,
              playsinline: 1,
              modestbranding: 1,
              playlist: item.id,
              rel: 0,
            },
          }}
        />
        <div
          className="absolute inset-0 z-10 bg-transparent cursor-grab"
          onClick={onClickVideo}
          {...onLongPressVideo()}
        />
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <MuteToggleIcon showVolumeIcon={showVolumeIcon} isMuted={isMuted} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
        <ShortsInfoSection item={item} />
      </div>
      <div className="absolute top-[16px] right-[50%] translate-x-[50%] z-40">
        <FilterDrawerButton />
      </div>
    </div>
  );
}
