<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>
</head>
<body>
<div>
    <ul class="list-inline">
        <li class="list-inline-item">
            <a href=".">Home</a>
        </li>
    </ul>
    <div>
        <% if (request.getAttribute("message") != null) { %>
        ${requestScope.get("message")}
        <% } %>
        <p></p>
        <form action="login" method="post" enctype="application/x-www-form-urlencoded">
            <div>
                <input type="text" name="username" placeholder="Enter username"
                       value="${username}"/>
            </div>
            <div>
                <input type="password" name="password" placeholder="Enter password"/>
            </div>
            <div>
                <% if (request.getAttribute("username") != null) { %>
                <input type="checkbox" name="remember" id="remember" value="1" checked/>
                <% } else { %>
                <input type="checkbox" name="remember" id="remember" value="1"/>
                <% } %>
                <label for="remember">remember me</label>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</div>
</body>
</html>
