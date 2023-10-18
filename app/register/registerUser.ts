"use server";
import { db } from "@/app/db";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

export const registerUser = async (prevState: any, formData: FormData) => {
  try {
    const schema = z.object({
      email: z.string().min(1).email(),
      password: z.string().min(8),
    });

    const { email, password } = schema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      if (existingUserByEmail.password == null) {
        // set password for existing user
        const hashedPassword = await hash(password, 10);
        await db.user.update({
          where: {
            email: email,
          },
          data: {
            password: hashedPassword,
          },
        });
      } else {
        return { error: "User already exists" };
      }
    } else {
      const hashedPassword = await hash(password, 10);
      await db.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });
    }
  } catch {
    return { error: "Internal Server Error" };
  }

  redirect("/");
};
