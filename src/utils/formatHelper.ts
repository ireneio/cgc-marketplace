export function getNumberWithCommas(val: string | number, decimals?: number) {
  if (val) {
    let result: string | number = Number(val);

    if (decimals !== 0) {
      result = result.toFixed(decimals || 2);
    }
    return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '0';
  // return parseFloat(String(val))
  //   .toFixed(decimals || 2)
  //   .toLocaleString();
}

type UnitTypes = 'usd' | 'bnb' | '%' | 'orbs' | 'sol';

interface UnitOptions {
  type: UnitTypes;
}

export function getNumberWithUnit(val: string | number, options?: UnitOptions) {
  if (options) {
    const { type } = options;
    switch (type) {
      case 'orbs':
        return getNumberWithCommas(val) + ' OEBS';
      case '%':
        return getNumberWithCommas(val) + '%';
      case 'bnb':
        return getNumberWithCommas(val) + ' BNB';
      case 'sol':
        return getNumberWithCommas(val) + ' SOL';
      case 'usd':
      default:
        return '$' + getNumberWithCommas(val);
    }
  }
  return '$' + getNumberWithCommas(val);
}

interface TrimmedAddressOptions {
  length: number;
}

export function getTrimmedAddress(
  val: string,
  options?: TrimmedAddressOptions,
) {
  if (options) {
    const { length } = options;
    return val.substring(0, length - 1) + '...';
  }
  return val.substring(0, 5) + '...';
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
  // or return x.localeCompare(y);
}

export function getNumberWithUnits(num: number, digits?: number) {
  const _formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return _formatter.format(num);
  // const lookup = [
  //   { value: 1, symbol: '' },
  //   { value: 1e3, symbol: 'k' },
  //   { value: 1e6, symbol: 'M' },
  //   { value: 1e9, symbol: 'G' },
  //   { value: 1e12, symbol: 'T' },
  //   { value: 1e15, symbol: 'P' },
  //   { value: 1e18, symbol: 'E' },
  // ];
  // const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  // const item = lookup
  //   .slice()
  //   .reverse()
  //   .find(function (item) {
  //     return num >= item.value;
  //   });
  // return item
  //   ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
  //   : '0';
}
