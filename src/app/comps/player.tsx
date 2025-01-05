"use client";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Image from "next/image";
interface Props {
  audioUrl: string;
  thumbUrl: string;
  handlePlay: () => void;
  handlePause: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
}

const Player: React.FC<Props> = ({
  audioUrl,
  thumbUrl,
  handlePlay,
  handlePause,
  handleNext,
  handlePrevious,
}) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src={thumbUrl} width={400} height={400} alt="image"></Image>
      </div>
      <AudioPlayer
        src={audioUrl}
        onPlay={handlePlay}
        onPause={handlePause}
        onClickNext={handleNext}
        onClickPrevious={handlePrevious}
        autoPlay={false}
        showSkipControls={true}
        progressJumpSteps={{ backward: 5000, forward: 5000 }}
        className="my-custom-audio-player"
      />
    </div>
  );
};
export default Player;
