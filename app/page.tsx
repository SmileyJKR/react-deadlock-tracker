'use client';

import { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/data/latest.json')
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return <div>loading…</div>;

  return (
    <main>
      <h1>Patch {data.latest_patch.title} · data as of {data.date}</h1>
      <table>
        <thead>
          <tr><th>hero</th><th>tier</th><th>winrate</th><th>pickrate</th></tr>
        </thead>
        <tbody>
          {data.heroes.map(h => (
            <tr key={h.id}>
              <td>
                <div className="flex items-center gap-2">
                  <img src={h.image} alt={h.name} className="h-10 w-10 object-cover rounded" />
                  <span>{h.name}</span>
                </div>
              </td>
              <td>{h.tier}</td>
              <td>{h.winrate}</td>
              <td>{h.pickrate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
