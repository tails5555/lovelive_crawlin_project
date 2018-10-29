import React from 'react';
import { withRouter } from 'react-router-dom';

class SlideAnotherView extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location !== prevProps.location) {
            window.scroll({
                top : 0,
                left : 0,
                behavior: "smooth"
            });
        }
    }

    render(){
        const { children } = this.props;
        return children;
    }
}

export default withRouter(SlideAnotherView);