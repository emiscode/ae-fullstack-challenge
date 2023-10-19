import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content, author } = req.body;

  const session = {
    user: {
        email: 'emiscode@gmail.com'
    }
  }

  let result;

  if (author) {
    console.log('com author');
    result = await prisma.post.create({
        data: {
          title: title,
          content: content,
          author: { connect: { email: author } },
        },
      });
  } else {
    console.log('sem author');
    result = await prisma.post.create({
        data: {
          title: title,
          content: content,
        },
      });
  }
  
  res.json(result);
}