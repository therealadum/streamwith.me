interface WebViewProps {
  source: any;
  style: any;
}
export const WebView = ({ source, style }: WebViewProps) => {
  return <iframe style={style} src={source.uri} />;
};
