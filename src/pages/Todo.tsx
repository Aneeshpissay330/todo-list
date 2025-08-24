import { Button, Tabs, TextInput } from "@Aneeshpissay330/components-ui";
import { useActionState, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addTask } from "../features/tasks";
import { selectIsDark } from "../features/theme";
import Task from "./Task";

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
    const isDark = useAppSelector(selectIsDark);
    const textColor = isDark ? "#FFFFFF" : "#1F2937";   // semantic: text color
    const fillColor = isDark ? "#1F2937" : "#FFFFFF";   // semantic: background/fill
    return (
        <main className="max-w-4xl mx-auto px-8 py-12">
            {/* Input Section */}
            <div id="input-section" className="mb-8">
                <div className="bg-white dark:bg-[#1F2937] border border-medium-gray rounded-2xl p-8 shadow-sm">
                    <form action={formAction}>
                        <div className="flex items-center space-x-6">
                            <TextInput
                                placeholder="Add a new task..."
                                name="title"
                                variant="outlined"
                                borderColor={textColor}
                                focusedBorderColor={textColor}
                                color={textColor}
                            />
                            <Button color={fillColor} backgroundColor={textColor} leftIcon={<span className="material-symbols-outlined">
                                add
                            </span>}>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Tabs sectionBgColor={fillColor} inactiveTextColor={textColor} activeTextColor={fillColor} activeBgColor={textColor} tabs={tabs} value={activeTab} onChange={setActiveTab} />
        </main>
    )
}

export default Todo;