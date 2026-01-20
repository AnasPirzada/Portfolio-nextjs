import styles from './Loader.module.scss';

const Loader = () => {
  // Configuration for orbital rings
  const rings = [
    { count: 6, radius: 80, speed: 8, size: 12, color: '#efc041' },
    { count: 8, radius: 120, speed: 12, size: 10, color: '#eeba2c' },
    { count: 10, radius: 160, speed: 16, size: 8, color: '#64f4ab' },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        {/* Main Orbital System */}
        <div className={styles.orbitalSystem}>
          {/* Center Core */}
          <div className={styles.centerCore}>
            <div className={styles.coreInner}>
              <div className={styles.corePulse} />
            </div>
          </div>

          {/* Orbital Rings with Orbs */}
          {rings.map((ring, ringIndex) => (
            <div
              key={ringIndex}
              className={styles.orbitalRing}
              style={{
                '--ring-radius': `${ring.radius}px`,
                '--ring-speed': `${ring.speed}s`,
              }}
            >
              {[...Array(ring.count)].map((_, orbIndex) => (
                <div
                  key={orbIndex}
                  className={styles.orb}
                  style={{
                    '--orb-angle': `${(orbIndex * 360) / ring.count}deg`,
                    '--orb-size': `${ring.size}px`,
                    '--orb-color': ring.color,
                    '--orb-delay': `${(orbIndex * ring.speed) / ring.count}s`,
                  }}
                >
                  <div className={styles.orbGlow} />
                  <div className={styles.orbCore} />
                </div>
              ))}
            </div>
          ))}

          {/* Rotating Rings */}
          <svg className={styles.decorativeRings} viewBox="0 0 400 400">
            <defs>
              <linearGradient
                id="ringGrad1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#efc041" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient
                id="ringGrad2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#64f4ab" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#eeba2c" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="url(#ringGrad1)"
              strokeWidth="1"
              strokeDasharray="5 10"
              className={styles.ring1}
            />
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="url(#ringGrad2)"
              strokeWidth="1"
              strokeDasharray="8 8"
              className={styles.ring2}
            />
          </svg>

          {/* Particle Effects */}
          <div className={styles.particleContainer}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={styles.particle}
                style={{
                  '--particle-x': `${Math.random() * 100}%`,
                  '--particle-y': `${Math.random() * 100}%`,
                  '--particle-delay': `${Math.random() * 3}s`,
                  '--particle-duration': `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
