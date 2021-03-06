// JavaScript Document
App.factory('usersFactory',function($resource){
	var userList = $resource('../../../api/user/:id', {}, {
		query: { method: 'GET', params: {}, isArray: false },
		get: { method: 'GET', params: { id: '@id' } },
		update: { method: 'PUT', params: { id: '@id' } },
		save:{method: 'POST'},
		delete:{method:'DELETE',params:{ id:'@id' }}
	});
	var factory = {}
	factory.getUsers = function(params){
		return tld = userList.query(params);
		tld.$promise.catch(function(e){
			alert(e.data.message)
			//window.location.replace('#/dashboard')
		})
	}
	factory.saveUser = function($scope){
		return userList.save($scope.user)
		.$promise.catch(function(e){
			alert(e.data.message)
		}).then(function(value){
			alert(value.message)
			$scope.user=''
		})
	}
	factory.deleteUser = function($scope,id){
		return userList.delete({id:id})
		.$promise.then(function(e){
			alert(e.message)
			$scope.users = userList.query()
		}).catch(function(e){
			alert(e.data.message)
		})
	}
	factory.getUser = function(id){
		return tmp = userList.get({id:id})
		tmp.$promise.catch(function(e){
			//console.log(e.data.message)
			window.location.replace('#/dashboard')
		})
	}
	factory.updateUser = function($scope,id){
		//debugger
		tld = userList.update({id:id},$scope.userDetails.user[0])
		tld.$promise.then(function(e){
			alert(e.message)
		}).catch(function(e){
			alert(e.message)
		})
	}
return factory
})

App.factory('User',function($rootScope){
	var getUser = function(){
		var ArrayCookies = document.cookie.split(';')
		for(i=0; i<ArrayCookies.length; i++){
			if(ArrayCookies[i].indexOf('accessKey')!=-1){
				return ArrayCookies[i].substr(ArrayCookies[i].indexOf('=')+1)
			}
		}
	}
	$rootScope.accessToken = getUser()
})

//suburbsFactry
App.factory('suburbsFactory',function($resource){
	var suburbList = $resource('../../../api/suburbs/:id', {}, {
        query: { method: 'GET', params: {}, isArray: false },
        get: { method: 'GET', params: { id: '@id' } },
        update: { method: 'PUT', params: { id: '@id' } },
		save:{method: 'POST'},
		delete:{method:'DELETE',params:{ id:'@id' }}
    });
	var factory = {}
	factory.getSuburbs = function(){
		return tld = suburbList.query();
		tld.$promise.catch(function(e){
			alert(e.data.message)
			//window.location.replace('#/dashboard')
		})
	}
	
	factory.deleteSuburbs = function($scope,id){
		return suburbList.delete({id:id})
		.$promise.then(function(e){
			alert(e.message)
			$scope.suburbs = suburbList.query()
		}).catch(function(e){
			alert(e.data.message)
		})
	}
	
	factory.saveSuburb = function($scope){
		//alert(scope.suburbs)
		return suburbList.save($scope.suburbs)
		.$promise.catch(function(e){
			alert(e.data.message)
		}).then(
				function(value){
					alert(value.message)
					$scope.suburbs=''
				}
		)
	}
	
	factory.updateSuburb = function($scope,id){
		//debugger
		tld = suburbList.update({id:id},$scope.suburbDetails.suburb[0])
		tld.$promise.then(function(e){
		alert(e.message)
		}).catch(function(e){
		alert(e.message)
		})
		//console.log($scope.userDetails.user)
		}
	
	factory.getSuburb = function(id){
		return tmp = suburbList.get({id:id})
		tmp.$promise.catch(function(e){
			//console.log(e.data.message)
			window.location.replace('#/dashboard')
		})
	}
	
	return factory
})

