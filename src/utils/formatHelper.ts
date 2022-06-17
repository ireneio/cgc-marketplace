export function getNumberWithCommas(val: string | number, decimals?: number) {
  if (isNaN(Number(val))) {
    return '';
  }
  return Number(
    Number(val).toFixed(decimals || decimals === 0 ? decimals : 2),
  ).toLocaleString(undefined, { minimumFractionDigits: decimals });
}

type UnitTypes = 'usd' | 'bnb' | '%' | 'orbs' | 'sol';

interface UnitOptions {
  type?: UnitTypes;
  decimals?: number;
}

export function getNumberWithUnit(val: string | number, options?: UnitOptions) {
  if (options) {
    const { type, decimals } = options;
    switch (type) {
      case 'orbs':
        return getNumberWithCommas(val, decimals) + ' ORBS';
      case '%':
        return getNumberWithCommas(val, decimals) + '%';
      case 'bnb':
        return getNumberWithCommas(val, decimals) + ' BNB';
      case 'sol':
        return getNumberWithCommas(val, decimals) + ' SOL';
      case 'usd':
      default:
        return '$' + getNumberWithCommas(val, decimals);
    }
  }
  return '$' + getNumberWithCommas(val);
}

interface TrimmedAddressOptions {
  length: number;
}

export function getTrimmedAddressEllipsisMiddle(
  val: string,
  options?: TrimmedAddressOptions,
) {
  if (!val) return '...';
  if (options) {
    const { length } = options;
    return (
      val.substring(0, length - 1) +
      '...' +
      val.substring(val.length - 4, val.length)
    );
  }
  return (
    val.substring(0, 5) + '...' + val.substring(val.length - 4, val.length)
  );
}

export function sortAlphabetical(x: string, y: string) {
  if (x.toLowerCase() !== y.toLowerCase()) {
    x = x.toLowerCase();
    y = y.toLowerCase();
  }
  return x > y ? 1 : x < y ? -1 : 0;
}

export function getNumberWithUnits(num: number) {
  const _formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return _formatter.format(num);
}
