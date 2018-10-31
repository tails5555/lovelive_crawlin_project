import React, {Fragment} from 'react';

const TitleRibbon = (props) => {
    const { title } = props;
    return(
        <Fragment>
            <h3 className="text-left" style={{ color : "deeppink" }}><i className="fas fa-star" /> {title}</h3>
            <hr style={{ borderTop : '3px dotted deeppink' }} />
        </Fragment>
    )
}

export default TitleRibbon;