const form = document.getElementById('contact-form');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const textAreaInput = document.getElementById('textarea');
const generalEnquiryBtn = document.querySelector('.general-enquiry-btn');
const supportRequestBtn = document.querySelector('.support-request-btn');
const QueryWrapper = document.querySelector('.Query-wrapper');
const consentBox = document.querySelector('.consent-box');
const contactUsContainer = document.querySelector('.contact-us-container');
const alertPage = document.querySelector('.alert');
const nextBtn = document.querySelector('.next');
const consentText = document.querySelector('.label');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    checkInputDetails();
});




const checkInputDetails =()=>{
    // Check the value of each input in this form
    const firstNameValue = firstNameInput.value.trim();
    const lastNameValue = lastNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const textAreaValue = textAreaInput.value.trim();
    



    if(firstNameValue == ''){
        showError(firstNameInput, "This field is required");
    }else{
        showSuccess(firstNameInput);
    }

    if(lastNameValue == ''){
        showError(lastNameInput, "This field is required");
    }else{
        showSuccess(lastNameInput);
    }
    
    if(!validEmail(emailValue)){
        showError(emailInput, "Please enter a valid email address");
    }else{
        showSuccess(emailInput);
    }

    if(textAreaValue == ''){
        showError(textAreaInput, "This field is required");
    }else{
        showSuccess(textAreaInput);
    }

    if(QueryWrapper.classList.contains('checkbox')){
        showSuccess(generalEnquiryBtn);
    }else if(QueryWrapper.classList.contains('support-request-checkbox')){
        showSuccess(supportRequestBtn);
    }else{
        showError(generalEnquiryBtn, "Please select a query type");
        showError(supportRequestBtn, "Please select a query type");
    }
    
    if(contactUsContainer.classList.contains('checkbox')){
        showSuccess(consentBox);
    }else{
        showError(consentBox, "To submit this form, please consent to being contacted");
    }

    SuccessAlert();

}



//write a function to display error & failed class
const showError =(input, Text)=>{
    const inputBox = input.parentElement;
    const errorDisplay = inputBox.querySelector('.error');

    errorDisplay.innerText = Text;
    if (inputBox.classList.contains('success')){
        inputBox.classList.remove('success');
    }
    inputBox.classList.add('failed');
}

//write a function to display success class
const showSuccess =(input)=>{
    const inputBox = input.parentElement;
    const errorDisplay = inputBox.querySelector('.error');

    errorDisplay.innerText = '';
    if (inputBox.classList.contains('failed')){
        inputBox.classList.remove('failed');
    }
    inputBox.classList.add('success');
}

// To check for valid email
function validEmail(mail){
    const emailPattern =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    
    //test the email using the pattern
    return emailPattern.test(mail);
}

// add event listeners to each of the checkboxes 
generalEnquiryBtn.addEventListener('click', () =>{
    QueryWrapper.classList.toggle('checkbox');
});

supportRequestBtn.addEventListener('click', () =>{
    QueryWrapper.classList.toggle('support-request-checkbox');
});
// add event listeners to the consent box
consentBox.addEventListener('click', ()=>{
    contactUsContainer.classList.toggle('checkbox');
});

// write  a function to add the alert text
function SuccessAlert(){

    if(formSuccess() == true){
        alertPage.classList.add('displayalert');
        document.getElementById('contact-form').reset();
        consentText.textContent = "I hereby consent to being contacted by the team *";
        QueryWrapper.classList.remove('checkbox');
        QueryWrapper.classList.remove('support-request-checkbox');
        contactUsContainer.classList.remove('checkbox');
    }
}

function formSuccess(){
    const Containers = document.querySelectorAll('.inputBox');
    let result = true;
    
    //Use a forEach loop to check for 'failed/error' classes, and then do something!
    Containers.forEach((contanier)=>{
        if(contanier.classList.contains('failed')){
            result = false;
        }
    });

    return result;
}


// Add event listener the next page to return to the form
nextBtn.addEventListener('click', () =>{
    alertPage.classList.remove('displayalert');
    consentText.textContent = "I consent to being contacted by the team *";
});

