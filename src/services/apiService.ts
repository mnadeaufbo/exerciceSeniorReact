type bodyType =
	| {
			[key: string]: string | number | boolean;
	  }
	| string;

export const sendRequest = async (
	url: string,
	method: string,
	body?: bodyType
) => {
	return await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
};

export const getReq = async (url: string) => {
	return sendRequest(url, "GET");
};

export const postReq = async (url: string, body: bodyType) => {
	return sendRequest(url, "POST", body);
};

export const putReq = async (url: string, body: bodyType) => {
	return sendRequest(url, "PUT", body);
};

export const delReq = async (url: string) => {
	return sendRequest(url, "DELETE");
};

export const addParams = (
	url: string,
	params: { [key: string]: string | boolean | number }
) => {
	const urlParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		urlParams.append(key, value.toString());
	}
	return `${url}?${urlParams}`;
};
