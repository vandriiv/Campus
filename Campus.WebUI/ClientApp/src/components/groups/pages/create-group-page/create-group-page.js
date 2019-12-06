import React, {Component} from 'react';
import CreateGroupForm from '../../components/create-group-form';
import Spinner from '../../../spinner';
import {Row,Col} from 'reactstrap';
import withCampusService from '../../../hoc/with-campus-service';

class CreateGroupPage extends Component{
    state={
        specialities:[],
        educationalDegrees:[],
        loading:true
    };

    componentDidMount(){
        this.fetchData();
    }

    fetchData() {
        const {campusService} = this.props;

        Promise.all([            
            campusService.getAllSpecialities(),
            campusService.getEducationalDegrees()
        ])
        .then(([specialities,educationalDegrees])=>{
            this.setState({
                specialities:specialities.specialities,               
                educationalDegrees: educationalDegrees.items,
                loading:false
            });
        });
    }

    render(){
        const {educationalDegrees, specialities, loading} = this.state;

        return (<Row>
            <Col xs={12}>
                {loading?<Spinner/>:<CreateGroupForm educationalDegrees = {educationalDegrees} specialities={specialities}/>}
            </Col>
        </Row>)
    }
}

export default withCampusService(CreateGroupPage);