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
        assignees: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        priority: {
            enum: Object.values(PRIORITIES)
        }
    }
}
