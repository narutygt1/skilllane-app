export type CoursePrice = {
	price: number;
	credit_price: number;
};

export interface ICourse {
	name: string;
	description: string;
	category: string;
	image: string;
	subject: string;
	instructor: [string];
	price: CoursePrice;
	start_time: Date;
	end_time: Date;
	number_of_student: number;
	create_date?: Date;
	update_date?: Date;
}
