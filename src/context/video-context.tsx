"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface VideoContextType {
  playingId: string | null;
  setPlayingId: (id: string | null) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <VideoContext.Provider value={{ playingId, setPlayingId }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
}
