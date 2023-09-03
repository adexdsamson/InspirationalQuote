const MAX_DIFFERENCE = 3;

/**
 * Checks if the given value is closer to the total than the threshold.
 * @param {number} value - The value to check.
 * @param {number} total - The total value.
 * @param {number} threshold - The threshold value.
 * @returns {boolean} - True if the value is closer than the threshold, false otherwise.
 */
export function isValueCloserThanThreshold(value, total, threshold) {
  if (typeof value !== 'number' || typeof total !== 'number' || typeof threshold !== 'number') {
    return false;
  }
  return (
    Math.abs(total - value) <= MAX_DIFFERENCE &&
    Math.abs(total - value) < Math.abs(total - threshold)
  );
}
