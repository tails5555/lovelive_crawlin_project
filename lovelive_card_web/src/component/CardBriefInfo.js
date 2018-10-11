import React from 'react';

const CardBriefInfo = (props) => {
    const { 
        no, rank, icon_url_1, icon_url_2, card_title, character_name, japanese_name, property, center_effect, smile, pure, cool, active_skill, active_condition 
    } = props.info;

    const property_color = 
        property === '스마일' ? 'deeppink' :
            property === '퓨어' ? 'limegreen' : 
                property === '쿨' ? 'slateblue' : 'black';
    return (
        <tr>
            <td className="align-middle">{no}</td>
            <td className="align-middle">{rank}</td>
            <td className="align-middle">
                <div className="d-flex justify-content-around">
                    <img src={icon_url_1} className="rounded img-responsive" />
                    <img src={icon_url_2} className="rounded img-responsive" />
                </div>
            </td>
            <td className="align-middle">
                <div className="d-flex flex-column bd-highlight">
                    {
                        card_title ? <span style={{ wordBreak : 'keep-all' }}><b>{card_title}</b></span> : null
                    }
                    <span style={{ wordBreak : 'keep-all' }}>{character_name}</span>
                    <span style={{ wordBreak : 'keep-all' }}>{japanese_name}</span>
                </div>
            </td>
            <td className="align-middle">
                <span style={{ color : property_color, wordBreak : 'keep-all' }}>
                    {property}
                </span>
            </td>
            <td className="align-middle">
                <span style={{ wordBreak : 'keep-all' }}>{center_effect}</span>
            </td>
            <td className="align-middle">
                <div className="d-flex justify-content-around">
                    <span style={{ color : 'deeppink' }}>{smile}&nbsp;</span>
                    <span style={{ color : 'limegreen' }}>{pure}&nbsp;</span>
                    <span style={{ color : 'slateblue' }}>{cool}</span>
                </div> 
            </td>
            <td className="align-middle">
                <div className="d-flex flex-column bd-highlight">
                    <span style={{ wordBreak : 'keep-all' }}>{active_condition}</span>
                    <span style={{ wordBreak : 'keep-all' }}>{active_skill}</span>
                </div>
            </td>
        </tr>
    )
}

export default CardBriefInfo;
