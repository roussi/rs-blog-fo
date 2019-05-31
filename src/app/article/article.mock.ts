import { Article } from './article';

export const articles: Article[] = [new Article('java-spring-boot-profile', '/assets/img/article-0.png',
'Spring boot - Handling validation errors in RESTful API', new Date(), `
<p>90% of nowadays projects use RESTful API to expose there services, with spring boot this become a piece of cake. But what about Validation (the main topic for this post), Exceptions and Error handling ( will be in Part 2 ). <p>
<div class="row code_class">
    <code>
    String list;
    private final int amount;
    public class Student{
        Hello object=new Hello();
    }
    </code>
</div>
<p>When dealing with those kind of services ? what can we do when something goes wrong ? and how spring can help us ? This post will be one of many posts related to Spring framework that will be available in my personal blog
( coming soon ! ). This post not only cover input validation check, but also how to return a proper response back to the client when something goes wrong, so lets start ( like Linus Torvalds said "Talk is cheap, show me the code" ).
</p> <p>Validation handling is one of the important key that gives your API a good reputation, knowing that whenever a client send you a request you will control it to check if it has errors, bad format, missing required values, some business to be there ...
Spring boot out of the box validation Spring provide us some simple out of the box validation, that is checking that some required fields are present in the request via the required property (that is set to true by default) of <strong class="blue">@PathVariable & @RequestParam</strong> annotations :
</p>
Validation handling using ExceptionHandler annotation ExceptionHandler is used for handling exceptions in specific handler classes and/or handler methods. Handler methods which are annotated with this annotation are allowed to have very flexible signatures. 
They may have parameters of the following types, in arbitrary <strong class="green">order</strong>:

\nAn exception argument: declared as a general Exception or as a more specific exception.Request and/or response objects (typically from the Servlet API). Session objects.etc ... ( see the official javadoc for more details ). So to get your validation business up and running we should :
\nNote the value attribute at the <strong class="bg-info text-white">@ExceptionHandler</strong> annotation, which declare Exceptions that will be handled by the annotated method. If empty, will default to any exceptions listed in the method argument list.
\nBut what if the client sent us a request body that is incorrect ( malformed syntax ) ?
\nIn this case we will have a 422 Unprocessable Entity with a server response like this :
\nTo get rid of this, we will follow the same strategy as we did before (for MethodArgumentNotValidException validation exceptions), but this time for HttpMessageNotReadableException exceptions :
\nWe have many options to go even further, and group ( Globally ) validations in a class annotated with @ControllerAdvice (By default the methods in an @ControllerAdvice apply globally to all Controllers), But I prefer to keep things simple in this article and introduce more advanced 
features in the next articles
                          \nSummary This is not the only way to perform validation in spring framework, there is other ways to do it ( using the Validator interface for example ), but it is a good start even if Spring consider that validation should not be tied to the web tier because it's a cross concern that should be easy to localize and it should be possible to plug in any validator available. And that's way Spring has come up with a Validator interface. So consider to have a look on this way of validating. Personally (IMHO) I think that this part of the documentation (Validation using Spring’s Validator interface) is lacking in example when it comes to Resolving code to error messages.
                          \n \n Good luck ! 
`, 'Abdelghani ROUSSI')];
