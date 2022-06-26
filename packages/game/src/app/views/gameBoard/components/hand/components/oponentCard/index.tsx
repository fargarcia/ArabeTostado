import { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './styles.module.scss';

interface Props {
  relativePosition: number;
}

const OponentCard = ({ relativePosition }: Props) => {
  const [{ rotateZ, x, y }, api] = useSpring(() => ({
    config: { mass: 1, tension: 350, friction: 40 },
    rotateZ: 0,
    x: 0,
    y: 0,
  }));

  useEffect(() => {
    api({
      rotateZ: -(relativePosition * 10),
      x: -(relativePosition * 30),
      y: -(110 + Math.abs(relativePosition ** 5)),
    });
  }, [relativePosition]);

  return (
    <animated.div className={styles.cardContainer} style={{ x, y, rotateZ }}>
      <div className={styles.label}>Árabe Tostado</div>
    </animated.div>
  );
};

export default OponentCard;
