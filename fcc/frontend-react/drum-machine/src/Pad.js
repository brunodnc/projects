import React from "react";

class Pad extends React.Component {
    // source: stackoverflow.com/questions/47686345/playing-sound-in-react-js

    
    keyd = this.props.keyTrigger
    audio = document.getElementById(this.keyd)

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            const { keyTrigger, handleClick } = this.props
            if (e.code === `Key${keyTrigger}`) {
                this.audio.play();
                handleClick(this.keyd);
                }
            })
    }

    audioPlay = (e) => {
        const { handleClick } = this.props;
        handleClick(this.keyd);
        this.audio.play();
    }

    render() {
    const { keyTrigger, audio, } = this.props;

        return (
            <div
            className="drum-pad" 
            id={audio} 
            onClick={this.audioPlay} >
                {keyTrigger}
                <audio src={audio} id={keyTrigger}></audio>
            </div>
            
        )
    }
}

export default Pad;