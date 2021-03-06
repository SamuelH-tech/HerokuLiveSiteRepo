// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    function AuthGuard(): void
    {
        let protected_routes: string[] = [
            "/contact-list",
            "/edit"
        ];
    
    
        if(protected_routes.indexOf(location.pathname) > -1)
        {
            // check if user is logged in
            if(!sessionStorage.getItem("user"))
            {
                // if not...change the active link to the  login page
                location.href = "/login";
            }
        }
    }
    

    function AddNavigationEvents(): void
    {

        let NavLinks = $("ul>li>a"); // find all Navigation Links

        NavLinks.off("click");
        NavLinks.off("mouseover");

        // loop through each Navigation link and load appropriate content on click
        NavLinks.on("click", function()
        {
            location.href = ($(this).attr("data") as string);
        });

        NavLinks.on("mouseover", function()
        {
            $(this).css("cursor", "pointer");
        });
    }

    function DisplayHomePage(): void
    {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => 
        {
            location.href = "/about";
        });
    
        $("main").append(`<p id="MainParagraph" class="mt-3">My mission is to continue to grow and learn as a programmer and to refine my knowledge on the languages and practises i know currently, as well as learn new languages and techniques going fordward in my career.</p>`);
        //$("main").append(`<article>
        //<p id="ArticleParagraph" class ="mt-3">This is the Article Paragraph</p>
        //</article>`);
    }

    function DisplayProductsPage(): void
    {
        console.log("Products Page");
    }

    function DisplayServicesPage(): void
    {
        console.log("Services Page");
    }

    function DisplayAboutPage(): void
    {
        console.log("About Page");
        $("main").append(`<p id="MainParagraph" class="mt-3">My name is Samuel Hasham, im a second year student at Durham College and will be graduating this summer. I enjoy music and working on unique programming tasks that require me to learn new things, as well as most things technology.</p>`);
       
    }

    /**
     *This function adds a Contact object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName: string, contactNumber: string, emailAddress: string)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    /**
     * This method validates a field in the form and displays an error in the message area div element
     *
     * @param {string} fieldID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(fieldID: string, regular_expression: RegExp, error_message: string)
    {
        let messageArea = $("#messageArea").hide();
    
        $("#" + fieldID).on("blur", function()
        {
            let text_value = $(this).val() as string;
            if(!regular_expression.test(text_value))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation(): void
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }

    function DisplayContactPage(): void
    {
        console.log("Contact Page");

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function()
        {
            location.href = "/contact-list";
        });

        ContactFormValidation();
       
        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function(event)
        {

            if(subscribeCheckbox.checked)
            {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;

                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize() as string);
                }
            }
        });
    }

    function DisplayContactListPage(): void
    {
        console.log("Contact-list page");
        $("a.delete").on("click", function(event)
        {
            if(!confirm("Are you sure?"))
            {
                event.preventDefault();
                location.href = "/contact-list";
            }  
        });
    }

    /**
     * This function allows JavaScript to work on the Edit Page
     */
    function DisplayEditPage(): void
    {
        console.log("Add/Edit Page");

        ContactFormValidation();
    }

    function CheckLogin(): void
    {
        // if user is logged in
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for logout
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );
            
            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                 // swap out the logout link for login
                $("#login").html(
                    `<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`
                );


                // redirect back to login
                location.href = "/login";
            });
        }
    }

    function DisplayLoginPage(): void 
    {
        console.log("Login Page");
    }

    function DisplayRegisterPage(): void
    {
        console.log("Register Page");
    }

    function Display404Page(): void
    {

    }



    // named function option

    /**
     * This is the entry point to the web application
     *
     */
    function Start(): void
    {
       console.log("App Started!");

       let pageID = $("body")[0].getAttribute("id");

       CheckLogin();

       switch(pageID)
       {
        case "home":
            DisplayHomePage();
            break;
        case "about": 
            DisplayAboutPage();
            break;
        case "edit":
            DisplayEditPage();
            break;
        case "add":
            DisplayEditPage();
            break;
        case "products":
            DisplayProductsPage();
            break;
        case "services": 
            DisplayServicesPage();
            break;
        case "contact": 
            DisplayContactPage();
            break;
        case "contact-list":
            DisplayContactListPage();
            break;
        case "login": 
            DisplayLoginPage();
            break;
        case "register": 
            DisplayRegisterPage();
            break;
        case "404":
            Display404Page();
            break;

       }
       
    }

    window.addEventListener("load", Start);

})();