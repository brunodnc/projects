import React from "react";

class Pad extends React.Component {
    // source: stackoverflow.com/questions/47686345/playing-sound-in-react-js

    audio = new Audio(this.props.audio);

    audioPlay = (e) => {
        const { handleClick } = this.props;
        handleClick(e);
        this.audio.play();
    }

    render() {
    const { keyTrigger, keyCode, audio, } = this.props;

        return (
            <div
            className="drum-pad" 
            id={audio} 
            onClick={this.audioPlay} 
            onKeyDown={(e) => {
                if (e.key === keyTrigger) { // should i use key or keyCode?
                    this.audioPlay(e);
                    console.log('apertei');
                    }
                }
            }>
                {keyTrigger}
                <audio src={audio} id={keyTrigger}></audio>
            </div>
            
        )
    }
}

export default Pad;