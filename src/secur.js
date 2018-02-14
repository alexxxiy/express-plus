const log = require('log')(module);

const CRUD = ['create', 'read', 'update', 'delete'];
const CUD = ['create', 'update', 'delete'];

/**
 * Test security policy
 * @param ctx
 * @param payload
 * @returns {boolean} - return true for false
 */
function testPolicy(ctx, payload){
	return false;
}

function baseAdminWrite(ctx, rightName){
	const {req} = ctx;
	const loggedIn = req.session.admin;
	const method = this.getMethod();

	// read open for all
	if(!method || !CUD.includes(method)){
		return false;
	}

	// Check rights for create, update, delete
	if(!loggedIn){
		ctx.end({error: 'You need to log in'}, 401);
		return true;
	}

	const hasRight = this.checkRight(rights => (rights[rightName] && rights[rightName].w));

	if(!hasRight){
		ctx.end({error: 'You do not have permission for this request'}, 403);
		return true;
	}
};

module.exports = {
	baseAdminWrite,
	testPolicy,
};
