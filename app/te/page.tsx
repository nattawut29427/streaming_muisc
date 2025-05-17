"use client";

import { useState, useEffect } from "react";
import { Howl } from "howler";

export default function HowlerDemoPage() {
  const playlist = [
    { title: "Song 1", src: "/audio/song.mp3" },
    { title: "Song 2", src: "/audio/song2.mp3" },
    // เพิ่มเพลงอื่น ๆ ได้
  ];

  const [volume, setVolume] = useState(0.7); 

useEffect(() => {
  const savedVolume = localStorage.getItem('volume');
  if (savedVolume !== null) {
    setVolume(parseFloat(savedVolume));
  }
}, []);
  
const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('volume', newVolume.toString());
    if (sound) {
      sound.volume(newVolume);
    }
  };

  const [sound, setSound] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playSound = (index: number) => {
    if (sound) {
      sound.stop();
    }

    const newSound = new Howl({
      src: [playlist[index].src],
      volume: volume,
      autoplay: true,
      onend: () => {
        setIsPlaying(false);
        console.log("เพลงจบแล้ว");
      },
    });

    setSound(newSound);
    setCurrentIndex(index);
    setIsPlaying(true);
    newSound.play();
  };

  const handlePlay = () => {
    if (sound) {
      sound.play();
      setIsPlaying(true);
    } else {
      playSound(currentIndex);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSound(nextIndex);
  };

  const handleBefore = () => {
    const nextIndex = (currentIndex - 1) % playlist.length;
    playSound(nextIndex);
  };

  const handleStop = () => {
    if (sound && sound.playing()) {
      sound.pause();
      setIsPlaying(false);
    }
  };



  return (
    <div className="p-6 space-y-4 m-auto max-w-md ">
      <h1 className="text-2xl font-bold">Play music</h1>
      <p>🎶 กำลังเล่น: {playlist[currentIndex].title}</p>

      <div className="space-x-5">
        <button
          onClick={handlePlay}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isPlaying ? "กำลังเล่น..." : "เล่น"}
        </button>

        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          เพลงถัดไป
        </button>

        <button
          onClick={handleBefore}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          เพลงก่อนหน้า
        </button>

        <button
          onClick={handleStop}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          หยุด
        </button>
        <div className="mt-4">
          <label htmlFor="volume" className="block text-sm font-medium mb-1">
            ระดับเสียง: {Math.round(volume * 100)}%
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
