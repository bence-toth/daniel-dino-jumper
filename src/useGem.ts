import { useEffect, useRef } from "react";

const defaultRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

interface UseGemParams {
  dinoRef: React.RefObject<HTMLDivElement>;
  id: number;
  onTakeGem: (id: number) => void;
}

const useGem = ({ dinoRef, id, onTakeGem }: UseGemParams) => {
  const gemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const collisionDetectionInterval = setInterval(() => {
      const gemBox = gemRef.current?.getBoundingClientRect() ?? defaultRect;
      const dinoBox = dinoRef.current?.getBoundingClientRect() ?? defaultRect;
      if (
        gemBox?.bottom > dinoBox?.top &&
        gemBox?.right > dinoBox?.left &&
        gemBox?.top < dinoBox?.bottom &&
        gemBox?.left < dinoBox?.right
      ) {
        onTakeGem(id);
      }
    }, 10);
    return () => {
      clearInterval(collisionDetectionInterval);
    };
  }, [dinoRef, id, onTakeGem]);

  return { gemRef };
};

export default useGem;
