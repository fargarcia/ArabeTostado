import { XYCoord } from 'react-dnd';

export const getRotation = (newPosition: XYCoord | null, prevPostition: XYCoord | null) => {
  const rotation = {
    rotateX: 0,
    rotateY: 0,
  };

  if (newPosition && prevPostition) {
    const rotateY = (newPosition.x - prevPostition.x) / 1.5;
    const rotateX = (newPosition.y - prevPostition.y) / 1.5;
    rotation.rotateY = rotateY > 40 ? 40 : rotateY < -40 ? -40 : rotateY;
    rotation.rotateX = rotateX > 40 ? 40 : rotateX < -40 ? -40 : rotateX;
  }
  return rotation;
};

export const areDistant = (newPosition: XYCoord | null, prevPostition: XYCoord | null) =>
  newPosition &&
  prevPostition &&
  Math.abs(newPosition.x - prevPostition.x) + Math.abs(newPosition.y - prevPostition.y) > 5;
