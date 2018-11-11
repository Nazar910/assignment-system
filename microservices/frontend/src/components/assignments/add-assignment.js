import React from 'react';

let title = '';
let description = '';

class AddAssignment extends React.Component {
    async handleSubmit(e) {
        e.preventDefault()
        if (!title.value.trim() || !description.value.trim()) {
            return
        }
        await this.props.create({
            title: title.value,
            description: description.value
        });
        title.value = '';
        description.value = '';
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit.bind(this)}
                >
                    <input
                        ref={node => {
                            title = node
                        }}
                    /><br/>
                    <textarea
                        ref={node => {
                            description = node
                        }}
                    /><br/>
                    <button type="submit">Add Assignment</button>
                </form>
            </div>
        )
    }
}

export default AddAssignment;
