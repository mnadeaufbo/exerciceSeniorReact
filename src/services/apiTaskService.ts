import { TASK_BASE, TASK_ID } from "../constants";
import { addParams, delReq, getReq, postReq, putReq } from "./apiService";

type TaskListParameters = {
	name?: string;
	completed?: boolean;
};

export type TaskObject = {
	id?: number;
	description: string;
};

export type ErrorResponse = {
	error: string;
};

export type TaskObjectResponse = {
	success: boolean;
	task?: TaskObject;
};

export type TaskObjectsResponse = {
	success: boolean;
	tasks?: TaskObject[];
};

export type TaskIdResponse = {
	success: boolean;
	id?: number;
};

export const getTask = async (
	id: number
): Promise<TaskObjectResponse | ErrorResponse> => {
	return (await getReq(TASK_ID(id.toString()))).json();
};

export const getTasks = async (
	parameters: TaskListParameters = {}
): Promise<TaskObjectsResponse | ErrorResponse> => {
	//if parameters is not empty, we need to add the query string
	let url = TASK_BASE;
	if (Object.keys(parameters).length > 0) {
		url = addParams(url, parameters);
	}
	return (await getReq(url)).json();
};

export const deleteTask = async (id: number): Promise<TaskIdResponse> => {
	return (await delReq(TASK_ID(id.toString()))).json();
};

export const createTask = async (
	task: TaskObject
): Promise<TaskIdResponse | ErrorResponse> => {
	return (await postReq(TASK_BASE, task)).json();
};

export const updateTask = async (
	id: number,
	task: TaskObject
): Promise<TaskIdResponse | ErrorResponse> => {
	return (await putReq(TASK_ID(id.toString()), task)).json();
};
