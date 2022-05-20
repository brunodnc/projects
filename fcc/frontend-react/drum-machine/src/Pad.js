import React from "react";

class Pad extends React.Component {
    // source: stackoverflow.com/questions/47686345/playing-sound-in-react-js

    audio = new Audio(this.props.audio);


    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            const { keyTrigger } = this.props
            if (e.code === `Key${keyTrigger}`) {
                this.audioPlay(e);
                console.log('apertei');
                }
            })
    }

    audioPlay = (e) => {
        const { handleClick } = this.props;
        handleClick(e);
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