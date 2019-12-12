import React, {Component} from 'react';
import EditLectorSubjectForm from '../../components/edit-lector-subject-form';
import Spinner from '../../../spinner';
import {Row,Col} from 'reactstrap';
import withCampusService from '../../../hoc/with-campus-service';

class EditLectorSubjectPage extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    state={
        lectorSubject:null,
        lectors:[],
        subjects:[],
        lessonTypes:[],
        loading:true
    };

    componentDidMount(){
        this.fetchData();
    }

    fetchData() {
        const {id} = this.props.match.params;
        const {campusService} = this.props;

        Promise.all([
            campusService.getLectorSubject(id),            
            campusService.getAllLectors(),
            campusService.getAllSubjects(),
            campusService.getLessonTypes(),
        ])
        .then(([lectorSubject, {lectors},{subjects},{items}])=>{
            this.setState({
                lectorSubject: lectorSubject,
                lectors:lectors,
                subjects:subjects,
                lessonTypes:items,
                loading:false
            });
        });
    }

    onSubmit(lectorSubject){
        this.props.campusService.updateLectorSubject(lectorSubject);
    }

    render(){
        const {lectors, subjects, lessonTypes, lectorSubject, loading} = this.state;

        return (<Row>
            <Col xs={12}>
                {loading?<Spinner/>:<EditLectorSubjectForm lectorSubject={lectorSubject} lectors={lectors} 
                subjects={subjects} lessonTypes={lessonTypes} onSubmit={this.onSubmit}/>}
            </Col>
        </Row>)
    }
}

export default withCampusService(EditLectorSubjectPage);