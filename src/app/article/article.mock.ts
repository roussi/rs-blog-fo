import { Article } from './article';

export const articles: Article[] = [new Article('java-spring-boot-profile', '/assets/img/springboot_rest.png',
'Spring boot - Handling validation errors in RESTful API', new Date(), `
<p>90% of nowadays projects use RESTful API to expose there services, with spring boot this become a piece of cake. But what about Validation (the main topic for this post), Exceptions and Error handling ( will be in Part 2 ). 
When dealing with those kind of services ? what can we do when something goes wrong ? and how spring can help us ? This post will be one of many posts related to Spring framework that will be available in my personal blog( coming soon ! ). 
This post not only cover input validation check, but also how to return a proper response back to the client when something goes wrong, so lets start ( like <strong>Linus Torvalds</strong> said <strong>"Talk is cheap, show me the code"</strong> ).
</p> <h4> Validation handling in Spring Boot </h4> <p>Validation handling is one of the important key that gives your API a good reputation, knowing that whenever a client send you a request you will control it to check if it has errors, bad format, missing required values, some business to be there ...
Spring boot out of the box validation Spring provide us some simple out of the box validation, that is checking that some required fields are present in the request via the required property (that is set to true by default) of <strong class="blue">@PathVariable & @RequestParam</strong> annotations :
<div class="row code_class">
    <code>
    @GetMapping(value = "/foo/{id}")
    public String getFoo(@PathVariable(name="id", required= true) Integer id)
    </code>
</div>
</p><h4>Validation handling using ExceptionHandler annotation </h4>
<strong>ExceptionHandler</strong> is used for handling exceptions in specific handler classes and/or handler methods. Handler methods which are annotated with this annotation are allowed to have very flexible signatures. 
They may have parameters of the following types, <strong class="green">in arbitrary order</strong>:
<ul class="ul-inside-article">
  <li>An exception argument: declared as a general Exception or as a more specific exception.</li>
  <li>Request and/or response objects (typically from the Servlet API).</li>
  <li>Session objects.etc ... ( see the official javadoc for more details ).</li>
</ul>
<span class="underlining">So to get your validation business up and running we should : </span>

<ul class="ul-inside-article">
<li >Annotate your DTOs ( data transfer object ) if any ( or your object that are used to transfer data between your API and the clients), with your validation constraints using <strong class="bg-light text-dark">JSR 303 </strong> Bean Validation That spring has a built-in support on them, by annotating the fields with annotations like <strong class="green">@NotNull, @Email, @Size, @Pattern, @Max, @Min </strong> .. those annotations have a message property that give you the ability to customize the output message when validation fail on the annotated field :
<div class="row code_class">
    <code>
    @Data
    public class Foo{
        <span class="green">@NotNull(message = "id is required")</span>
        private Long id;
        <span class="green">@NotNull@Email(message = "email is not valid")</span>
        private String email;
        <span class="green">@Pattern(regexp = "^[ABC]$", message = "Must be either A, B or C")</span>
        private String action;
    }

</code>
</div>
This way the Foo object will be validated on each request to /foo endpoint
</li>
<li>
Add the <strong class="green">@Valid</strong> annotation, that marks a property, method parameter or method return type for validation cascading to your request body : 
<div class="row code_class">
    <code>
    @PutMapping(value = "/foo") 
    public String updateFoo(<span class="green">@Valid</span> @RequestBody Foo foo)

</code>
</div>
</li>
<li>Create a custom <span class="green">ErrorResponse</span> class that will be sent back to the client as a response in case of validation failure :
<div class="row code_class">
    <code>
    <span class="gray">/**
     * This class holds a list of {@code ErrorModel} that describe the error 
     * raised on rejected validation 
     * @author ROUSSI Abdelghani
     */</span>
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public class ErrorResponse {
        private List<ErrorModel> errorMessage;

    }
    <span class="gray"> /**
     * This class describe the error object model, which is a simple POJO that 
     * contains the rejected filedName, rejectedValue and a messageError.
    */</span>
    @Data
    @NoArgsConstructor    
    @AllArgsConstructor
    public class ErrorModel{
        private String fieldName;
        private Object rejectedValue;
        private String messageError;
    }

</code>
</div>
</li>

<li> Last but not least create the method that will take a <strong>MethodArgumentNotValidException</strong> and return the <strong>ErrorResponse</strong> :
<div class="row code_class">
    <code>
    <span class="gray">
    /**
     * Method that check against {@code @Valid} Objects passed to controller endpoints
     *
     * @param exception
     * @return a {@code ErrorResponse}
     * @see com.aroussi.util.validation.ErrorResponse
     */ </span>
    <span class="orange">@ExceptionHandler(value=MethodArgumentNotValidException.class)</span>
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleException(MethodArgumentNotValidException exception) {
        List<ErrorModel> errorMessages = 
                exception.getBindingResult()
                            .getFieldErrors().stream()
                                            .map(err -> 
                                                new ErrorModel(
                                                    err.getField(), 
                                                    err.getRejectedValue(), 
                                                    err.getDefaultMessage()
                                                    )
                                            )
                                            .distinct()
                                            .collect(Collectors.toList());
        return ErrorResponse.builder().errorMessage(errorMessages).build();
    }

    </code>
    </div>
Note the value attribute at the @ExceptionHandler annotation, which declare Exceptions that will be handled by the annotated method. If empty, will default to any exceptions listed in the method argument list.
</li>
</ul>
<strong class="danger underlining">But what if the client sent us a request body that is incorrect ( malformed syntax ) ?</strong>
In this case we will have a 422 Unprocessable Entity with a server response like this :
<div class="row code_class">
    <code>
 {
    "timestamp": "2018-10-15T13:17:45.244+0000",
    "status": 400,
    "error": "Bad Request",
    "message": <span class="danger">"JSON parse error: Unexpected end-of-input within/between Object entries; 
                nested exception is com.fasterxml.jackson.core.JsonParseException: 
                Unexpected end-of-input within/between Object entries at [Source: 
                (PushbackInputStream); line: 9, column: 201]"</span>,
    "path": "/api/foo"
 }

</code>
</div>
To get rid of this, we will follow the same strategy as we did before (for MethodArgumentNotValidException validation exceptions), but this time for HttpMessageNotReadableException exceptions :

<div class="row code_class">
    <code>
    <span class="gray">/**
     * Handle unprocessable json data exception
     * @param msgNotReadable
     * @return a {@code ErrorResponse}
     */</span>
    <span class="orange">@ExceptionHandler(value=HttpMessageNotReadableException.class)</span>
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorResponse handleUnprosseasableMsgException
                            (HttpMessageNotReadableException msgNotReadable) {
        return ErrorResponse.builder()
                .message("UNPROCESSABLE INPUT DATA")
                .status(HttpStatus.UNPROCESSABLE_ENTITY.value())
                .build();
    }
</code>
</div>
We have many options to go even further, and group ( Globally ) validations in a class annotated with @ControllerAdvice (By default the methods in an @ControllerAdvice apply globally to all Controllers), But I prefer to keep things simple in this article and introduce more advanced features in the next articles

<h4>Summary</h4>This is not the only way to perform validation in spring framework, there is other ways to do it ( using the Validator interface for example ), but it is a good start even if Spring consider that validation should not be tied to the web tier because it's a cross concern that should be easy to localize and it should be possible to plug in any validator available. And that's way Spring has come up with a Validator interface. So consider to have a look on this way of validating. Personally (IMHO) I think that this part of the documentation (Validation using Spring’s Validator interface) is lacking in example when it comes to Resolving code to error messages.

\n Good luck ! 
`, 'Abdelghani ROUSSI')];
