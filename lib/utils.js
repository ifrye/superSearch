require ("isomorphic-fetch");
import BPromise from "bluebird";

function getProfile(item){
	return fetch(`http://localhost:8080/api?q=${item}`).then(function(resp){
		return resp.json();
	})
}

function handleError(error){
	console.warn(error);
	return null;
};

module.exports = {
	getInfo: function(item){
		return getProfile(item).catch(handleError);
	}
};