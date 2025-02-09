"use server"

import { revalidatePath } from "next/cache";

const wayiAPI = "https://wayi.league-funny.com/api"

export async function addTask(prevState: string | null | undefined, formData: FormData) {

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const currentTime = new Date().toISOString();

    const task = {
        "name": name,
        "description": description,
        "is_completed": false,
        "created_at": currentTime,
        "updated_at": currentTime
    }

    try {
        await fetch(`${wayiAPI}/task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        revalidatePath("/")
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}
export async function updateTaskComplete(id: string) {

    const currentTime = new Date().toISOString();

    try {
        await fetch(`${wayiAPI}/task/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "updated_at": currentTime }),
        })

        revalidatePath("/")
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}