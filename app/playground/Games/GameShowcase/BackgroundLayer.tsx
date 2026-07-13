'use client';

import Image from 'next/image';
import { GameEntry } from './GameData';

interface BackgroundLayerProps {
  games: GameEntry[];
  activeId: string | null;
}

export default function BackgroundLayer({ games, activeId }: BackgroundLayerProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {games.map((game) => (
        <div
          key={game.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            game.id === activeId ? 'opacity-20' : 'opacity-0'
          }`}
          style={{ filter: 'blur(20px)' }}
        >
          <Image
            src={game.backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}
