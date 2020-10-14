declare module '*.svg' {
  export type SVGComponent = React.StatelessComponent<React.SVGAttributes<SVGElement>>;

  export const ReactComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>;

  // eslint-disable-next-line import/no-default-export
  export default ReactComponent;
}
