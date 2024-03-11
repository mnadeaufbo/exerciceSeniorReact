import React, { useEffect, useState } from "react";
import {
	ErrorResponse,
	TaskObject,
	TaskObjectsResponse,
	createTask,
	deleteTask,
	getTasks,
} from "./services/apiTaskService";

const reloadList = (setTasks: (tasks: TaskObject[]) => void) => {
	getTasks().then((response) => {
		const tasksResponse = response as TaskObjectsResponse;
		const error = (response as ErrorResponse).error ?? null;
		if (error) {
			return console.error(error);
		}
		setTasks(tasksResponse.tasks ?? []);
	});
};

const App: React.FC = () => {
	const [tasks, setTasks] = useState<TaskObject[]>([]);
	const [newTask, setNewTask] = useState("");

	const handleAddTask = () => {
		if (newTask.trim() !== "") {
			const task: TaskObject = {
				description: newTask.trim(),
			};
			createTask(task).then(() => {
				setNewTask("");
				reloadList(setTasks);
			});
		}
	};

	const handleDeleteTask = (taskId: number) => {
		deleteTask(taskId).then(() => {
			reloadList(setTasks);
		});
	};

	useEffect(() => {
		reloadList(setTasks);
	}, []);
	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-100 h-full w-full">
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4">Ma liste de tâches</h1>
				<div className="flex justify-center mb-4">
					<input
						type="text"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						placeholder="Ajouter une tâche"
						className="border border-gray-300 rounded-l px-2 py-1 flex-grow"
					/>
					<button
						onClick={handleAddTask}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-r"
					>
						Ajouter
					</button>
				</div>
			</div>
			<table className="table-auto">
				<thead>
					<tr>
						<th className="px-4 py-2">Tâche</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task) => (
						<tr key={task.id}>
							<td className="border px-4 py-2">{task.description}</td>
							<td className="border px-4 py-2">
								<button
									onClick={() => handleDeleteTask(task.id ?? 0)}
									className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
								>
									Supprimer
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default App;
