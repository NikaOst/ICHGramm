import { useEffect, useRef } from 'react';

function LoadingBar() {
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current || !window.ldBar) return;

    const bar = new window.ldBar(elRef.current, {
      preset: 'line',
      value: 0,
    });

    bar.set(100);

    return () => {
      if (elRef.current) {
        elRef.current.ldBar = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div ref={elRef} className="ldBar" style={{ width: 'min(420px, 80vw)', height: '60px' }} />
    </div>
  );
}

export default LoadingBar;
