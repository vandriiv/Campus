import React, {Component} from 'react';
import LectorDetail from '../../components/lector-detail';
import Spinner from '../../../spinner/';
import {Row,Col} from 'reactstrap';
import withCampusService from '../../../hoc/with-campus-service';

class LectorDetailPage extends Component{
    state = {
        lector:null,
        loading:true
    };

    componentDidMount(){
        this.fetchLector();
    }

    fetchLector(){
        const {id} = this.props.match.params;

        this.props.campusService
            .getLector(id)
            .then((lector)=>{
                this.setState({
                    lector:lector,
                    loading:false
                });
            });
    }

    render(){
        const {lector, loading} = this.state;

        return (<Row>
            <Col xs={12}>
                {loading?<Spinner/>:<LectorDetail lector={lector}/>}
            </Col>
        </Row>)
    }
}

export default withCampusService(LectorDetailPage);