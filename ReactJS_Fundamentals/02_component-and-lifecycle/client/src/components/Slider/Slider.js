import React from 'react';
import fetcher from '../../fetcher';
import '../../App.css';

const IMAGE_URL = '/episodePreview/';

export default class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: null,
            id: null
        }
    }

    fetchEpisode = id => fetcher.get(IMAGE_URL + id, data => this.setState(data));

    otherEpisode = id => fetcher.get(IMAGE_URL + id, data => this.setState(data));

    componentDidMount = () => {
        this.fetchEpisode(0);
    }

    render = () => (
        <section id="slider">
            <img
                className="button"
                src="/left.png"
                title="previous"
                alt="nav"
                onClick={() => this.otherEpisode(this.state.id - 1)} />
            <div className="image-container">
                <img src={this.state.url} alt="episode" />
            </div>
            <img 
            className="button" 
            src="/right.png" 
            title="next" 
            alt="nav" 
            onClick={() => this.otherEpisode(this.state.id + 1)}/>
        </section>
    );
}