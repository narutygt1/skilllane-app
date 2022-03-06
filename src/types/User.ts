export interface IUser {
	_id: string;
	username: string;
	password: string;
	role: any;
	firstname: string;
	lastname: string;
	nickname: string;
	gender: "male" | "female";
	birthday: Date;
	create_date?: Date;
	update_date?: Date;
}

export interface IUserAuth {
	id: string;
	firstname: string;
	lastname: string;
	role: string;
}