import { Button, Tabs, TextInput } from "@Aneeshpissay330/components-ui";
import { useActionState, useState } from "react";
import Task from "./Task";
import { useAppDispatch } from "../app/hooks";
import { addTask } from "../features/tasks";

type NoState = null;

const Todo = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState("all");
    const tabs = [
        {
            label: "All",
            value: "all",
            content: <Task type="all" />,
        },
        {
            label: "Active",
            value: "active",
            content: <Task type="active" />,
        },
        {
            label: "Completed",
            value: "completed",
            content: <Task type="completed" />,
        },
    ];
    async function addTodo(_: NoState, formData: FormData): Promise<NoState> {
        const title = formData.get("title") as string;
        dispatch(addTask({ title }));
        return null; // ✅ must return the state type
    }

    const [_, formAction] = useActionState<NoState, FormData>(
        addTodo,
        null
    );
    return (
        <main className="max-w-4xl mx-auto px-8 py-12">
            {/* Input Section */}
            <div id="input-section" className="mb-8">
                <div className="bg-white border border-medium-gray rounded-2xl p-8 shadow-sm">
                    <form action={formAction}>
                        <div className="flex items-center space-x-6">
                            <TextInput
                                placeholder="Add a new task..."
                                name="title"
                            />
                            <Button leftIcon={<span className="material-symbols-outlined">
                                add
                            </span>}>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
        </main>
    )
}

export default Todo;