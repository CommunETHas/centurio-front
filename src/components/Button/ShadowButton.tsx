import React, { PropsWithChildren, ReactElement } from 'react';

const ShadowButton: React.FC<ShadowButtonProps> = ({
  label,
  color,
  textColor,
  fontSize,
  filled,
  onClick,
  content,
}: ShadowButtonProps) => {
  const backgroundColor = `bg-${color}`;
  return (
    <div className="relative w-full h-full">
      <button
        type="button"
        className={`${
          filled ? backgroundColor : ''
        } ${fontSize} absolute z-10 w-full h-full focus:outline-none text-xs text-${textColor} font-bold border border-${color} rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1`}
        onClick={onClick}
      >
        {label}
        {content}
      </button>
      <div
        className={`absolute w-full h-full bg-transparent focus:outline-none border border-${color} rounded-full transform translate-x-1 translate-y-1`}
      />
    </div>
  );
};

interface ShadowButtonProps extends PropsWithChildren<any> {
  label?: string;
  color?: string;
  textColor?: string;
  fontSize?: FontSize;
  filled?: boolean;
  onClick?: () => void;
  content?: ReactElement;
}

const defaultProps: ShadowButtonProps = {
  label: '',
  color: 'primary',
  textColor: 'secondary',
  fontSize: 'text-sm',
  filled: true,
  onClick: () => {},
  content: <></>,
};

// TODO: Maybe use type defined in tailwind
type FontSize =
  | 'text-xs'
  | 'text-sm'
  | 'text-md'
  | 'text-lg'
  | 'text-xl'
  | 'text-4xl';

ShadowButton.defaultProps = defaultProps;

export default ShadowButton;
