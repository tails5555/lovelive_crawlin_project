import React, { Fragment } from 'react';
import axios from 'axios';
const IMAGE_SOURCE_URL = 'http://127.0.0.1:8000/card_images';

class CardPairSetView extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { pairResult : props.pairResult, pairError : props.pairError, pairImages : {} };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { pairResult, pairError } = nextProps;
        if(
            pairResult !== prevState.pairResult ||
            pairError !== prevState.pairError
        ) {
            return {
                pairResult : pairResult,
                pairError : pairError
            }
        }
        return null;
    }

    componentDidMount(){
        const { pairResult, pairError } = this.state;
        if(Array.isArray(pairError)){
            this._isMounted = true;
            this.getImagesByFilename(pairResult);
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    async getImagesByFilename(pairResult) {
        if(pairResult.length > 0)
            pairResult.map((pair, idx) => {
                axios.all([
                    axios({
                        url : `${IMAGE_SOURCE_URL}?search=${pair.primary_file}`,
                        method : 'get'
                    }),
                    axios({
                        url : `${IMAGE_SOURCE_URL}?search=${pair.secondary_file}`,
                        method : 'get'
                    })
                ]).then(
                    axios.spread((primaryRequest, secondaryRequest) => {
                        const primaryImage = primaryRequest.data;
                        const secondaryImage = secondaryRequest.data;
                        if(this._isMounted){
                            const { pairImages } = this.state;
                            let tmpImages = {
                                [`pair_image_${idx}_first`] : primaryImage.length > 0 ? primaryImage[0].img_file : null,
                                [`pair_image_${idx}_second`] : secondaryImage.length > 0 ? secondaryImage[0].img_file : null
                            }
                            let mergeObj = Object.assign(pairImages, tmpImages);
                            this.setState({
                                pairImages : mergeObj
                            });
                        }
                    })
                );
                return null;
            });
    }

    render(){
        const { pairImages } = this.state;
        const imageKeys = Object.keys(pairImages);
        const idxList = Array.from({ length : imageKeys.length / 2 }, (value, key) => key);
        let imageView = null;
        if(idxList.length > 0){
            imageView = idxList.map(idx => {
                return (
                    <div className="d-flex justify-content-center" key={`pair_view_${idx}`} style={{ marginTop : '10px', marginBottom : '10px' }}>
                    {
                        imageKeys
                            .filter(key => key.startsWith(`pair_image_${idx}`))
                            .map((imgKey, imgIdx) => 
                                <div xs={6} key={`pair_image_${idx}_${imgIdx}`}>
                                    <img key={`pair_image_${idx}_${imgIdx}`} alt={`pair_image_${idx}_${imgIdx}`} src={pairImages[imgKey]} className="img-fluid" />
                                </div>
                            )
                    }
                    </div>
                );
            })
        }
        return(
            <Fragment>
                {imageView}
            </Fragment>
        );
    }
}

export default CardPairSetView;