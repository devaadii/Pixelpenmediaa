"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useVideo } from "@/context/video-context";

interface VideoPlayerProps {
  src: string;
  className?: string;
  isYoutube?: boolean;
  poster?: string;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  setVolume: (volume: number) => void;
  destroy: () => void;
}

interface YTEvent {
  data: number;
  target: YTPlayer;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (event: YTEvent) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

export const VideoPlayer = ({ src, className = "", isYoutube = false, poster }: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const { playingId, setPlayingId } = useVideo();

  // Helper to extract YT ID from URL if src is a URL
  const getYoutubeId = (url: string) => {
    if (url.length === 11) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const videoId = isYoutube ? getYoutubeId(src) : "";

  // 1. YouTube API Initialization
  useEffect(() => {
    if (!isYoutube) {
      setIsReady(true);
      return;
    }

    if (!window.YT) {
      const existingScript = document.getElementById('youtube-api-script');
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === 'function') previousCallback();
        initPlayer();
      };
    } else if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === 'function') previousCallback();
        initPlayer();
      };
    }

    function initPlayer() {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player(`player-${videoId}`, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          fs: 0,
          disablekb: 1,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            playerRef.current?.setVolume(80);
            setDuration(playerRef.current?.getDuration() ?? 0);
          },
          onStateChange: (event: YTEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setHasStarted(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          },
        },
      });
    }

    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  }, [isYoutube, videoId]);

  // 2. Progress Tracking (Both Types)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        if (isYoutube && playerRef.current?.getCurrentTime) {
          setCurrentTime(playerRef.current.getCurrentTime());
          setDuration(playerRef.current.getDuration());
        } else if (!isYoutube && videoRef.current) {
          setCurrentTime(videoRef.current.currentTime);
          setDuration(videoRef.current.duration);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isYoutube]);

  // 3. Playback Controls
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isReady) return;

    if (isYoutube && playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        setPlayingId(src);
        playerRef.current.playVideo();
      }
    } else if (!isYoutube && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        setPlayingId(src);
        videoRef.current.play();
      }
    }
  };

  // 4. Sync with Global Playback
  useEffect(() => {
    if (playingId !== src && isPlaying) {
      if (isYoutube && playerRef.current?.pauseVideo) {
        playerRef.current.pauseVideo();
      } else if (!isYoutube && videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [playingId, src, isPlaying, isYoutube]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (isYoutube && playerRef.current) {
      playerRef.current.seekTo(time, true);
    } else if (!isYoutube && videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 group overflow-hidden cursor-pointer bg-black ${className}`}
      onClick={togglePlay}
    >
      {isYoutube ? (
        <div id={`player-${videoId}`} className="absolute inset-0 pointer-events-none block scale-[1.02]" />
      ) : (
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover block scale-[1.02]"
          playsInline
          poster={poster}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.volume = 0.8;
              setDuration(videoRef.current.duration);
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* YouTube Thumbnail Cover (hides YouTube UI before playback) */}
      {isYoutube && !hasStarted && videoId && (
        <img
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Video Thumbnail"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
      )}

      {/* Play/Pause Button Overlay */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
          {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} className="ml-1" fill="white" />}
        </div>
      </div>

      {/* Custom Timeline (Hover Only - YouTube Only) */}
      {isYoutube && (
        <div className="absolute z-20 bottom-4 left-4 right-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
          <button
            onClick={togglePlay}
            className="text-white hover:scale-110 transition-transform"
          >
            {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" />}
          </button>

          <input
            type="range"
            min={0}
            max={isFinite(duration) ? duration : 0}
            value={currentTime}
            step={0.1}
            onChange={handleSeek}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white hover:h-1.5 transition-all"
          />

          <div className="text-[10px] font-mono text-white/70 min-w-16 tabular-nums">
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} /
            {isFinite(duration) ? ` ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}` : ' --:--'}
          </div>
        </div>
      )}
    </div>
  );
};