export {
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescription as RTCSessionDescriptionType, //   @ts-ignore
} from "@twilio/webrtc";
//   @ts-ignore
import { getUserMedia } from "@twilio/webrtc";
import { Dimensions } from "react-native";

export const mediaDevices = {
  getUserMedia: async (props) => {
    return getUserMedia();
  },
  enumerateDevices: async () => {
    const res = await getUserMedia();
    const arr = new Array<any>();
    arr.push(res);
    return arr;
  },
};

export const toURL = (stream: any) => {
  return stream;
};

interface RTCViewShimProps {
  streamURL: any;
  style: any;
  objectFit: any;
  mirror: any;
}

export const RTCView = ({ streamURL, style }: RTCViewShimProps) => {
  return (
    <video
      style={style}
      ref={(r) => {
        if (r) {
          r.srcObject = streamURL;
        }
      }}
      // width={Dimensions.get("window").width}
      // height={Dimensions.get("window").height}
      autoPlay
      playsInline
      muted
    />
  );
};
