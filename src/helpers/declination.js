export default function declination(value, declinations, show = true) {
  let num = value % 100;
  if (num > 19) {
    num %= 10;
  }

  switch (num) {
    case 1:
      return show ? `${value} ${declinations[0]}` : declinations[0];
    case 2:
    case 3:
    case 4:
      return show ? `${value} ${declinations[1]}` : declinations[1];
    default:
      return show ? `${value} ${declinations[2]}` : declinations[2];
  }
}
