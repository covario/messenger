import { colors, rgba, Color, opacities, Opacity } from './colors';

describe('rgba', () => {
  describe('when calling the rgba function without an opacity argument', () => {
    Object.entries(colors).map(([key, color]) => {
      it(`should return the correct rgb value for "${key}"`, () => {
        expect(rgba(key as Color)).toBe(`rgba(${color.RGB.join(', ')}, 1)`);
      });

      return undefined;
    });
  });

  describe('when calling the rgba function with an opacity argument', () => {
    Object.entries(opacities).map(([key, opacity]) => {
      it(`should return the correct rgb value with opacity for "${key}"`, () => {
        expect(rgba(Color.Sun, key as Opacity)).toBe(
          `rgba(${colors[Color.Sun].RGB.join(', ')}, ${opacity})`,
        );
      });

      return undefined;
    });
  });
});
