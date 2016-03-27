exports.seed = function(knex, Promise) {
  return Promise.all([
    // Deletes ALL existing entries
    knex('books').del()
  ]).then(function() {
    // Inserts seed entries
    return Promise.all([
      knex('books').insert({
        title: 'Python In A Nutshell',
        genre: 'Python',
        description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.',
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'Learning React Native',
        genre: 'JavaScript',
        description: 'Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you’ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You’ll also discover how to access platform features such as the camera, user location, and local storage.',
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/learning_react_native.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'You Don\'t Know JS',
        genre: 'JavaScript',
        description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the ""You Don’t Know JS"" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.',
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/es6_and_beyond.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'Algorithms in a Nutshell',
        genre: 'Computer Science',
        description: 'Creating robust software requires the use of efficient algorithms, but programmers seldom think about them until a problem occurs. This updated edition of Algorithms in a Nutshell describes a large number of existing algorithms for solving a variety of problems, and helps you select and implement the right algorithm for your needs—with just enough math to let you understand and analyze algorithm performance.',
        cover_url: 'http://akamaicovers.oreilly.com/images/0636920032885/lrg.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'The Ruby Programming Language',
        genre: 'Ruby',
        description: 'The Ruby Programming Language documents the Ruby language definitively but without the formality of a language specification. It is written for experienced programmers who are new to Ruby, and for current Ruby programmers who want to challenge their understanding and increase their mastery of the language.',
        cover_url: 'http://akamaicovers.oreilly.com/images/9780596516178/lrg.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'Head First Ruby',
        genre: 'Ruby',
        description: 'What’s all the buzz about this Ruby language? Is it right for you? Well, ask yourself: are you tired of all those extra declarations, keywords, and compilation steps in your other language? Do you want to be a more productive programmer? Then you’ll love Ruby. With this unique hands-on learning experience, you’ll discover how Ruby takes care of all the details for you, so you can simply have fun and get more done with less code.',
        cover_url: 'http://akamaicovers.oreilly.com/images/9780596803995/lrg.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'AngularJS: Up and Running',
        genre: 'JavaScript',
        description: 'If you want to get started with AngularJS, either as a side project, an additional tool, or for your main work, this practical guide teaches you how to use this meta-framework step-by-step, from the basics to advanced concepts. By the end of the book, you’ll understand how to develop a large, maintainable, and performant application with AngularJS.',
        cover_url: 'http://akamaicovers.oreilly.com/images/0636920033486/lrg.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'Web Development with Node and Express',
        genre: 'JavaScript',
        description: 'Learn how to build dynamic web applications with Express, a key component of the Node/JavaScript development stack. In this hands-on guide, author Ethan Brown teaches you the fundamentals through the development of a fictional application that exposes a public website and a RESTful API. You’ll also learn web architecture best practices to help you build single-page, multi-page, and hybrid web apps with Express.',
        cover_url: 'http://akamaicovers.oreilly.com/images/0636920032977/lrg.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'Think Java',
        genre: 'Java',
        description: 'Think Java is appropriate as a textbook in an introductory college or high school class. The book is currently in use at several colleges, universities, and high schools. It’s appropriate for people learning Java as a first language, including students learning on their own and professionals who are retraining.',
        cover_url: 'http://akamaicovers.oreilly.com/images/0636920041610/rc_lrg.jpg'
      }).returning('*'),
      knex('books').insert({
        title: 'Lightweight Django',
        genre: 'Python',
        description: 'How can you take advantage of the Django framework to integrate complex client-side interactions and real-time features into your web applications? Through a series of rapid application development projects, this hands-on book shows experienced Django developers how to include REST APIs, WebSockets, and client-side MVC frameworks such as Backbone.js into new or existing projects.',
        cover_url: 'http://akamaicovers.oreilly.com/images/0636920032502/lrg.jpg'
      }).returning('*')
  ]);
  }).then(function(books){

    var bookInfo = books.map(function(obj) {
        return {
          id :obj[0].id,
          title: obj[0].title
        };
    });

    return Promise.all(bookInfo.map(function(obj){
      return updateAuthor(obj.id, obj.title, knex, Promise);
    }));

  });
};

function updateAuthor(id, title, knex, Promise) {
  return new Promise(function(resolve, reject){
    knex('authors')
    .update({
      book_id: parseInt(id),
    })
    .where({
      book_title: title
    })
    .then(function(){
      resolve();
    });
  });
}