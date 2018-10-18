import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function makeQueryStringAboutPage(qs, pg){
    let clientQueryModel = queryString.parse(qs);
    clientQueryModel = {
        ...clientQueryModel, pg : pg
    }
    return '?' + queryString.stringify(clientQueryModel);
}

class CardPagination extends React.Component {
    constructor(props){
        super(props);
        this.state = { count : 0, pageBase : 0 };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { count, pageBase } = nextProps;
        if(count !== prevState.count || pageBase !== prevState.pageBase){
            return {
                count : count,
                pageBase : pageBase
            };
        }
        return null;
    }

    render(){
        let pageItem = null;

        const { count, pageBase } = this.state;
        const { search } = this.props.history.location;
        const query = queryString.parse(search);
        const pageNums = [];
        const barCount = 10;
        const pageCount = Math.ceil(count / pageBase);
        const base = Math.floor((query.pg - 1) / 10) * 10;

        if(base > 0)
            pageNums.push(base);
        
        for(var k = 1; k <= barCount; k++){
            let n = base + k;
            if(n > pageCount) break;
            pageNums.push(n);
        }

        let next = base + 11;
        if(next <= pageCount)
            pageNums.push(next);

        pageItem = pageNums.map((number, idx) => (
            (number > base && number < base + 11) ?
                number === query.pg * 1 ?
                    <PaginationItem active key={`paginate_item_${number}`}>
                        <PaginationLink href={makeQueryStringAboutPage(search, number)}>
                            {number}
                        </PaginationLink>
                    </PaginationItem> :
                    <PaginationItem key={`paginate_item_${number}`}>
                        <PaginationLink href={makeQueryStringAboutPage(search, number)}>
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                : 
                (idx === 0) ?
                    <PaginationItem key={`paginate_item_${number}`}>
                        <PaginationLink previous href={makeQueryStringAboutPage(search, base)} />
                    </PaginationItem>
                    : 
                    <PaginationItem key={`paginate_item_${number}`}>
                        <PaginationLink next href={makeQueryStringAboutPage(search, next)} />
                    </PaginationItem>
        ));
        return(
            <Pagination className="pagination justify-content-center" size={ window.innerWidth < 768 ? 'sm' : 'md'}>
                {pageItem}
            </Pagination>
        )
    }
}

export default withRouter(CardPagination);