const TickerText = ({
  text,
  direction,
  fontSize,
}: {
  text: number;
  direction: 'up' | 'down' | 'flat';
  fontSize: string | number;
}) => {
  return (
    <div className="flex items-center">
      <div>
        {direction !== 'flat' && (
          <img
            src={`/img/${
              direction === 'up'
                ? 'icon_ticker_green.svg'
                : 'icon_ticker_red.svg'
            }`}
            alt="text"
            width={10}
            height={10}
          />
        )}
      </div>
      <div
        style={{
          color:
            direction === 'up'
              ? '#3FFF8C'
              : direction === 'down'
              ? '#FF3F3F'
              : '#FFFFFF',
          fontSize: fontSize + 'px',
        }}
        className="ml-[2px]"
      >
        {text}%
      </div>
    </div>
  );
};

export default TickerText;
