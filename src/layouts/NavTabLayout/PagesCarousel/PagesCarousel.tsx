import React, { ReactNode, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

export type SwipeDirection = "left" | "right";

export interface PagesCarouselProps {
  children: ReactNode;
  currentPageIndex: number;
  onPageSwipe: (direction: SwipeDirection) => void;
}

export const PagesCarousel = ({
  children,
  currentPageIndex,
  onPageSwipe,
}: PagesCarouselProps) => {
  const visitedPageIndexes = useVisitedPageIndexes(currentPageIndex);

  const handlers = useSwipeable({
    onSwipedLeft: () => onPageSwipe("left"),
    onSwipedRight: () => onPageSwipe("right"),
    preventDefaultTouchmoveEvent: true,
    delta: 50,
  });

  return (
    <div className="overflow-auto relative flex-1 w-full" {...handlers}>
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          const isCurrent = index === currentPageIndex;
          const shouldBeRendered =
            isCurrent || visitedPageIndexes.includes(index);
          return (
            <div
              key={index}
              className={`transition-all duration-300 overflow-x-hidden ${
                isCurrent ? "w-full" : "w-0 h-0"
              }`}
            >
              <div className="w-screen">{shouldBeRendered && child}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const useVisitedPageIndexes = (currentIndex: number) => {
  const [visitedPageIndexes, setVisitedPageIndexes] = useState<number[]>([
    currentIndex,
  ]);
  useEffect(() => {
    setVisitedPageIndexes((previousIndexes) => {
      if (previousIndexes.includes(currentIndex)) {
        return previousIndexes;
      }
      return [...previousIndexes, currentIndex];
    });
  }, [currentIndex]);

  return visitedPageIndexes;
};
