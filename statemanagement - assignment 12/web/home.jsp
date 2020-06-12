<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Welcome to our website</title>
</head>
<body>
<div>
    <ul class="list-inline">
        <li class="list-inline-item">
            <a href="">Home</a>
        </li>
        <% if (request.getSession().getAttribute("id") != null) { %>
        <li class="list-inline-item">
            <a href="feed">Feeds</a>
        </li>
        <li class="list-inline-item">
            <a href="logout">Logout</a>
        </li>
        <% } %>
        <% if (request.getSession().getAttribute("id") == null) { %>
        <li class="list-inline-item">
            <a href="login">Login</a>
        </li>
        <li class="list-inline-item">
            <a href="register">Register</a>
        </li>
        <% } %>
    </ul>
</div>
</body>
</html>
