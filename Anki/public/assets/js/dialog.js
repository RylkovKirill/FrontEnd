var registerButton = document.getElementById('registerButton');
var loginButton = document.getElementById('loginButton');
var registerDialog = document.getElementById('registerDialog');
var loginDialog = document.getElementById('loginDialog');
var submitRegisterButton = document.getElementById('submitRegisterButton');
var submitLoginButton = document.getElementById('submitLoginButton');
loginDialog.showModal();
// var unauthorizedButton = document.getElementById('unauthorizedButton');

registerButton.addEventListener('click', function()
{
    registerDialog.showModal();
});
loginButton.addEventListener('click', function() 
{
    loginDialog.showModal();
});

registerDialog.addEventListener('click', function(event)
{
    var rect = registerDialog.getBoundingClientRect();
    if (!(rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX && event.clientX <= rect.left + rect.width)) 
    {
        registerDialog.close();
    }
});
loginDialog.addEventListener('click', function(event)
{
    var rect = loginDialog.getBoundingClientRect();
    if (!(rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX && event.clientX <= rect.left + rect.width)) 
    {
        loginDialog.close();
    }
});


submitLoginButton.addEventListener('click', function(event)
{
        loginDialog.close();
});

submitRegisterButton.addEventListener('click', function(event)
{
        registerDialog.close();
});

// unauthorizedButton.addEventListener('click', function()
// {
//     loginDialog.showModal();
// });