import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture2,
  Settings,
  Captions,
  Film,
  SkipBack,
  SkipForward,
} from "lucide-react";

/**
 * Purple YouTube-Style Video Player
 * ------------------------------------------------------------
 * - HTML5 <video> with custom controls
 * - YouTube-like hotkeys: Space/K (play), J/L (±10s), arrows (seek/vol), M (mute), F (fullscreen), T (theater)
 * - Purple theme (Tailwind)
 * - Buffered preview, progress + volume sliders, speed menu, PiP, theater, captions toggle (if track provided)
 * - Responsive & accessible
 *
 * Usage:
 * <VideoPlayer
 *   src="/videos/demo.mp4"
 *   poster="/thumbs/demo.jpg"
 *   title="Demo Video"
 *   sources={[
 *     { src: "/videos/demo-720.mp4", type: "video/mp4", label: "720p" },
 *     { src: "/videos/demo-1080.mp4", type: "video/mp4", label: "1080p" },
 *   ]}
 *   captions={{ src: "/subs/demo.vtt", srclang: "en", label: "English" }}
 *   defaultSpeed={1}
 *   startTime={0}
 *   autoPlay={false}
 * />
 */

const formatTime = (s) => {
  if (!Number.isFinite(s)) return "0:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${sec}` : `${m}:${sec}`;
};

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function VideoPlayer({
  src,
  poster,
  title = "",
  sources = [], // optional quality options
  captions, // { src, srclang, label }
  autoPlay = false,
  defaultSpeed = 1,
  startTime = 0,
  onPlay,
  onPause,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [speed, setSpeed] = useState(defaultSpeed);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [pipAvailable, setPipAvailable] = useState(false);
  const [showOverlayPlay, setShowOverlayPlay] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);
  const hideTimer = useRef(null);

  const allSpeeds = useMemo(() => [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2], []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      setDuration(v.duration || 0);
      if (startTime > 0)
        v.currentTime = clamp(startTime, 0, v.duration || startTime);
      if (autoPlay) v.play().catch(() => {});
    };
    const onTime = () => setCurrent(v.currentTime || 0);
    const onProg = () => {
      try {
        if (v.buffered.length)
          setBuffered(v.buffered.end(v.buffered.length - 1));
      } catch {}
    };
    const onPlayEv = () => {
      setIsPlaying(true);
      setShowOverlayPlay(true);
      onPlay && onPlay();
      setTimeout(() => setShowOverlayPlay(false), 500);
    };
    const onPauseEv = () => {
      setIsPlaying(false);
      onPause && onPause();
    };
    const onVol = () => {
      setVolume(v.volume);
      setIsMuted(v.muted || v.volume === 0);
    };
    const onRate = () => setSpeed(v.playbackRate);

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("progress", onProg);
    v.addEventListener("play", onPlayEv);
    v.addEventListener("pause", onPauseEv);
    v.addEventListener("volumechange", onVol);
    v.addEventListener("ratechange", onRate);

    setPipAvailable(
      !!document.pictureInPictureEnabled && !v.disablePictureInPicture
    );

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("progress", onProg);
      v.removeEventListener("play", onPlayEv);
      v.removeEventListener("pause", onPauseEv);
      v.removeEventListener("volumechange", onVol);
      v.removeEventListener("ratechange", onRate);
    };
  }, [autoPlay, onPause, onPlay, startTime]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.volume === 0) v.volume = 0.5;
  }, []);

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.currentTime = clamp(val, 0, duration);
    setCurrent(v.currentTime);
  };

  const handleVolume = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.volume = clamp(val, 0, 1);
    v.muted = v.volume === 0;
  };

  const requestFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await el.requestFullscreen();
  };

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleTheater = () => setIsTheater((t) => !t);

  const toggleSpeedMenu = () => setShowSpeedMenu((s) => !s);

  const setPlaybackRate = (r) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = r;
    setSpeed(r);
    setShowSpeedMenu(false);
  };

  const enterPiP = async () => {
    try {
      const v = videoRef.current;
      if (!v || !pipAvailable) return;
      if (document.pictureInPictureElement)
        await document.exitPictureInPicture();
      else await v.requestPictureInPicture();
    } catch {}
  };

  const showAndHideControls = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false);
    }, 2500);
  };

  const onKeyDown = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (["input", "textarea"].includes(tag)) return;
    switch (e.key.toLowerCase()) {
      case " ":
      case "k":
        e.preventDefault();
        togglePlay();
        break;
      case "j":
        v.currentTime = clamp(v.currentTime - 10, 0, duration);
        break;
      case "l":
        v.currentTime = clamp(v.currentTime + 10, 0, duration);
        break;
      case "arrowleft":
        v.currentTime = clamp(v.currentTime - 5, 0, duration);
        break;
      case "arrowright":
        v.currentTime = clamp(v.currentTime + 5, 0, duration);
        break;
      case "arrowup":
        v.volume = clamp(v.volume + 0.05, 0, 1);
        break;
      case "arrowdown":
        v.volume = clamp(v.volume - 0.05, 0, 1);
        break;
      case "m":
        toggleMute();
        break;
      case "f":
        requestFullscreen();
        break;
      case "t":
        toggleTheater();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.addEventListener("mousemove", showAndHideControls);
    c.addEventListener("mouseleave", () => setShowControls(false));
    window.addEventListener("keydown", onKeyDown);
    return () => {
      c.removeEventListener("mousemove", showAndHideControls);
      c.removeEventListener("mouseleave", () => setShowControls(false));
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [duration]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // captions toggle
    const track = v.textTracks?.[0];
    if (track) track.mode = captionsOn ? "showing" : "hidden";
  }, [captionsOn]);

  const progressPercent = duration ? (current / duration) * 100 : 0;
  const bufferedPercent = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={[
        "group relative mx-auto select-none",
        "rounded-2xl shadow-xl overflow-hidden",
        "bg-gradient-to-b from-violet-900/70 to-purple-900/70",
        isTheater ? "w-full max-w-screen-2xl" : "w-full max-w-4xl",
      ].join(" ")}
      aria-label={title || "Video player"}
      role="region"
    >
      {/* Video */}
      <div className="relative bg-black">
        <video
          ref={videoRef}
          className="w-full h-auto aspect-video"
          poster={poster}
          preload="metadata"
          src={src || undefined}
          onClick={togglePlay}
        >
          {sources.map((s, i) => (
            <source key={i} src={s.src} type={s.type} />
          ))}
          {captions && (
            <track
              kind="subtitles"
              srcLang={captions.srclang || "en"}
              label={captions.label || "Captions"}
              src={captions.src}
              default
            />
          )}
        </video>

        {/* Center play pulse */}
        {showOverlayPlay && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-full p-6 bg-violet-600/30 backdrop-blur-sm">
              <Play className="size-10 text-white" />
            </div>
          </div>
        )}

        {/* Top gradient and title */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        {title && (
          <div className="absolute left-4 top-3 z-10 flex items-center gap-2 text-white/90">
            <Film className="size-4" />
            <span className="line-clamp-1 text-sm md:text-base font-medium drop-shadow">
              {title}
            </span>
          </div>
        )}

        {/* Controls */}
        <div
          className={[
            "absolute inset-x-0 bottom-0 z-20",
            "transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {/* Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Progress */}
          <div className="relative px-4 md:px-5">
            <div
              className="relative h-3 w-full cursor-pointer"
              onMouseDown={(e) => {
                // clicking on the rail seeks
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = clamp((e.clientX - rect.left) / rect.width, 0, 1);
                if (videoRef.current)
                  videoRef.current.currentTime = pct * duration;
              }}
            >
              {/* Buffered */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white/20"
                style={{ width: `${bufferedPercent}%` }}
              />
              {/* Progress */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-purple-600"
                style={{ width: `${progressPercent}%` }}
              />
              {/* Slider */}
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={current}
                onChange={handleSeek}
                className="relative z-10 h-3 w-full appearance-none bg-transparent"
                aria-label="Seek"
              />
            </div>

            {/* Times */}
            <div className="mt-1 flex items-center justify-between text-[11px] md:text-xs text-white/80">
              <div>
                {formatTime(current)} / {formatTime(duration)}
              </div>
              <div className="hidden md:block">
                {Math.round((current / (duration || 1)) * 100)}%
              </div>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="relative z-10 mx-2 mb-2 mt-2 md:mx-4 flex items-center justify-between gap-2">
            {/* Left controls */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20 active:scale-95"
                title={isPlaying ? "Pause (k)" : "Play (k)"}
              >
                {isPlaying ? (
                  <Pause className="size-5" />
                ) : (
                  <Play className="size-5" />
                )}
              </button>

              {/* Skip 10s back/forward */}
              <button
                onClick={() => {
                  if (!videoRef.current) return;
                  videoRef.current.currentTime = clamp(
                    videoRef.current.currentTime - 10,
                    0,
                    duration
                  );
                }}
                className="hidden md:inline-flex rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                title="Back 10s (J)"
                aria-label="Back 10 seconds"
              >
                <SkipBack className="size-5" />
              </button>
              <button
                onClick={() => {
                  if (!videoRef.current) return;
                  videoRef.current.currentTime = clamp(
                    videoRef.current.currentTime + 10,
                    0,
                    duration
                  );
                }}
                className="hidden md:inline-flex rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                title="Forward 10s (L)"
                aria-label="Forward 10 seconds"
              >
                <SkipForward className="size-5" />
              </button>

              {/* Volume */}
              <div className="group/vol flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  title="Mute (M)"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-5" />
                  ) : (
                    <Volume2 className="size-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="hidden w-24 md:block"
                  aria-label="Volume"
                />
              </div>

              {/* Captions toggle (if track) */}
              {captions && (
                <button
                  onClick={() => setCaptionsOn((c) => !c)}
                  className={[
                    "rounded-xl p-2 text-white hover:bg-white/20",
                    captionsOn ? "bg-violet-600/50" : "bg-white/10",
                  ].join(" ")}
                  aria-pressed={captionsOn}
                  aria-label="Toggle captions"
                  title="Captions"
                >
                  <Captions className="size-5" />
                </button>
              )}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Speed menu */}
              <div className="relative">
                <button
                  onClick={toggleSpeedMenu}
                  className="rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20 text-xs md:text-sm"
                  aria-haspopup="menu"
                  aria-expanded={showSpeedMenu}
                  title="Playback speed"
                >
                  <span className="mr-1">{speed}x</span>
                  <Settings className="inline-block size-4 align-[-2px]" />
                </button>
                {showSpeedMenu && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-36 rounded-xl border border-white/10 bg-zinc-900/90 p-1 shadow-2xl backdrop-blur-xl"
                  >
                    {allSpeeds.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaybackRate(s)}
                        className={[
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10",
                          s === speed ? "bg-violet-600/40" : "",
                        ].join(" ")}
                        role="menuitem"
                      >
                        <span>{s}x</span>
                        {s === speed && (
                          <span className="text-violet-300">•</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theater */}
              <button
                onClick={toggleTheater}
                className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Toggle theater mode"
                title="Theater (T)"
              >
                <Minimize
                  className={`size-5 ${isTheater ? "rotate-180" : ""}`}
                />
              </button>

              {/* PiP */}
              {pipAvailable && (
                <button
                  onClick={enterPiP}
                  className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                  aria-label="Picture-in-Picture"
                  title="Picture-in-Picture"
                >
                  <PictureInPicture2 className="size-5" />
                </button>
              )}

              {/* Fullscreen */}
              <button
                onClick={requestFullscreen}
                className="rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Toggle Fullscreen"
                title="Fullscreen (F)"
              >
                {isFullscreen ? (
                  <Minimize className="size-5" />
                ) : (
                  <Maximize className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click-capture area to keep controls alive */}
      <button
        onClick={togglePlay}
        className="absolute inset-0 -z-10"
        aria-label={isPlaying ? "Pause" : "Play"}
        tabIndex={-1}
      />
    </div>
  );
}
