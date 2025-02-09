import { deleteTask, updateTaskComplete } from "@/app/actions/actions";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    try {
        await updateTaskComplete(id);
        return new Response(JSON.stringify({ message: "Task updated successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    try {
        await deleteTask(id);
        return new Response(JSON.stringify({ message: "Task deleted successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    }
}