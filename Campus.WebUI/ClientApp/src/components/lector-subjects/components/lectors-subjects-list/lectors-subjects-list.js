import React, { Component } from 'react';
import { Table } from "reactstrap";
import TableActions from '../../../common/table-actions';

export default class LectorsSubjectsList extends Component {
    constructor(props){
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    mapLectorsSubjects(lectorsSubjects) {
        return lectorsSubjects.map((item, idx) =>
            this.mapLectorSubject(item, idx));
    };

    onDelete(id){
        this.props.onDelete(id);
    }

    mapLectorSubject(lectorSubject,idx) {
        return (<tr key={lectorSubject.id} >
            <td>{idx + 1}</td>
            <td>{lectorSubject.id}</td>
            <td>{lectorSubject.subjectId}</td>
            <td>{lectorSubject.subjectName}</td>
            <td>{lectorSubject.lessonTypeName}</td>
            <td>
                <TableActions toEdit={`/lectorsubject/edit/${lectorSubject.id}`} 
                onDelete={()=>this.onDelete(lectorSubject.id)}/>      
            </td>
        </tr>);
    }

    render() {
        const { lectorsSubjects } = this.props;

        return (<Table hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Subject id</th>
                    <th>Subject name</th>
                    <th>Lesson type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.mapLectorsSubjects(lectorsSubjects)}
            </tbody>
        </Table>)
    }
};