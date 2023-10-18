interface DividerProps {
  text?: string;
}
export const Divider = ({ text }: DividerProps) => {
  return (
    <div className="py-5 flex items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      {text && <span className="flex-shrink mx-4 text-gray-400">{text}</span>}
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
};
