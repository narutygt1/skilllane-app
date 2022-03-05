import { Cookies } from 'react-cookie';

export const setAuthToken = (token: string) => {
	const cookies = new Cookies();
	if (token) {
		cookies.set("skilllane-auth.test-token", token, { path: "/" });
	} else {
		cookies.remove("skilllane-auth.test-token");
	}
};