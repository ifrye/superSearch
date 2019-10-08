require ("isomorphic-fetch");
import BPromise from "bluebird";

function getProfile(username){
	return fetch(`https://api.github.com/users/${username}`).then(function(resp){
		return resp.json();
	})
}

function handleError(error){
	console.warn(error);
	return null;
};

function getJson(url){
	return fetch(url).then(function(resp){
		console.log(url, resp);
		return resp.json();
	});
}

function getRepos(username){
	return getJson(`https://api.github.com/users/${username}/repos`);
}

function getStarCount(repos){
	return repos.reduce(function(count, repo){
		return count + repo.stargazers_count;
	}, 0);
}

function getUserData(user){
	return BPromise.all([getProfile(user), getRepos(user)]).then(function([profile, repos]){
		return { profile, stars: getStarCount(repos)};
	});
}

module.exports = {
	getInfo: function(user){
		return getUserData(user).catch(handleError);
	}
};