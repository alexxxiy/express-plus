class LoginResponse{
	constructor(){
		this.username = null;
		this.rights = null;
	}
}

function getLoginResponse(data){
	const res = new LoginResponse();

	if(data){
		res.username = data.username;
		res.rights = data.rights;
	}

	return res;
}

module.exports = {
	LoginResponse,
	getLoginResponse,
};
