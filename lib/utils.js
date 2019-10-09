require ("isomorphic-fetch");
import BPromise from "bluebird";

function getProfile(username){
	return fetch(`http://35.190.190.219/info?q=${username}`).then(function(resp){
		return resp.json();
	})
}

function handleError(error){
	console.warn(error);
	return null;
};

module.exports = {
	getInfo: function(user){
		return getProfile(user).catch(handleError);
	}
};