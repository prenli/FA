import { ReactNode, Children } from "react";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";

interface ResponsiveDataGridProps {
  children: ReactNode;
  headerLabels: string[];
}

// REMARK: mind tailwind.config.js safelist
// we use 'md:grid-cols-${numberOfColumns}' and tailwind optimize bundle size for production and contain only string classes names
// so in case that you need more than 7 columns or need different breakpoint add appropriate classes
// read more on https://tailwindcss.com/docs/content-configuration#safelisting-classes
const ResponsiveDataGrid = ({
  children,
  headerLabels,
}: ResponsiveDataGridProps) => {
  const numberOfColumns = headerLabels.length + 1;

  return (
    <>
      <div
        className={`flex md:grid md:grid-cols-${numberOfColumns} justify-between py-1 px-2 text-sm font-semibold text-gray-500 bg-gray-100`}
      >
        {headerLabels.map((label, index) => {
          if (index === 0) {
            return (
              <div className="col-span-2" key={index}>
                {label}
              </div>
            );
          }
          return (
            <div className="text-right" key={index}>
              {label}
            </div>
          );
        })}
      </div>
      <div className="px-2 ">
        <div
          className={`flex md:grid flex-col md:grid-cols-${numberOfColumns} md:leading-5 divide-y`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

interface RowProps {
  children: ReactNode;
  onClick: () => void;
}

const Row = ({ children, onClick }: RowProps) => {
  const isGrid = useMatchesBreakpoint("md");

  const ChildrenArray = Children.toArray(children);

  if (isGrid) {
    return (
      <>
        {ChildrenArray.map((child, index) => {
          if (index === 0) {
            return (
              <div
                className="col-span-2 py-2 text-left"
                onClick={onClick}
                key={index}
              >
                {child}
              </div>
            );
          }
          return (
            <div className="py-2 text-right" onClick={onClick} key={index}>
              {child}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="py-2" onClick={onClick}>
      <div className="flex gap-4 justify-between items-center text-gray-800">
        {ChildrenArray[0]}
        {ChildrenArray[2]}
      </div>
      <div className="flex justify-between">
        {ChildrenArray[1]}
        {ChildrenArray[3]}
      </div>
    </div>
  );
};

ResponsiveDataGrid.Row = Row;

export { ResponsiveDataGrid };
