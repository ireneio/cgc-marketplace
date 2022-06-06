import { useAppDispatch } from '@/store';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ClipboardText = ({
  children,
  copyValue,
  iconHeight = 16,
  iconWidth = 16,
}: {
  children: React.ReactNode;
  copyValue?: string;
  iconWidth?: number;
  iconHeight?: number;
}) => {
  const dispatch = useAppDispatch();

  const handleCopySuccess = () => {
    dispatch({
      type: 'SHOW_SNACKBAR',
      payload: { title: 'Success', text: 'Copied to Clipboard!' },
    });
  };

  return (
    <CopyToClipboard
      text={copyValue ? String(copyValue) : String(children)}
      onCopy={() => handleCopySuccess()}
    >
      <div className="flex cursor-pointer items-center">
        <div>{children}</div>
        <div className="ml-[6px]">
          <img
            src="/img/icon_copy.svg"
            alt="clipboard"
            width={iconWidth}
            height={iconHeight}
          />
        </div>
      </div>
    </CopyToClipboard>
  );
};

export default ClipboardText;
