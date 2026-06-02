export function calculateRisk(
  reading: number,
  attention: number,
  instruction: number,
  writing: number,
  numeracy: number
) {
  return (
    reading * 0.25 +
    attention * 0.20 +
    instruction * 0.15 +
    writing * 0.20 +
    numeracy * 0.20
  ) * 20;
}