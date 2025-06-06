import { useState } from 'react';
import { useRealtimePlayers } from './hooks/useRealtimePlayers';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import { PlayerForm } from './components/LoginForm';
import { GameBoard } from './components/GameField';

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const players = useRealtimePlayers();

  usePlayerMovement(player);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Realtime Multiplayer Pixel Game</h1>
      {!player ? (
        <PlayerForm onCreate={setPlayer} />
      ) : (
        <GameBoard players={players} />
      )}
    </div>
  );
}

export default App;
