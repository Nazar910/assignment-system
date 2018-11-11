import React from 'react';

let title = '';
let description = '';
let status = '';

const STATUSES = [
    'todo',
    'in_progress',
    'done',
    'closed'
];
class EditableAssignmentItemView extends React.Component {
    componentDidMount() {
        title.value = this.props.title;
        description.value = this.props.description;
        status.value = this.props.status;
    }
    valid() {
        return title.value.trim()
            && description.value.trim()
            && status.value.trim();
    }
    async handleSubmit(e) {
        e.preventDefault();
        if (!this.valid()) {
            return;
        }
        await this.props.update({
            title: title.value.trim(),
            description: description.value.trim(),
            status: status.value.trim()
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input ref={node => { title = node }}/><br/>
                <textarea ref={node => { description = node }}/>
                <select ref={ node => { status = node } }>
                    {
                        STATUSES.map(s => <option key={s} value={s}>{s}</option>)
                    }
                </select>
                <button>Save</button>
            </form>
        )
    }
}

export default EditableAssignmentItemView;
