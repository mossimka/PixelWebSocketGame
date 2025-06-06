import { useEffect } from 'react';
import { getDatabase, ref, set, onDisconnect } from 'firebase/database';

export function usePlayerMovement(player: any) {
  useEffect(() => {
    if (!player) return;

    const db = getDatabase();
    const playerRef = ref(db, `players/${player.id}`);

    set(playerRef, player);

    onDisconnect(playerRef).remove();

    const speed = 2;
    const keys: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    let animationFrame: number;

    const move = () => {
      if (!player) return;

      let x = player.x;
      let y = player.y;

      if (keys['w'] || keys['ArrowUp']) y -= speed;
      if (keys['s'] || keys['ArrowDown']) y += speed;
      if (keys['a'] || keys['ArrowLeft']) x -= speed;
      if (keys['d'] || keys['ArrowRight']) x += speed;

      if (x !== player.x || y !== player.y) {
        const newPlayer = { ...player, x, y };
        set(playerRef, newPlayer);
        player = newPlayer;
      }

      animationFrame = requestAnimationFrame(move);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    animationFrame = requestAnimationFrame(move);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrame);
      // Можно вручную удалить, если нужно:
      // remove(playerRef);
    };
  }, [player]);
}
