interface WebViewProps {
  source: any;
  style: any;
  mediaPlaybackRequiresUserAction: any;
  userAgent?: any;
  allowsInlineMediaPlayback: any;
  key?: any;
  pointerEvents?: any;
  allowsFullscreenVideo?: any;
}
export const WebView = ({
  source,
  style,
  key,
  pointerEvents,
}: WebViewProps) => {
  return (
    <iframe key={key} style={{ ...style, pointerEvents }} src={source.uri} />
  );
};
