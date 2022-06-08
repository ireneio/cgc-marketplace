import React, { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  autoFocus?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  block?: boolean;
  id?: string;
  label?: string;
}

const FormInput = React.forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      autoFocus = false,
      onChange,
      // className,
      // prependIcon,
      // appendIcon,
      block,
      id,
      label,
      ...restProps
    } = props;
    return (
      <div>
        {label && (
          <div className="text-[#FFFFFF] text-[12px] mb-[10px]">
            <label htmlFor={id}>{label || ''}</label>
          </div>
        )}
        <div
          style={{ width: block ? '100%' : 'auto' }}
          className="relative flex items-center"
          id={id}
        >
          {React.createElement('input', {
            ...restProps,
            className:
              'appearance-none block w-full px-3 py-2 border border-[#706f6f] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#919090] focus:border-[#919090] sm:text-sm font-circularstdbook bg-[#0C001C] text-[#FFFFFF]',
            autoFocus,
            onChange,
            ref,
          })}
        </div>
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
