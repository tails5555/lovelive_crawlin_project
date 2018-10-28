import React from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import { CharacterSearchView, RecentlyCardListView } from '../component';

class IndexViewContainer extends React.Component {
    render() {
        const styles = {
            fontFamily: 'Menlo-Regular, Menlo, monospace',
            fontSize: 14,
            lineHeight: '10px',
            color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }
    
        return (
            <Parallax ref={ref => this.parallax = ref} pages={3} horizontal scrolling={false}>
                <ParallaxLayer offset={0}>
                    <CharacterSearchView handleClickLeft={() => this.parallax.scrollTo(2)} handleClickRight={() => this.parallax.scrollTo(1)}/>
                </ParallaxLayer>

                <ParallaxLayer offset={1}>
                    <RecentlyCardListView handleClickLeft={() => this.parallax.scrollTo(0)} handleClickRight={() => this.parallax.scrollTo(2)} />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    onClick={() => this.parallax.scrollTo(0)} style={styles}>
                    The end.
                </ParallaxLayer>
            </Parallax>
        )
    }
}

export default IndexViewContainer;