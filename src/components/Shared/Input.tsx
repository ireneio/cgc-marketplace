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
  label: string;
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
        <div className="text-[#FFFFFF] text-[12px] mb-[10px]">
          <label htmlFor={id}>{label}</label>
        </div>
        <div
          style={{ width: block ? '100%' : 'auto' }}
          className="relative flex items-center"
          id={id}
        >
          {/* <PrependIconWrapper style={{ left: 12 }}>{prependIcon && prependIcon}</PrependIconWrapper> */}
          {React.createElement('input', {
            ...restProps,
            className: twMerge(
              'font-circularstdbook w-full text-[14px] rounded-[6px] bg-[#0C001C] px-[18px] py-[10px] text-[#ACACAC] outline-none border-[1px] border-[#FFFFFF] focus:border-[#AAAAAA]',
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
