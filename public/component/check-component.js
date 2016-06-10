

angular.module('qbhelper').component('customerComponent', {
    templateUrl: '/component/check.html',
    controllerAs: 'ch',
    controller: function ($scope, $state, MemberService, PhoneService) {

        var ch = this;

        ch.formatPhoneNumber = function (phoneNumber) {
            debugger
            ch.phoneNumber = PhoneService.formatPhoneNumber(phoneNumber)
        }

        function handleServerSuccess(res) {
            if (res.data) {
                ch.checked = true;
                ch.currentCustomer = res.data;
                console.log(ch.currentCustomer);
                ch.currentCustomer.phoneNumber = res.data.PrimaryPhone.FreeFormNumber;
                debugger
                //   $state.go('customer', { id: res.data.id })
            } else {
                console.log(" ERROR ");
                $('#myModal').modal('show');
            }
        }

        function handleServerError(err) {

        }

        ch.find = function (phoneNumber) {
            var normalNumber = phoneNumber;//.replace (/[^\d]/g, "");
            MemberService.findMemberByPhone(normalNumber).then(handleServerSuccess, handleServerError);

        };

        ch.updateCustomer = function (customer) {

            ch.updatedCustomer = customer;
            
            console.log(ch.updatedCustomer);

            if (grecaptcha.getResponse()) {
                customer.captchaResponse = grecaptcha.getResponse(); //This will add the response string to the object you are sending to your server so you can make your get request server side to verify
                recaptchaService.sendForm(customer).then(function (response) {
                    window.response = response.data;
                    ch.currentCustomer = {};
                });
            } else {
                $scope.error = "Please Verify you are not a robot";
            }
        }

    }
});

