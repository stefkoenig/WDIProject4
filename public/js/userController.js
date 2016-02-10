angular.module('userCtrl', ['userService','authService'])

.controller('userController', function(User) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the users at page load
	User.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.users = data;
		});
	})

// controller applied to user creation page
.controller('userCreateController', function(User, Auth, $location) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the userService
		User.create(vm.userData)
			.success(function(data) {
				//vm.processing = false;
				console.log(vm.userData)

				//once Auth factory is available in this controller, you can log the user in from this point using Auth.login()
				//Auth.login(vm.userData.username,vm.userData.password)
				Auth.login(vm.userData.username, vm.userData.password)
					.success(function(data){
						vm.processing = false

						if ( data.success ){
							$location.path('/maps')
							console.log(mainCtrl.loginData.username, 'is logged in')
						}
						else {
							//mainCtrl.error = data.message
							console.log('failure')
						}
					})

				vm.userData = {};
				vm.message = data.message;


			});

	};

})

// controller applied to user edit page
.controller('userEditController', function(User, $routeParams, Auth, $location) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// default boolean value, which we can toggle true/false for showing/hiding car edit form
	vm.editing = false

	// get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	User.get($routeParams.username)
		.success(function(data) {
			vm.userData = data;
			console.log(data);
		});


	// function to save the user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// call the userService function to update
		User.update($routeParams.username, vm.userData)
			.success(function(data) {
				vm.processing = false;

				// bind the message from our API to vm.message
				vm.message = data.message;
				console.log(vm.message)
				vm.editing = false
			})
		}

	// function to delete a user
	vm.deleteUser = function(username) {
		vm.processing = true;
		console.log('in deleteUser method')
		User.delete(username)
			.success(function(data) {
				Auth.logout()
				console.log(data, 'deleted')
					vm.user = ''
					$location.path('/login')
					vm.processing = false
				})
			}
				// get all users to update the table
				// you can also set up your api
				// to return the list of users with the delete call
				// User.all()
				// 	.success(function(data) {
				// 		vm.processing = false;
				// 		vm.users = data;
				// 	});

			});
