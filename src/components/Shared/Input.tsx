import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  autoFocus?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  block?: boolean;
  id: string;
  label?: string;
}

const Input = React.forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      autoFocus = false,
      onChange,
      className,
      block,
      id,
      label,
      ...restProps
    } = props;
    return (
      <div>
        {label && (
          <div className="text-[#FFFFFF] text-[12px] mb-[10px]">
            <label htmlFor={id}>{label}</label>
          </div>
        )}
        <div
          style={{ width: block ? '100%' : 'auto' }}
          className="relative flex items-center"
          id={id}
        >
          {/* <PrependIconWrapper style={{ left: 12 }}>{prependIcon && prependIcon}</PrependIconWrapper> */}
          {React.createElement('input', {
            ...restProps,
            className: twMerge(
              'font-circularstdbook appearance-none min-w-0 w-full bg-[#0C001C] border border-[#290030] border-[1px] rounded-md py-2 px-4 text-base text-[#FFF] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#FC1F8E] focus:border-white focus:placeholder-gray-400 sm:max-w-xs',
              className,
            ),
            autoFocus,
            onChange,
            ref,
          })}
          {/* <AppendIconWrapper style={{ right: 12 }}>{appendIcon && appendIcon}</AppendIconWrapper> */}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
