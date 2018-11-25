import React from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import { CharacterSearchView, RecentlyCardListView, RecentlySongListView } from '../component';

class IndexViewContainer extends React.Component {
    render() {
        return (
            <Parallax ref={ref => this.parallax = ref} pages={3} horizontal scrolling={false}>
                <ParallaxLayer offset={0}>
                    <CharacterSearchView handleClickLeft={() => this.parallax.scrollTo(2)} handleClickRight={() => this.parallax.scrollTo(1)}/>
                </ParallaxLayer>

                <ParallaxLayer offset={1}>
                    <RecentlyCardListView handleClickLeft={() => this.parallax.scrollTo(0)} handleClickRight={() => this.parallax.scrollTo(2)} />
                </ParallaxLayer>

                <ParallaxLayer offset={2}>
                    <RecentlySongListView handleClickLeft={() => this.parallax.scrollTo(1)} handleClickRight={() => this.parallax.scrollTo(0)} />
                </ParallaxLayer>
            </Parallax>
        )
    }
}

export default IndexViewContainer;