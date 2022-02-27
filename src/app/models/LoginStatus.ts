export class LoginStatus{
	status: Number;
	message: string;

	constructor( _status: Number, _message: string){
		this.status = _status;
		this.message = _message;
	}
}