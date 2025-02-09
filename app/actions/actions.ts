"use server"

import { revalidatePath } from "next/cache";
import { Key } from "react";

const wayiAPI = "https://wayi.league-funny.com/api"

export async function addTask(prevState: string | null | undefined, formData: FormData) {

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const currentTime = new Date().toISOString();

    const task = {
        "name": name,
        "description": description,
        "is_completed": false,
        created_at: currentTime,
        updated_at: currentTime
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
export async function updateTaskComplete(id: Key, name: string, description: string, updated_at: string) {

    // const currentTime = new Date().toISOString();

    try {
        const res = await fetch(`${wayiAPI}/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description, updated_at }),
        })
        const data = await res.json()
        return data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    } finally {
        revalidatePath("/")
    }
}
export async function deleteTask(id: string) {

    try {
        await fetch(`${wayiAPI}/task/${id}`, {
            method: "DELETE",
        })

        revalidatePath("/")
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}
export async function deleteTask(id: string) {

    try {
        await fetch(`${wayiAPI}/task/${id}`, {
            method: "DELETE",
        })

        revalidatePath("/")
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}