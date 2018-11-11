import React from 'react';
import AssignmentList from './list';
import AssignmentsHeader from './header';
import { getAssignments, getAssignmentById, createAssignment, updateAssignmentById } from '../api';

class AssignmentsPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            assignments: []
        };
    }

    async componentDidMount() {
        const assignments = await getAssignments();
        this.setState({
            assignments
        });
    }

    async create(data) {
        const { _id } = await createAssignment(data);
        const assignment = await getAssignmentById(_id);
        const { assignments } = this.state;
        assignments.push(assignment);
        this.setState({
            assignments
        });
    }

    async update(id, data) {
        await updateAssignmentById(id, data);
        const assignment = await getAssignmentById(id);
        const { assignments } = this.state;
        this.setState({
            assignments: assignments.map(a => a._id === id ? assignment : a)
        });
    }

    render() {
        return (
            <div>
                <AssignmentsHeader addAssignment={this.create.bind(this)}/>
                <AssignmentList assignments={this.state.assignments} update={this.update.bind(this)}/>
            </div>
        )
    }
}

export default AssignmentsPage;
