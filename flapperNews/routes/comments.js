var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec( function (err, post) {
		if (err) 		{ return next(err); };
		if (!post)		{ return next( new Error( "can't find post") );}

		req.post = post;

		return next();
	})
});

router.param('comment', function (req, res, next, commentId) {
	var query = Comment.findById(commentId);

	query.exec( function (err, comment) {
		if (err) 		{ return next(err); };
		if (!comment) 	{ return next( new Error( "can't find comment"));};

		req.comment = comment;

		return next();
	})
})

router.get( '/posts/:post/comments', function(req, res, next) {
	res.json(req.post.comments);
});

router.get( '/posts/:post/comments/:comment', function(req, res, next) {
	res.json( req.comment );
});

router.post( '/posts/:post/comments', function(req, res, next ) {
	var comment = new Comment(req.body);
	comment.post = req.post;

	comment.save( function(err, comment) {
		if (err) { return next(err); };

		req.post.comments.push( comment);

		req.post.save( function(err, post) {
			if (err) { return next(err);};

			res.json( comment);
		});

	})
});

router.put( '/posts/:post/comments/:comment/upvote', function(req, res, next ) {
	req.comment.upvotes += 1;

	req.comment.save( function(err, comment) {
		if (err) { return next(err); };
		res.json( req.comment );
	});
});

module.exports = router;