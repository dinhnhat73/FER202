function double(x) {
  return x * 2;
}

function isPositive(x) {
  return x > 0;
}

export function Exercise1() {
  return (
    <>
      <h1>Hello <strong>Exercise1</strong></h1>
      <p>This is the first exercise component.</p>
      <h2>Chi tiet bai tap 1</h2>
      <p>Ham double(5): {double(5)}</p>
      <p>isPositive: {isPositive(5) ? "So duong" : "So am"}</p>
    </>
  );
}