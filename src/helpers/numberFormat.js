export default function numberFormat(number, decimals, decimalsPoint, thousandSeparator) {
  function toFixedFix(n, cropTo) {
    const k = 10 ** cropTo;
    return `${(Math.round(n * k) / k).toFixed(cropTo)}`;
  }

  const tempValue = (`${number}`).replace(/[^\d+\-Ee.]/g, '');
  const n = !Number.isFinite(+tempValue) ? 0 : +tempValue;
  const cropTo = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = (typeof thousandSeparator === 'undefined') ? ',' : thousandSeparator;
  const dec = (typeof decimalsPoint === 'undefined') ? '.' : decimalsPoint;
  let s = '';

  s = (cropTo ? toFixedFix(n, cropTo) : `${Math.round(n)}`).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < cropTo) {
    s[1] = s[1] || '';
    s[1] += new Array(cropTo - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
