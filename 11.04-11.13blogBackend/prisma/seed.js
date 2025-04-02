const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const category = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
    categories.push(category);
  }

  // Create Posts
  const posts = [];
  for (let i = 0; i < 20; i++) {
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(2),
        published: faker.datatype.boolean(),
        authorName: faker.name.fullName(),
        avatarURL: faker.image.avatar(),
        categoryId: faker.helpers.arrayElement(categories).id,
      },
    });
    posts.push(post);
  }

  // Create Comments
  for (let i = 0; i < 50; i++) {
    await prisma.comment.create({
      data: {
        authorName: faker.name.fullName(),
        content: faker.lorem.sentences(2),
        postId: faker.helpers.arrayElement(posts).id,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });