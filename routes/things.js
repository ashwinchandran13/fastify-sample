
var fs = require('fs');
var path = require('path');
const stream = fs.createReadStream(path.resolve('./redoc.html'));


const { 
    getItem, 
    getItems, 
    addItem, 
    deleteItem, 
    updateItem 
} = require('../controllers/items')
// Item schema
 const Item = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'}
    }
 }

// Options for get all items
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            }
        }
    },
    handler: getItems
}

const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItem
}

const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            }
        },
        response: {
            201: Item
        }
    },
    handler: addItem
}

const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    },
    handler: deleteItem
}

const updateItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            }
        },
        response: {
            201: Item
        }
    },
    handler: updateItem
}

function itemRoutes (fastify, options, done) { // index
    fastify.get('/api/docs', 
    (req, rep) => {
        // console.log(req);
        
        rep.type('text/html').send(stream);
    })

    // Get all items
    fastify.get('/things', getItemsOpts)
    
    // Get single items
    fastify.get('/things/:id', getItemOpts)

    // Add item
    fastify.post('/things', postItemOpts)

    // Delete item
    fastify.delete('/things/:id', deleteItemOpts)

    // Update item
    fastify.put('/things/:id', updateItemOpts)

    done()
}

module.exports = itemRoutes;