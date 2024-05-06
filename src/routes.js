const { addBookHandler, 
     getAllBooksHandler, 
     getSpecifiedBookHandler, 
     editSpecifiedBookHandler, 
     deleteSpecifiedBookHandler,} = require('./handler')

const routes = [
     {
          method: 'POST',
          path: '/books',
          handler: addBookHandler
     },
     {
          method: 'GET',
          path: '/books',
          handler: getAllBooksHandler
     },
     {
          method: 'GET',
          path: '/books/{bookId}',
          handler: getSpecifiedBookHandler
     },
     {
          method: 'PUT',
          path: '/books/{bookId}',
          handler: editSpecifiedBookHandler
     },
     {
          method: 'DELETE',
          path: '/books/{bookId}',
          handler: deleteSpecifiedBookHandler
     },

]

module.exports = routes;