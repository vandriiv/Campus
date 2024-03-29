import React, { Component } from 'react';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import TableActions from '../../../common/table-actions';

export default class GroupsList extends Component {
    constructor(props){
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    mapGroups(groups) {
       return groups.map((item, idx) =>
            this.mapGroup(item, idx));
    };

    onDelete(id){
        this.props.onDelete(id);
    }

    mapGroup(group, idx) {
        return (<tr key={group.id} >
            <td>{idx + 1}</td>
            <td><Link to={`/groups/${group.id}`}>{group.id}</Link></td>
            <td>{group.name}</td>
            <td>{group.specialityCode}</td>
            <td>{group.educationalDegreeName}</td>
            <td>{group.year}</td>
            <td>{group.studentsCount}</td>
            <td>
                <TableActions toEdit={`/groups/edit/${group.id}`} onDelete={()=>this.onDelete(group.id)}/>                
            </td>
        </tr>);
    }

    render() {        
        const { groups } = this.props;        

        return (<Table hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Speciality code</th>
                    <th>Educational degree</th>
                    <th>Year</th>
                    <th>Students count</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.mapGroups(groups)}
            </tbody>
        </Table>)
    }
};