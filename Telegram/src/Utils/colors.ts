export const Color = {
  Moon: 'MOON',
  Saturn: 'SATURN',
  Uranus: 'URANUS',
  Neptune: 'NEPTUNE',
  Sun: 'SUN',
  Mercury: 'MERCURY',
  MercurySecondary: 'MERCURY_SECONDARY',
  MercuryTertiary: 'MERCURY_TERTIARY',
  Venus: 'VENUS',
  VenusSecondary: 'VENUS_SECONDARY',
  VenusTertiary: 'VENUS_TERTIARY',
  Earth: 'EARTH',
  EarthSecondary: 'EARTH_SECONDARY',
  EarthTertiary: 'EARTH_TERTIARY',
  Mars: 'MARS',
  Jupiter: 'JUPITER',
  Pluto: 'PLUTO',
  Proxima: 'PROXIMA',
} as const;

export type Color = typeof Color[keyof typeof Color];

export const colors = {
  // Grayscale
  [Color.Moon]: { HEX: '#000', RGB: [0, 0, 0] },
  [Color.Saturn]: { HEX: '#242424', RGB: [27, 27, 27] },
  [Color.Uranus]: { HEX: '#343434', RGB: [39, 39, 39] },
  [Color.Neptune]: { HEX: '#5d5d5d', RGB: [75, 75, 75] },
  [Color.Sun]: { HEX: '#fff', RGB: [255, 255, 255] },
  // Mercury
  [Color.Mercury]: { HEX: '#FF9826', RGB: [253, 133, 30] },
  [Color.MercurySecondary]: { HEX: '#AA5211', RGB: [152, 63, 16] },
  [Color.MercuryTertiary]: { HEX: '#FFC981', RGB: [1254, 190, 110] },
  // Venus
  [Color.Venus]: { HEX: '#00B10A', RGB: [22, 166, 12] },
  [Color.VenusSecondary]: { HEX: '#009422', RGB: [17, 134, 26] },
  [Color.VenusTertiary]: { HEX: '#00FF0E', RGB: [34, 255, 15] },
  // Earth
  [Color.Earth]: { HEX: '#ff0900', RGB: [251, 0, 6] },
  [Color.EarthSecondary]: { HEX: '#ff563f', RGB: [253, 62, 49] },
  [Color.EarthTertiary]: { HEX: '#db000a', RGB: [208, 0, 12] },
  // Extra
  [Color.Mars]: { HEX: '#408dff', RGB: [51, 117, 255] },
  [Color.Jupiter]: { HEX: '#ff0097', RGB: [251, 0, 133] },
  [Color.Pluto]: { HEX: '#dedede', RGB: [214, 214, 214] },
  [Color.Proxima]: { HEX: '#999', RGB: [135, 135, 135] },
} as const;

export const Opacity = {
  Betelgeuse: 'BETELGEUSE',
  Sirius: 'SIRIUS',
  Canopus: 'CANOPUS',
  AlphaCenturi: 'ALPHA_CENTURI',
  Arcturis: 'ARCTURIS',
  Vega: 'VEGA',
} as const;

export type Opacity = typeof Opacity[keyof typeof Opacity];

export const opacities = {
  [Opacity.Betelgeuse]: 0.7,
  [Opacity.Sirius]: 0.6,
  [Opacity.Canopus]: 0.5,
  [Opacity.AlphaCenturi]: 0.3,
  [Opacity.Arcturis]: 0.2,
  [Opacity.Vega]: 1,
} as const;

// eslint-disable-next-line arrow-body-style
export const rgba = (color: Color, opacity: Opacity = Opacity.Vega): string => {
  return `rgba(${colors[color].RGB.join(', ')}, ${opacities[opacity]})`;
};
