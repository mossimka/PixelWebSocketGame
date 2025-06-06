import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

interface Props {
  onCreate: (player: Player) => void;
}

export function PlayerForm({ onCreate }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = uuidv4();
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const x = 400;
    const y = 300;

    onCreate({ id, name, x, y, color });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <label>
        Enter your name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='border rounded px-4 py-2 ml-2'
        />
      </label>
      <button type="submit" className='border rounded px-4 py-2 bg-blue-500 text-white ml-4 hover:bg-blue-600'>
        Join Game
      </button>
    </form>
  );
}
