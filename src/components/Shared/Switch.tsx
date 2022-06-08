interface Props {
  checked?: boolean;
  onChange?: (val: boolean) => void | Promise<void>;
  id?: string;
}

const Switch = ({ onChange, checked, id }: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id || 'switch'}
        className="switch-input"
        onChange={() => onChange && onChange(!checked)}
        checked={checked}
      />
      <label htmlFor={id || 'switch'} className="switch-label">
        <span className="switch-span"></span>
      </label>
    </div>
  );
};

export default Switch;
