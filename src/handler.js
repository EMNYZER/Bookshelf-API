const { nanoid } = require('nanoid');
const books = require("./books");

const addBookHandler = (request, h) => {
     const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
     const id =  nanoid(16);

     if (!name) {
          const response = h.response({
               status: "fail",
               message: "Gagal menambahkan buku. Mohon isi nama buku"
          });
          response.code(400);
          return response
     }

     if (readPage > pageCount) {
          const response = h.response({
               status: "fail",
               message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
          });
          response.code(400);
          return response
     }

     const finished = readPage === pageCount;
     const insertedAt = new Date().toISOString();
     const updatedAt = insertedAt;
     
     const newBook = {
          id,
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          reading,
          finished,
          insertedAt,
          updatedAt          
     };

     books.push(newBook);
     
     const isSuccess = books.filter((book) => book.id === id).length > 0;
     

     if (isSuccess) {
          const response = h.response({
               status: "success",
               message: "Buku berhasil ditambahkan",
               data: {
                    bookId: id
               },
          });
          response.code(201);
          return response
     }

     const response = h.response({
          status: 'fail',
          message: 'Buku gagal ditambahkan',
     });
     response.code(500);
     return response;
};

const getAllBooksHandler = (request,h) => {
     const { reading, finished, name } = request.query;
     if (reading != undefined) {
          if (reading == 1) {
               let filteredBooks = books.filter((book) => book.reading == true);
               const modifiedBooks = filteredBooks.map(book => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
               }));
               return h.response({
                    status: 'success',
                    message: 'reading books',
                    data: {
                         books: modifiedBooks,
                    },
               });      
          }
          if (reading == 0) {
               let filteredBooks = books.filter((book) => book.reading == false);
               const modifiedBooks = filteredBooks.map(book => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
               }));
               return h.response({
                    status: 'success',
                    message: 'unreading books',
                    data: {
                         books: modifiedBooks,
                    },
               });      
          }
     }
     if (finished != undefined) {
          if (finished == 1) {
               let filteredBooks = books.filter((book) => book.finished == true);
               const modifiedBooks = filteredBooks.map(book => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
               }));
               return h.response({
                    status: 'success',
                    message: 'finished books',
                    data: {
                         books: modifiedBooks,
                    },
               });      
          }
          if (finished == 0) {
               let filteredBooks = books.filter((book) => book.finished == false);
               const modifiedBooks = filteredBooks.map(book => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
               }));
               return h.response({
                    status: 'success',
                    message: 'unfinished books',
                    data: {
                         books: modifiedBooks,
                    },
               });      
          }
     }
     if (name != undefined) {
          const lowercase = name.toLowerCase();
          const filteredBooks = books.filter((book) => book.name.toLowerCase() == lowercase);
          console.log(filteredBooks)
          const modifiedBooks = filteredBooks.map(book => ({
               id: book.id,
               name: book.name,
               publisher: book.publisher,
          }));
          return h.response({
               status: 'success',
               message: 'search books',
               data: {
                    books: modifiedBooks,
               },
          });      
     }
     const modifiedBooks = books.map(book => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
     }));

     return {
          status: "success",
          data: {
               books: modifiedBooks
          },
     };
};

const getSpecifiedBookHandler = (request, h) => {
     const { bookId } = request.params;
     const book = books.find((b) => b.id === bookId);
     if (book) {
          return {
               status: "success",
               data: {
                    book,
               },
          };

     }

     const response = h.response({
          status: "fail",
          message: "Buku tidak ditemukan"
      });
     response.code(404);
     return response;
};

const editSpecifiedBookHandler = (request, h) => {
     const { bookId } = request.params;
     const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
     const updatedAt = new Date().toISOString();
     const index = books.findIndex((book) => book.id === bookId);

     
     if (!name) {
          const response = h.response({
               status: "fail",
               message: "Gagal memperbarui buku. Mohon isi nama buku"
           });
          response.code(400);
          return response;
     }

     if (pageCount < readPage) {
          const response = h.response({
               status: "fail",
               message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
           });
          response.code(400);
          return response;
     }
     
     if (index !== -1) {
          books[index] = { 
               ...books[index], 
               name, 
               year, 
               author, 
               summary, 
               publisher, 
               pageCount, 
               readPage,
               reading,
               updatedAt,
          };

          const response = h.response({
               status: "success",
               message: "Buku berhasil diperbarui"
           });
           response.code(200)
           return response
     }
     
     const response = h.response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan"
      });
     response.code(404);
     return response;

};

const deleteSpecifiedBookHandler = (request, h) => {
     const { bookId } = request.params;
     const index = books.findIndex((book) => book.id === bookId);

     if (index !== -1) {
          books.splice(index, 1);

          const response = h.response({
               status: "success",
               message: "Buku berhasil dihapus"
          });
          response.code(200);
          return response;
     }

     const response = h.response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan"
     });
     response.code(404);
     return response;
};




module.exports = { addBookHandler, 
     getAllBooksHandler, 
     getSpecifiedBookHandler, 
     editSpecifiedBookHandler, 
     deleteSpecifiedBookHandler, 
};