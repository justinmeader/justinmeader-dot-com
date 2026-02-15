export default function round(number, precision = 10) {
	return Math.round(precision * number) / precision;
}
