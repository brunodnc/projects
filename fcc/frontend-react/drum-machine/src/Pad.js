import React from "react";

class Pad extends React.Component {
    
    componentDidMount() {
    
    }

    render() {
    const { keyButton, audio, handleClick } = this.props;

        return (
            <div 
            className="drum-pad" 
            id={audio} 
            onClick={handleClick} 
            onKeyDown={(e) => {
                if (e.key === keyButton) {
                    this.props.handleClick(e);
                    }
                }
            }>
                {keyButton}
                <audio src={audio} id={keyButton}></audio>
            </div>
            
        )
    }
}

export default Pad;