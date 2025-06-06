import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../services/firebase';

export function useRealtimePlayers() {
  const [players, setPlayers] = useState({});

  useEffect(() => {
    const playersRef = ref(db, 'players');

    const unsubscribe = onValue(playersRef, (snapshot) => {
      const val = snapshot.val() || {};
      setPlayers(val);
    });

    return () => unsubscribe();
  }, []);

  return players;
}
