

var menuDisabled = false;
jQuery(function($) {
    $(document).ready( function() {
        // backstretch for background image
        var defaultImgSrc = $('img.main-img').attr('src');
        $.backstretch(defaultImgSrc, {speed: 400});

        $(".nav a").on('click',function(e){
            
        
                var imgSrc = $("img#templatemo-page1-img").attr('src');
                $.backstretch(imgSrc, {speed: 400}); //backstretch for background fade in/out                
             
        });
        
	setInterval(function(){ $(".alert-dismissable").slideUp(); }, 6000);
    }); // document.ready

});

function GetState(ConId,PastId,State_id)
{
	
	$.ajax({url: "AjaxPage.php", data:"ConId="+ConId, success: function(result){		
			var json = $.parseJSON(result);	
			
			$('#'+PastId).empty();
				 $('#'+PastId).append($('<option>', { 
						value: '',
						text : '-Select State-' 
				}));

				

			if(json.length>0)
				{							
					
						
					$.each(json , function (index, value){						
							var sel=false;
							if ((value.State_id == State_id) && State_id!='')
							sel=true;
						$('#'+PastId).append($('<option>', { 
							value: value.State_id,
							selected:sel,
							text : value.State 
						}));				 
				  
					});					
				}
	}});
}

function GetCitys(StateId,PastId,city_id)
{
	$.ajax({url: "AjaxPage.php", data:"StateId="+StateId, success: function(result){				
			var json = $.parseJSON(result);				
			$('#'+PastId).empty();
				 $('#'+PastId).append($('<option>', { 
						value: '',
						text : '-Select City-' 
				}));
				

			if(json.length>0)
				{		
					var selall=false;
					if ((city_id == 'All'))
					{
						selall=true;	
					}									
						
					 $('#'+PastId).append($('<option>', { 
							value: 'All',
							selected:selall,
							text : 'All City' 
					}));
						
					$.each(json , function (index, value){
							var sel=false;
							if ((value.City == city_id) && city_id!='')
							sel=true;
						$('#'+PastId).append($('<option>', { 
							value: value.City,
							selected:sel,
							text : value.City 
						}));				 
				  
					});					
				}
	}});
}

function LoginAccessDonar()
{
	
	var user_name_donar=$("#user_name_donar").val();
	if(user_name_donar.trim()=='')
	{
		alert("Please enter email id");
		$("#user_name_donar").focus();
		return false;
	}	
	
	if(user_name_donar.trim()!='')
		{
			if(validateEmail(user_name_donar)==false)
			{
				alert('Please enter valid email id');
				$("#user_name_donar").focus();
				return false;
			}
		}
		
	var BloodLoginForm=$("#BloodLoginForm").val();
	var passwords;	
	if(BloodLoginForm=='login')
	{
		var password_donar=$("#password_donar").val();
		if(password_donar.trim()=='')
		{
			alert("Please enter password");
			$("#user_name_donar").focus();
			return false;
		}
		 passwords="&password="+password_donar;
	}else{
		 passwords='';
	}
	
	var data_sends="BloodLoginForm="+BloodLoginForm+"&user_name="+user_name_donar+passwords;
	
	if(BloodLoginForm.trim!='')
	{
		$("#for_submit_login").hide();
		$("#loader_for_verify_login").show();
		
		$.ajax({url: "form_action.php", method:"post", data:data_sends, success: function(result){	
			
			if(parseFloat(result)==1)
			{
				//alert("Logged in Successfully");
				location.reload();
			}else if(parseFloat(result)==3)
			{
				alert("An email has been sent to the User with a Password");
				location.reload();
			}else if(parseFloat(result)==2)
			{
				alert("No user found");
			}else{
				alert("Invalid login details");
			}
			
			$("#loader_for_verify_login").hide();
			$("#for_submit_login").show();			
			
		}});
	}	
	return false;
}

function addcountofdonar(this_id){
	
	var checkeds=$("#donar_id_"+this_id).is(":checked");	
	var total_checked=$("#total_checked").val();	
	
	
	if(total_checked=='5' && checkeds==true)
	{
		alert("You can select maximum 5 donors at a time");
		$("#donar_id_"+this_id).prop('checked', false);
		
	}else{
		
		if(checkeds==false)
		{
			$("#total_checked").val(parseInt(total_checked)-1);
		}else{
			$("#total_checked").val(parseInt(total_checked)+1);
		}		
	}
}
function ToSendSms(sms)
{
	var total_checked=$("#total_checked").val();
	if(total_checked>0)
	{		
		$("#sms_types").val(sms);
		$("#DonarForm").submit();		
	}else{
		alert("Please select anyone Donor");
	}
	
}
function formvalidaterefereFriend()
{
	var your_name=$("#your_name").val();
	if(your_name.trim()=='')
	{
		alert("Please  enter your name");
		$("#your_name").focus();
		return false;
	}	
	
	
	var your_email_refere=$("#your_email_refere").val();
	if(your_email_refere.trim()=='')
	{
		alert("Please enter your email");
		$("#your_email_refere").focus();
		return false;
	}
	
	if(your_email_refere!='')
		{
			if(validateEmail(your_email_refere)==false)
			{
				alert('Please enter your valid email id');
				$("#your_email_refere").focus();
				return false;
			}
		}
		
	var your_frd_name1=$("#your_frd_name1").val();
	if(your_frd_name1.trim()=='')
	{
		alert("Please  enter friend 1 name");
		$("#your_frd_name1").focus();
		return false;
	}	
	
	
	var your_frd_email1=$("#your_frd_email1").val();
	if(your_frd_email1.trim()=='')
	{
		alert("Please enter friend 1 email");
		$("#your_frd_email1").focus();
		return false;
	}
	
	if(your_frd_email1!='')
		{
			if(validateEmail(your_frd_email1)==false)
			{
				alert('Please enter valid email id for friend 1');
				$("#your_frd_email1").focus();
				return false;
			}
		}
	var enter_captcha=$("#enter_captcha").val();
	if(enter_captcha.trim()=='')
	{
		alert("Please enter captcha");
		$("#enter_captcha").focus();
		return false;
	}
	/* var captcha_verify=$("#captcha_verify").val();
	if(enter_captcha.trim()!=captcha_verify.trim())
	{
		alert("Please enter valid captcha");
		$("#enter_captcha").focus();
		return false;
	} */
}
function RegisterFormDonar()
{
	var txtEmail_reg=$("#txtEmail_reg").val();
	if(txtEmail_reg.trim()=='')
	{
		alert("Please enter email");
		$("#txtEmail_reg").focus();
		return false;
	}
	
	if(txtEmail_reg!='')
		{
			if(validateEmail(txtEmail_reg)==false)
			{
				alert('Please enter valid email id');
				$("#txtEmail_reg").focus();
				return false;
			}
		}
	
	var txtName=$("#txtName").val();
	if(txtName.trim()=='')
	{
		alert("Please enter name");
		$("#txtName").focus();
		return false;
	}	
	
	//password start
	var txtPwd_reg=$("#txtPwd_reg").val();
	if(txtPwd_reg.trim()=='')
	{
		alert("Please enter new password");
		$("#txtPwd_reg").focus();
		return false;
	}	
	if(txtPwd_reg.length<6)
	{
		alert("Password must be at least 6 characters");
		$("#txtPwd_reg").focus();
		return false;
	}
	var txtConfirm_reg=$("#txtConfirm_reg").val();
	if(txtConfirm_reg.trim()=='')
	{
		alert("Please enter confirm password");
		$("#txtConfirm_reg").focus();
		return false;
	}
	if(txtConfirm_reg.length<6)
	{
		alert("Confirm password must be at least 6 characters");
		$("#txtConfirm_reg").focus();
		return false;
	}
	if(txtConfirm_reg.trim()!=txtPwd_reg.trim())
	{
		alert("Password does not match the Confirm Password");
		$("#txtConfirm_reg").focus();
		return false;
	}
	//password end
	
	
	var ddlCountry=$("#ddlCountry").val();
	if(ddlCountry.trim()=='')
	{
		alert("Please select country");
		$("#ddlCountry").focus();
		return false;
	}
	
	var ddlstState=$("#ddlstState").val();
	if(ddlstState.trim()=='')
	{
		alert("Please select state");
		$("#ddlstState").focus();
		return false;
	}
	
	var ddlstCity=$("#ddlstCity").val();
	if(ddlstCity.trim()=='')
	{
		alert("Please select city");
		$("#ddlstCity").focus();
		return false;
	}
	
	var ddlBlood=$("#ddlBlood").val();
	if(ddlBlood.trim()=='')
	{
		alert("Please select blood group");
		$("#ddlBlood").focus();
		return false;
	}
	
	var txtAge=$("#txtAge").val();
	if(txtAge.trim()=='')
	{
		alert("Please enter age");
		$("#txtAge").focus();
		return false;
	}
	
	var ddlstGender=$("#ddlstGender").val();
	if(ddlstGender.trim()=='')
	{
		alert("Please select gender");
		$("#ddlstGender").focus();
		return false;
	}
	
	var txtMob=$("#txtMob").val();
	if(txtMob.trim()=='')
	{
		alert("Please enter mobile number");
		$("#txtMob").focus();
		return false;
	}
	var enter_captcha=$("#enter_captcha").val();
	if(enter_captcha.trim()=='')
	{
		alert("Please enter captcha");
		$("#enter_captcha").focus();
		return false;
	}
	/* var captcha_verify=$("#captcha_verify").val();
	if(enter_captcha.trim()!=captcha_verify.trim())
	{
		alert("Please enter valid captcha");
		$("#enter_captcha").focus();
		return false;
	} */
	$(".to_be_register").hide();
	$("#loader_for_verify").show();
}

function TovlidateEmailDonar(emaildate)
{

	if(emaildate.trim()!='')
	{
		$('#to_be_submit').prop('disabled', true);
	}else{
		$('#to_be_submit').prop('disabled', false);
	}
	
	$.ajax({url: "form_action.php", method:"post", data:"emailValide="+emaildate, success: function(result){
			
		if(result.trim()!='')
		{
			
			alert('Entered Email Id Already Exists');
			$("#txtEmail_reg").val('');
			$("#txtEmail_reg").focus();
			
		}
		
		$('#to_be_submit').prop('disabled', false);
		
	}});


}

function change_password_donar()
{
	var OldtxtPwd_reg=$("#OldtxtPwd_reg").val();
	if(OldtxtPwd_reg.trim()=='')
	{
		alert("Please enter old password");
		$("#OldtxtPwd_reg").focus();
		return false;
	}
	
	var txtPwd_reg=$("#txtPwd_reg").val();
	if(txtPwd_reg.trim()=='')
	{
		alert("Please enter new password");
		$("#txtPwd_reg").focus();
		return false;
	}	
	if(txtPwd_reg.length<6)
	{
		alert("New password must be at least 6 characters");
		$("#txtPwd_reg").focus();
		return false;
	}
	var txtConfirm_reg=$("#txtConfirm_reg").val();
	if(txtConfirm_reg.trim()=='')
	{
		alert("Please enter confirm password");
		$("#txtConfirm_reg").focus();
		return false;
	}
	if(txtConfirm_reg.length<6)
	{
		alert("Confirm password must be at least 6 characters");
		$("#txtConfirm_reg").focus();
		return false;
	}
	if(txtConfirm_reg.trim()!=txtPwd_reg.trim())
	{
		alert("New & confirm password not matched");
		$("#txtConfirm_reg").focus();
		return false;
	}
	
}
function ConactFormDonar()
{
	var contact_name=$("#contact_name").val();
	if(contact_name.trim()=='')
	{
		alert("Please enter name");
		$("#contact_name").focus();
		return false;
	}
	
	var contact_email=$("#contact_email").val();
	if(contact_email.trim()=='')
	{
		alert("Please enter email ID");
		$("#contact_email").focus();
		return false;
	}
	if(contact_email.trim()!='')
		{
			if(validateEmail(contact_email)==false)
			{
				alert('Please enter valid email id');
				$("#contact_email").focus();
				return false;
			}
		}
	
	var contact_message=$("#contact_message").val();
	if(contact_message.trim()=='')
	{
		alert("Please enter name");
		$("#contact_message").focus();
		return false;
	}
	
	var enter_captcha=$("#enter_captcha").val();
	if(enter_captcha.trim()=='')
	{
		alert("Please enter captcha");
		$("#enter_captcha").focus();
		return false;
	}
	/* var captcha_verify=$("#captcha_verify").val();
	if(enter_captcha.trim()!=captcha_verify.trim())
	{
		alert("Please enter valid captcha");
		$("#enter_captcha").focus();
		return false;
	} */	
}
function formvalidateSMS(){	
	var name_of_sender=$("#name_of_sender").val();
	if(name_of_sender.trim()=='')
	{
		alert("Please enter name");
		$("#name_of_sender").focus();
		return false;
	}
	
	var mobile_no_sender=$("#mobile_no_sender").val();
	if(mobile_no_sender.trim()=='')
	{
		alert("Please enter mobile number");
		$("#mobile_no_sender").focus();
		return false;
	}
	
	if(mobile_no_sender.length<10)
	{
		alert("Please enter valid mobile number");
		$("#mobile_no_sender").focus();
		return false;
	}
	
	var sms_types=$("#sms_types").val();
	/* alert(sms_types); */
	if(sms_types.trim()=='Send')
		
		{			
			var location_of_sender=$("#location_of_sender").val();
			if(location_of_sender.trim()=='')
			{
				alert("Please enter location");
				$("#location_of_sender").focus();
				return false;
			}
		}
		
		/* $("#submit_for_verify").hide();
		$("#loader_for_verify").show(); */
		
		var verify_otp=$("#verify_otp").val();
		var submit = 'true';
		if(submit)
		{
			
			if(mobile_no_sender.trim!='' && verify_otp.trim()=='0')
			{
				
				$.ajax({url: "form_action.php", method:"post", async:false, data:"mobile_no_sender="+mobile_no_sender+"&Ajax=yes", success: function(result){	
													
					if(result==1)
					{
						submit = 'true';
					}else{
						
						$("#sms_verified_div").show(); 
						$("#verify_otp").val(result);
						submit = 'false';
					}
										
			
				}});
				
			}
		}
		
		
		
		if(submit=='false')
		{
			return false;
		}	
		
		if(verify_otp.trim()!='0')
		{
			var verify_link=$("#verify_link").val();
			if(verify_link.trim()=='')
			{
				alert("Please enter verification code");
				$("#verify_link").focus();
				return false;
			}
			
			if(verify_link.trim()!='' && verify_link.trim()!=verify_otp.trim())
			{
				alert("Verification code does not match");
				$("#verify_link").focus();
				return false;
			}
		}
	
	
}

function Forgot_my_pass(details)
{
	if(details=='forgot')
	{
		$("#Forgot_my_password").hide();
		$("#login_to_user").show();
		
		/* $("#login_pass_div").css('visibility','hidden');*/
		
		$("#login_pass_div").hide(); 
		$("#BloodLoginForm").val('forgot');
		$("#login_title_top").html('Forgot Password');
	}else{
		$("#login_to_user").hide();
		 $("#Forgot_my_password").show();	
		 
		$("#login_pass_div").show();
		
		/*$("#login_pass_div").css('visibility','visible'); */
		$("#BloodLoginForm").val('login');
		$("#login_title_top").html('Donor Login');
	}
	
}

function isNumber(evt, element) {
		var charCode = (evt.which) ? evt.which : event.keyCode
		if (
		(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
		(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
		(charCode < 48 || charCode > 57))
		{
			if(charCode!=8)
			{
				return false;
			}
		}
		return true;
	} 

  $(document).ready(function() {
      
	  $('#mobile_no_sender').keypress(function (event) {
            return isNumber(event, this)
        });	   
	    $('#txtAge').keypress(function (event) {
            return isNumber(event, this)
        });	   
	    $('#txtweight').keypress(function (event) {
            return isNumber(event, this)
        });	   
	    $('#txtPin').keypress(function (event) {
            return isNumber(event, this)
        });	   
	    $('#txtMob').keypress(function (event) {
            return isNumber(event, this)
        });	   
	     $('#txtRes').keypress(function (event) {
            return isNumber(event, this)
        });	    
		$('#txtOff').keypress(function (event) {
            return isNumber(event, this)
        });	   
		 $('.datepicker').datepicker({
			format: 'dd-mm-yyyy'
		}).on('changeDate', function(e){
			$(this).datepicker('hide');
		});

 });
		

	function validateEmail(sEmail) {
		var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if (filter.test(sEmail)) {
			return true;
		}
		else {
			return false;
		}
	}