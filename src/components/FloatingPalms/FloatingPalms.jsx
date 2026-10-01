import palmImg from '../../assets/10265265.webp';
import './FloatingPalms.css';

const palms = [
  { id: 1, left: '2%', top: '5%', size: 160, delay: 0, duration: 7 },
  { id: 2, left: '86%', top: '18%', size: 130, delay: 1.8, duration: 8 },
  { id: 3, left: '4%', top: '48%', size: 110, delay: 0.9, duration: 6 },
  { id: 4, left: '88%', top: '62%', size: 140, delay: 2.5, duration: 9 },
];

export default function FloatingPalms() {
  return (
    <div className="floating-palms" aria-hidden="true">
      {palms.map((palm) => (
        <div
          key={palm.id}
          className="floating-palm-wrap"
          style={{
            left: palm.left,
            top: palm.top,
            width: palm.size,
            animationDelay: `${palm.delay}s`,
            animationDuration: `${palm.duration}s`,
          }}
        >
          <img src={palmImg.src} alt="" className="floating-palm" loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}
