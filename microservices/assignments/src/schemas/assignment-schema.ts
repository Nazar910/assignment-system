export const PRIORITIES = {
    low: 'low',
    normal: 'normal',
    high: 'high',
    urgent: 'urgent'
};

export const Assignment = {
    type: 'object',
    required: ['title', 'author_id'],
    additionalProperties: false,
    properties: {
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        author_id: {
            type: 'string'
        },
        assignee_id: {
            type: 'string'
        },
        status: {
            type: 'string',
            default: 'todo'
        },
        priority: {
            enum: Object.values(PRIORITIES)
        }
    }
}
