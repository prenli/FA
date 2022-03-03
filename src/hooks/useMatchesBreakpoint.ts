import theme from "tailwindTheme";
import { useWindowSize } from "./useWindowSize";

const breakpointsSorted = Object.entries(theme.screens)
  .sort((breakpoint1, breakpoint2) =>
    parseInt(breakpoint1[1]) > parseInt(breakpoint2[1]) ? 1 : -1
  )
  .map((breakpoint) => breakpoint[0]);

type BreakpointType = typeof breakpointsSorted[number];

export const useMatchesBreakpoint = (testedBreakpoint: BreakpointType) => {
  const { width } = useWindowSize();
  const testedBreakpointIndex = breakpointsSorted.indexOf(testedBreakpoint);

  return (
    width >= parseInt(theme.screens[breakpointsSorted[testedBreakpointIndex]])
  );
};
