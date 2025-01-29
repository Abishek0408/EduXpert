const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      {
        name: "IT & Software",
        subCategories: {
          create: [
            { name: "Web Development" },
            { name: "Data Science" },
            { name: "Cybersecurity" },
            { name: "Mobile App Development" },
            { name: "Game Development" },
            { name: "Software Engineering" },
            { name: "Database Administration" },
            { name: "Cloud Computing" },
            { name: "Artificial Intelligence" },
            { name: "Machine Learning" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Arts & Crafts",
        subCategories: {
          create: [
            { name: "Painting" },
            { name: "Drawing" },
            { name: "Sculpting" },
            { name: "Ceramics" },
            { name: "Knitting & Crochet" },
            { name: "Sewing & Fashion Design" },
            { name: "Jewelry Making" },
            { name: "Calligraphy & Hand Lettering" },
            { name: "Digital Art & Illustration" },
            { name: "Mixed Media" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Business",
        subCategories: {
          create: [
            { name: "E-Commerce" },
            { name: "Marketing" },
            { name: "Finance" },
            { name: "Entrepreneurship" },
            { name: "Management" },
            { name: "Sales" },
            { name: "Project Management" },
            { name: "Business Analysis" },
            { name: "Human Resources" },
            { name: "Real Estate" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Design",
        subCategories: {
          create: [
            { name: "Graphic Design" },
            { name: "3D & Animation" },
            { name: "Interior Design" },
            { name: "UX/UI Design" },
            { name: "Web Design" },
            { name: "Motion Graphics" },
            { name: "Product Design" },
            { name: "Architectural Design" },
            { name: "Fashion Design" },
            { name: "Game Design" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Health",
        subCategories: {
          create: [
            { name: "Fitness" },
            { name: "Yoga" },
            { name: "Nutrition" },
            { name: "Mental Health" },
            { name: "Meditation" },
            { name: "Personal Training" },
            { name: "Sports Science" },
            { name: "Alternative Medicine" },
            { name: "Public Health" },
            { name: "Nursing" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Personal Development",
        subCategories: {
          create: [
            { name: "Productivity" },
            { name: "Leadership" },
            { name: "Communication" },
            { name: "Time Management" },
            { name: "Stress Management" },
            { name: "Self-Esteem & Confidence" },
            { name: "Relationships" },
            { name: "Public Speaking" },
            { name: "Goal Setting" },
            { name: "Mindfulness" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Music",
        subCategories: {
          create: [
            { name: "Guitar" },
            { name: "Piano" },
            { name: "Singing" },
            { name: "Drums" },
            { name: "Bass Guitar" },
            { name: "Violin" },
            { name: "Songwriting" },
            { name: "Music Production" },
            { name: "DJing" },
            { name: "Music Theory" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Photography",
        subCategories: {
          create: [
            { name: "Portrait" },
            { name: "Landscape" },
            { name: "Street" },
            { name: "Wildlife" },
            { name: "Wedding" },
            { name: "Food" },
            { name: "Architectural" },
            { name: "Photojournalism" },
            { name: "Astrophotography" },
            { name: "Drone Photography" },
            { name: "Others" },
          ],
        },
      },
    ];

    // Check if category exists before creating
    for (const category of categories) {
      const existingCategory = await database.category.findUnique({
        where: { name: category.name },
      });

      if (!existingCategory) {
        await database.category.create({
          data: {
            name: category.name,
            subCategories: category.subCategories,
          },
          include: {
            subCategories: true,
          },
        });
        console.log(`Created category: ${category.name}`);
      } else {
        console.log(`Category ${category.name} already exists, skipping...`);
      }
    }

    // Use upsert to avoid duplicates in level creation
    const levels = [
      { name: "Beginner" },
      { name: "Intermediate" },
      { name: "Expert" },
      { name: "All levels" },
    ];

    for (const level of levels) {
      await database.level.upsert({
        where: { name: level.name },
        update: {}, // Nothing to update if it exists
        create: level, // Create new if it doesn't exist
      });
      console.log(`Upserted level: ${level.name}`);
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.log("Seeding failed", error);
  } finally {
    await database.$disconnect();
  }
}

main();
