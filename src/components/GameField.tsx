interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

interface Props {
  players: Record<string, Player>;
}

export function GameBoard({ players }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        width: 800,
        height: 600,
        background: '#111',
        margin: '0 auto',
      }}
    >
      {Object.values(players).map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              color: '#fff',
              fontSize: '12px',
              marginBottom: '2px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: '2px 4px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {p.name}
          </div>
          <div
            style={{
              width: 4,
              height: 4,
              backgroundColor: p.color,
              transform: 'scale(4)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
