import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import CourseChatPage from "@/components/custom/ChatSection";

export default async function ChatPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const instructor = await clerkClient.users.getUser(course.instructorId);
  const currentUser = await clerkClient.users.getUser(userId);

  return (
    <CourseChatPage
      course={{
        id: course.id,
        title: course.title,
        instructorId: course.instructorId,
      }}
      instructor={{
        id: instructor.id,
        firstName: instructor.firstName || "",
        lastName: instructor.lastName || "",
        imageUrl: instructor.imageUrl,
      }}
      currentUser={{
        id: currentUser.id,
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        imageUrl: currentUser.imageUrl,
      }}
    />
  );
}
