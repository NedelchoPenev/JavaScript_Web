import React from 'react';

import Rooster from './Rooster';
import Details from './Details';
import fetcher from '../../fetcher';

const ROOSTER_ENDPOINT = '/roster';
const DETAILS_ENDPOINT = '/character/';

export default class Characters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            details: {
                id: null,
                name: null,
                url: null,
                bio: null
            }
        }
    }

    mapImages(data) {
        return {
            images: data.map(i => {
                return {
                    id: i.id,
                    url: i.url
                }
            })
        };
    };

    fetchRoster = () =>
        fetcher.get(ROOSTER_ENDPOINT, data => this.setState(this.mapImages(data)));

    fetchDetails = id =>
        fetcher.get(DETAILS_ENDPOINT + id, data => this.setState({ details: data }));

    selectCharacter = id =>
        this.fetchDetails(id);

    componentDidMount = () => this.fetchRoster();

    render = () => (
        <div>
            <Rooster images={this.state.images} select={this.selectCharacter}/>
            <Details {...this.state.details} />
        </div>
    )
}