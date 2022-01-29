$(document).ready(function(){

	 // Single Search Select
    $(".single_search_select").select2({
        theme: "classic"
      });

      var $registrationForm = $('#registration');
      
      if($registrationForm.length){
          $registrationForm.validate({
              rules:{
                  first_name: {
                      required: true
                  },
                  phone_1: {
                      required: true
                  },
                  name: {
                      required: true
                  },
                  item_name: {
                      required: true
                  },
                  qty: {
                      required: true
                  },
                  parent_tenant: {
                      required: true
                  },
                  amount: {
                      required: true
                  },
                  payment_type: {
                      required: true
                  },
                  category: {
                      required: true
                  },
              },
              messages:{
                  first_name: {
                      required: 'Please enter First Name!'
                  },
                  phone_1: {
                      required: 'Please enter Phone Number!',
                  },
                  name: {
                      required: 'Please enter Name!'
                  },
                  item_name: {
                      required: 'Please enter Item Name!',
                  },
                  qty: {
                      required: 'Please enter Qty!'
                  },
                  parent_tenant: {
                      required: 'Please Select Parent Tenant!'
                  },
                  amount: {
                      required: 'Please enter amount!'
                  },
                  payment_type: {
                      required: 'Please Select Payment Type!'
                  },
                  category: {
                      required: 'Please Select Parent Category!'
                  },
              },
              errorPlacement: function(error, element) 
              {
                if (element.is(":radio")) 
                {
                    error.appendTo(element.parents('.gender'));
                }
                else if(element.is(":checkbox")){
                    error.appendTo(element.parents('.hobbies'));
                }
                else 
                { 
                    error.insertAfter(element);
                }
               }
          });
        }
});