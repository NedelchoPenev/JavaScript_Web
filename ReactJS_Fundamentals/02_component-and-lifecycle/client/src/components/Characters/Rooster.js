import React from 'react';

export default class Rooster extends React.Component {
    render = () => {
        const images = this.props.images.map(i => (
            <img src={i.url} alt="RosterImage" key={i.id} onClick={() => this.props.select(i.id)} />
        ));

        return (
            <section id="roster">
                {images}
            </section>
        )
    }
}